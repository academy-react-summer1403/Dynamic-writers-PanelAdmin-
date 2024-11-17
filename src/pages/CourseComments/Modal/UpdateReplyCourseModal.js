// ** React Imports
import { Fragment } from 'react'

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
import { AddReplyCourseComment } from '../../../core/Services/api/Comments/AddReplyCommentCourse'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReplyCourseComment } from '../../../core/Services/api/Comments/ReplyCourseComment'
import { UpdateCourseComment } from '../../../core/Services/api/Comments/UpdateCourseComment'

const UpdateReplyCourse = ({ show, setShow, selectedItem, refetch }) => {

  const defaultValues = {
    Title: selectedItem?.title,
    Describe: selectedItem?.describe
  }

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
    const formData = new FormData()
    formData.append('CourseId', selectedItem?.courseId)
    formData.append('CommentId', selectedItem?.id)
    formData.append('Title', data.Title)
    formData.append('Describe', data.Describe)
    const response = await UpdateCourseComment(formData)
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
        toast.error(response)
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
          <h1 className='text-center mb-1'>  ویرایش نظر </h1>
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12}>
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
            <Col md={12}>
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

export default UpdateReplyCourse
