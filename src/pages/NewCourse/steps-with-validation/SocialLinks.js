// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback, Badge } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { GetCreateCourse } from '../../../core/Services/api/Course/GetCreateCourse'
import { getItem, removeItem, setItem } from '../../../core/Services/common/storage'
import toast from 'react-hot-toast'
import { CreateCourse } from '../../../core/Services/api/Course/CreateCourse'
import { useNavigate } from 'react-router-dom'

const step4 = (JSON.parse(getItem('step3')))

const defaultValues = {
  ShortLink: (step4.ShortLink || '') 
}

const SocialLinks = ({ stepper }) => {
  const {data: CreateData, refetch} = useQuery({queryKey: ['GetCreateCourse'], queryFn: GetCreateCourse})

  const navigate = useNavigate()
  // ** Hooks
  const SignupSchema = yup.object().shape({
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (data) => {
    if(isObjEmpty(errors)) {
      setItem('step4', JSON.stringify(data))
      const response = await CreateCourse()
      if(!response){
        toast.error(response.message)
      }
      else if(response.success == true){
        toast.success(' عملیات موفقیت آمیز بود ')
        removeItem('step1')
        removeItem('step2')
        removeItem('step3')
        removeItem('step4')
        removeItem('ClassId')
        removeItem('CourseLvlId')
        removeItem('TeacherId')
        removeItem('CourseTypeId')
        removeItem('TremId')
        refetch()
        navigate('/courses/view/' + response.id)
      }
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'> مشخصات دوره </h5>
        <small className='text-muted'>مشخصات رو وارد کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' style={{fontSize: '16px'}} for='ShortLink'>
              لینک کوتاه
            </Label>
                          
            <Badge color='light-danger'> اختیاری </Badge>
            <Controller
              control={control}
              id='ShortLink'
              name='ShortLink'
              render={({ field }) => (
                <Input invalid={errors.ShortLink && true} {...field} />
              )}
            />
            {errors.ShortLink && <FormFeedback>{errors.ShortLink.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' style={{fontSize: '16px'}} for='TumbImageAddress'>
              عکس استاد
            </Label>
                          
            <Badge color='light-danger'> اختیاری </Badge>
            <Controller
              control={control}
              id='TumbImageAddress'
              name='TumbImageAddress'
              render={({ field }) => (
                <Input type='file' invalid={errors.TumbImageAddress && true} {...field} />
              )}
            />
            {errors.TumbImageAddress && <FormFeedback>{errors.TumbImageAddress.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev'  onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'> قبلی </span>
          </Button>
          <Button type='submit' color='success' className='btn-submit'>
            تایید
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default SocialLinks
