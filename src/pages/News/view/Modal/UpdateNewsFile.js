// ** React Imports
import { Fragment, useEffect, useState } from 'react'

import {
  Row,
  Col,
  Modal,
  Label,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from 'reactstrap'

import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateNewsComment } from '../../../../core/Services/api/Comments/UpdateNewsComment'
import { UpdateNewsFile } from '../../../../core/Services/api/File/UpdateNewsFile'

const UpdateNewsFileModal = ({ show, setShow, selectedItem, refetch, refetchB }) => {

  const [currentAccept, setCurrentAccept] = useState({value: selectedItem?.isSlide, label: 'اسلاید'})
  const AcceptOption = [
    {value: true, label: 'اسلاید'},
    {value: false, label: 'غیر اسلاید'}
  ]

  const [featuredImg, setFeaturedImg] = useState(selectedItem.fileAddress)
  const [imgPath, setImgPath] = useState(selectedItem.fileAddress)
  const [savePic, setsavePic] = useState('')

  const onChange = e => {
    const reader = new FileReader();
    const files = e.target.files; 
    setsavePic(files[0]);
    setImgPath(files[0].name)
    reader.onload = function () {
      setFeaturedImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('Id', selectedItem.id)
    formData.append('NewsId', selectedItem.newsId)
    formData.append("IsSlide", currentAccept.value)
    formData.append('File', savePic || selectedItem.fileAddress)
    const response = await UpdateNewsFile(formData)
    if(response.success == true){
        toast.success(response.message)
        setShow(false)
        reset()
        refetch()
        refetchB()
    } 
  }

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered iranSans overflow-hidden'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>  ویرایش فایل </h1>
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='CourseTypeId'>
              وضعیت
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseTypeId`}
              className='react-select'
              classNamePrefix='select'
              options={AcceptOption}
              value={currentAccept}
              onChange={(data) => {
                setCurrentAccept(data)
              }}
            />
          </Col>
          <Col md={12}>
              <Label className='form-label' for='File'>
                فایل
              </Label>
              <div className='d-flex flex-column flex-md-row'>
                <img
                className={`rounded me-2 mb-1 mb-md-0${featuredImg ? "" : " bg-secondary"}`}
                src={featuredImg}
                alt=''
                width='170'
                style={{width: '150px', height: '150px'}}
                />
                <div>
                <p className='my-50' style={{maxWidth: '180px', overflow: 'hidden'}}>
                    <a href='/' style={{textOverflow: 'ellipsis'}} onClick={e => e.preventDefault()}>
                    {`${imgPath ? `C:/fakepath/${imgPath}`: 'هیچ عکسی موجود نیست'}`}
                    </a>
                </p>
                <div className='d-inline-block'>
                    <div className='mb-0'>
                    <Label for='exampleCustomFileBrowser'>
                        <div className='border bg-white p-1' style={{width: '200px'}}> لطفا عکس را انتخاب کنید </div>                                   
                    </Label>
                    <Input
                        className='d-none'
                        type='file'
                        id='exampleCustomFileBrowser'
                        name='customFile'
                        onChange={onChange}
                        accept='.jpg, .png, .gif'
                    />
                    </div>
                </div>
                </div>
            </div>
            </Col>
            <Col className='text-center mt-1' xs={12}>
              <Button type='submit' className='me-1' color='primary'>
                تایید
              </Button>
              <Button
                color='secondary'
                outline
                onClick={() => {
                  setShow(!show)
                  reset()
                }}
              >
                برگشت
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UpdateNewsFileModal
