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
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { GetCreateCourse } from '../../../core/Services/api/Course/GetCreateCourse'
import { getItem, setItem } from '../../../core/Services/common/storage'
import toast from 'react-hot-toast'

const step2 = (JSON.parse(getItem('step2')))

const courseTypeDtosJ = (JSON.parse(getItem('CourseTypeId')))
const termDtosJ = (JSON.parse(getItem('TremId')))

const defaultValues = {
  SessionNumber: (step2.SessionNumber || 0),
  CurrentCoursePaymentNumber: (step2.CurrentCoursePaymentNumber || 0),
}

const PersonalInfo = ({ stepper }) => {
  const {data: CreateData} = useQuery({queryKey: ['GetCreateCourse'], queryFn: GetCreateCourse})
  // ** Hooks
  const SignupSchema = yup.object().shape({
    SessionNumber: yup.number().min(1, 'تعداد جلسات دوره باید بیشتر از 1 باشد'),
    CurrentCoursePaymentNumber: yup.number().min(5, 'لطفا تعداد پرداختی های دوره را بالاتر از 5 پرداختی قرار دهید'),
  })

  const [currentType, setCurrentType] = useState(courseTypeDtosJ ||{value: '', label: 'انتخاب کنید'})
  const TypeOptions = CreateData?.courseTypeDtos.map(type => ({value: type.id, label: type.typeName}))

  const [currentTerm, setCurrentTerm] = useState(termDtosJ ||{value: '', label: 'انتخاب کنید'})
  const TermOptions = CreateData?.termDtos.map(type => ({value: type.id, label: type.termName}))

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    if(currentType.value == '') {
      toast.error(' نوع دوره را انتخاب کنید ')
    }
    else if(currentTerm.value == '') {
      toast.error(' ترم دوره را انتخاب کنید ')
    }
    else if(isObjEmpty(errors)) {
      setItem('step2', JSON.stringify(data))
      stepper.next()
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
            <Label className='form-label' for='CourseTypeId'>
              نوع دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseTypeId`}
              className='react-select'
              classNamePrefix='select'
              options={TypeOptions}
              value={currentType}
              onChange={data => {
                setCurrentType(data)
                setItem('CourseTypeId', JSON.stringify(data))
              }}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`SessionNumber`}>
              تعداد جلسات دوره
            </Label>
            <Controller
              control={control}
              id='SessionNumber'
              name='SessionNumber'
              render={({ field }) => (
                <Input type='number' invalid={errors.SessionNumber && true} {...field} />
              )}
            />
            {errors.SessionNumber && <FormFeedback>{errors.SessionNumber.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='CurrentCoursePaymentNumber'>
              شماره پرداخت
            </Label>
            <Controller
              id='CurrentCoursePaymentNumber'
              name='CurrentCoursePaymentNumber'
              control={control}
              render={({ field }) => <Input type='number' invalid={errors.CurrentCoursePaymentNumber && true} {...field} />}
            />
            {errors.CurrentCoursePaymentNumber && <FormFeedback>{errors.CurrentCoursePaymentNumber.message}</FormFeedback>}
          </div>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='TremId'>
              ترم
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`TremId`}
              className='react-select'
              classNamePrefix='select'
              options={TermOptions}
              value={currentTerm}
              onChange={data => {
                setCurrentTerm(data)
                setItem('TremId', JSON.stringify(data))
              }}
            />
          </div>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev'  onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'> قبلی </span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'> بعدی </span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default PersonalInfo
