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
import FlatPicker from 'react-flatpickr'
import "flatpickr/dist/themes/material_green.css";


// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback, Badge } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { GetCreateCourse } from '../../../core/Services/api/Course/GetCreateCourse'
import { getItem, setItem } from '../../../core/Services/common/storage'
import toast from 'react-hot-toast'

const step3 = (JSON.parse(getItem('step3')))

const classRoomDtosJ = (JSON.parse(getItem('ClassId')))
const courseLevelDtosJ = (JSON.parse(getItem('CourseLvlId')))
const teachersJ = (JSON.parse(getItem('TeacherId')))

const defaultValues = {
  Cost: (step3.Cost || 0),
  EndTime: (step3.EndTime || ''),
  StartTime: (step3.StartTime || ''),
}

const Address = ({ stepper }) => {
  const {data: CreateData} = useQuery({queryKey: ['GetCreateCourse'], queryFn: GetCreateCourse})
  const SignupSchema = yup.object().shape({
    Cost: yup.number().required(' قیمت دوره را وارد کنید ').min(1000, 'قیمت باید بیشتر از 1000 تومان باشد'),
    StartTime: yup.date().required('تاریخ شروع دوره الزامی است').min(new Date(), 'تاریخ شروع نباید از امروز کمتر باشد').test('is-start-time-before-end-time', 'تاریخ شروع باید قبل از تاریخ پایان باشد', function(value) {
      const { EndTime } = this.parent
      return !EndTime || new Date(value) <= new Date(EndTime)
    }),
    EndTime: yup.date().required('تاریخ پایان دوره الزامی است').min(yup.ref('StartTime'), 'تاریخ پایان باید بعد از تاریخ شروع باشد')
  })

  const [currentClass, setCurrentClass] = useState(classRoomDtosJ || {value: '', label: 'انتخاب کنید'})
  const ClassOptions = CreateData?.classRoomDtos.map(type => ({value: type.id, label: type.classRoomName}))

  const [currentLvl, setCurrentLvl] = useState(courseLevelDtosJ || {value: '', label: 'انتخاب کنید'})
  const LvlOptions = CreateData?.courseLevelDtos.map(type => ({value: type.id, label: type.levelName}))

  const [currentTeacher, setCurrentTeacher] = useState(teachersJ || {value: '', label: 'انتخاب کنید'})
  const TeacherOptions = CreateData?.teachers.map(type => ({value: type.teacherId, label: type.fullName, img: type.pictureAddress}))

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    if(currentClass.value == '') {
      toast.error(' کلاس دوره را انتخاب کنید ')
    }
    else if(currentLvl.value == '') {
      toast.error(' سطح دوره را انتخاب کنید ')
    }
    else if(currentTeacher.value == '') {
      toast.error(' استاد دوره را انتخاب کنید ')
    }
    else if(isObjEmpty(errors)) {
      setItem('step3', JSON.stringify(data))
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
            <Label className='form-label' for='ClassId'>
              کلاس دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`ClassId`}
              className='react-select'
              classNamePrefix='select'
              options={ClassOptions}
              value={currentClass}
              onChange={data => {
                setCurrentClass(data)
                setItem('ClassId', JSON.stringify(data))
              }}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`CourseLvlId`}>
              سطح دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseLvlId`}
              className='react-select'
              classNamePrefix='select'
              options={LvlOptions}
              value={currentLvl}
              onChange={data => {
                setCurrentLvl(data)
                setItem('CourseLvlId', JSON.stringify(data))
              }}
            />
          </Col>
        </Row>
        <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='TeacherId'>
              استاد دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`TeacherId`}
              className='react-select'
              classNamePrefix='select'
              options={TeacherOptions}
              value={currentTeacher}
              onChange={data => {
                setCurrentTeacher(data)
                setItem('TeacherId', JSON.stringify(data))
              }}
            />
          </div>
          <div className='form-password-toggle col-md-6 mb-1'>
          <Label className='form-label' for={`Cost`}>
              قیمت دوره
            </Label>
            <Controller
              control={control}
              id='Cost'
              name='Cost'
              render={({ field }) => (
                <Input type='number' invalid={errors.Cost && true} {...field} />
              )}
            />
            {errors.Cost && <FormFeedback>{errors.Cost.message}</FormFeedback>}
          </div>
            <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='StartTime'>
              تاریخ شروع دوره
            </Label>
            <Controller
              control={control}
              id='StartTime'
              name='StartTime'
              render={({ field }) => (
                <Input
                  type='date'
                  {...field}
                  options={{
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                    altFormat: 'Y-m-d',
                    altInput: true,
                  }}
                  id='StartTime'
                  placeholder='تاریخ را وارد کنید'
                  style={{ width: '100%', height: '37px', outline: 'none' }}
                  invalid={errors.StartTime ? true : false}
                />
              )}
             
            />
            {errors.StartTime && <FormFeedback>{errors.StartTime.message} </FormFeedback>}
          </div>

          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='EndTime'>
              تاریخ پایان دوره
            </Label>
            <Controller
              control={control}
              id='EndTime'
              name='EndTime'
              render={({ field }) => (
                <Input
                  type='date'
                  {...field}
                  options={{
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                    altFormat: 'Y-m-d',
                    altInput: true,
                  }}
                  id='EndTime'
                  placeholder='تاریخ را وارد کنید'
                  style={{ width: '100%', height: '37px', outline: 'none' }}
                  invalid={errors.EndTime ? true : false}
                />
              )}
            />
            {errors.EndTime && <FormFeedback>{errors.EndTime.message}</FormFeedback>}
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

export default Address
