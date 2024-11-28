// ** React Imports
import { Fragment, useState } from 'react'
import { isObjEmpty } from '@utils'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
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

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  
  function generateRandomString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const randomChar1 = characters.charAt(Math.floor(Math.random() * characters.length));
    const randomChar2 = characters.charAt(Math.floor(Math.random() * characters.length));
    return randomChar1 + randomChar2;
}

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (datas) => {
    if(isObjEmpty(errors)) {
      setItem('step4', JSON.stringify(datas))
      const step1 = (JSON.parse(getItem('step1')))
      const step2 = (JSON.parse(getItem('step2')))
      const step3 = (JSON.parse(getItem('step3')))
      const step4 = (JSON.parse(getItem('step4')))
      const classRoomDtosJ = (JSON.parse(getItem('ClassId')))
      const courseLevelDtosJ = (JSON.parse(getItem('CourseLvlId')))
      const teachersJ = (JSON.parse(getItem('TeacherId')))
      const courseTypeDtosJ = (JSON.parse(getItem('CourseTypeId')))
      const termDtosJ = (JSON.parse(getItem('TremId')))
  
      const data = new FormData()
      data.append('Title', step1.Title)
      data.append('Describe', step1.Describe)
      data.append('MiniDescribe', step1.MiniDescribe)
      data.append('Capacity', parseInt(step1.Capacity))
      data.append('SessionNumber', step2.SessionNumber)
      data.append('CurrentCoursePaymentNumber', step2.CurrentCoursePaymentNumber)
      data.append('CourseTypeId', parseInt(courseTypeDtosJ.value))
      data.append('TremId', termDtosJ.value)
      data.append('ClassId', classRoomDtosJ.value)
      data.append('CourseLvlId', courseLevelDtosJ.value)
      data.append('UniqeUrlString', (step1.Title + generateRandomString()))
      data.append('TeacherId', teachersJ.value)
      data.append('Cost', step3.Cost)
      data.append('Image', file)
      data.append('StartTime', step3.StartTime)
      data.append('EndTime', step3.EndTime)
      data.append('ShortLink', datas.ShortLink)
      data.append('TumbImageAddress', datas.TumbImageAddress || '')
      const response = await CreateCourse(data)
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
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='Image'>
               تصویر دوره
            </Label>
            <Controller
              id='Image'
              name='Image'
              control={control}
              render={({ field }) => (
                <Input {...field} type='file' onChange={handleFileChange} invalid={errors.Image && true} />
              )}
            />
            {errors.Image && <FormFeedback>{errors.Image.message}</FormFeedback>}
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
