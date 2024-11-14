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

import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateNewsComment } from '../../../../core/Services/api/Comments/UpdateNewsComment'

const UpdateCommentNews = ({ show, setShow, selectedItem, refetch }) => {

  const defaultValues = {
    Title: selectedItem?.title,
    Describe: selectedItem?.describe
  }

  const [currentAccept, setCurrentAccept] = useState({value: true, label: 'فعال'})
  const AcceptOption = [
    {value: true, label: 'فعال'},
    {value: false, label: 'غیر فعال'}
  ]

  const SignupSchema = yup.object().shape({
    Title: yup.string().min(10, ' این فیلد نمی تواند کمتر از 10 حرف باشد '),
    Describe: yup.string().min(10, ' این فیلد نمی تواند کمتر از 10 حرف باشد '),
    })

  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues,  resolver: yupResolver(SignupSchema) })

  const onSubmit = async (data) => {
    const formData = {
      id: selectedItem?.id,
      newsId: selectedItem?.newsId,
      title: data.Title,
      describe: data.Describe,
      accept: currentAccept.value
    }
    const response = await UpdateNewsComment(formData)
    if(!response){
        toast.error(' عملیات ناموفق بود ')
    }
    else if(response.success == true){
        toast.success(response.message)
        setShow(false)
        reset()
        refetch()
    } 
    else{
        toast.error(' عملیات ناموفق بود ')
    }
  }

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered iranSans'
        style={{backgroundColor: 'transparent'}}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>  ویرایش نظر </h1>
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={6}>
              <Label className='form-label' for='Title'>
                نام نظر
              </Label>
              <Controller
                id='Title'
                name='Title'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} placeholder='نام پاسخ را وارد فرمایید' invalid={errors.Title && true} />}
                />
                 {errors.Title && <FormFeedback>{errors.Title.message}</FormFeedback>}
            </Col>
            <Col md={6}>
              <Label className='form-label' for='Describe'>
                توضیحات
              </Label>
              <Controller
                id='Describe'
                name='Describe'
                defaultValue=''
                control={control}
                render={({ field }) => <Input {...field} placeholder='توضیحات را وارد فرمایید' invalid={errors.Describe && true} />}
                />
                 {errors.Describe && <FormFeedback>{errors.Describe.message}</FormFeedback>}
            </Col>
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

export default UpdateCommentNews
