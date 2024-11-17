// ** React Imports
import { Fragment, useState } from 'react'

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

import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { AddNewsFile } from '../../../../core/Services/api/File/AddNewsFile'

const AddNewsFileModal = ({ show, setShow, refetch, refetchB }) => {

  const defaultValues = {
    File: ''
  }

  const SignupSchema = yup.object().shape({
    
    })

  const {id} = useParams()

  const [featuredImg, setFeaturedImg] = useState(null)
  const [imgPath, setImgPath] = useState(null)
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
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues,  resolver: yupResolver(SignupSchema) })

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('NewsId', id)
    formData.append('Files', savePic)
    
    const response = await AddNewsFile(formData)
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
        className='modal-dialog-centered iranSans'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'> فایل جدید </h1>
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
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
                height='110'
                />
                <div>
                <p className='my-50'>
                    <a href='/' onClick={e => e.preventDefault()}>
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

export default AddNewsFileModal
