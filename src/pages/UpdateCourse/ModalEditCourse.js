// ** React Imports
// ** Third Party Components
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Check } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Custom Components
import Avatar from '@components/avatar'

import FlatPicker from 'react-flatpickr'

// ** Reactstrap Imports
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import { GetCreateCourse } from '../../core/Services/api/Course/GetCreateCourse'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { UpdateCourse } from '../../core/Services/api/Course/UpdateCourse'
import { getItem } from '../../core/Services/common/storage'

const ModalEditCourse = ({ isOpen, toggleModal, Course, refetch }) => {
  const SignupSchema = yup.object().shape({
    MiniDescribe: yup.string().required(' خلاصه توضیحات دوره را وارد کنید '),
    Describe: yup.string().required(' توضیحات دوره را وارد کنید '),
    Title: yup.string().min(4, 'نام دوره باید حداقل 4 حرف داشته باشد').required(' نام دوره را وارد کنید '),
    Capacity: yup.number().min(2, ' ظرفیت دوره باید بیشتر از 1 نفر باشد ').required(' ظرفیت دوره را وارد کنید '),
    SessionNumber: yup.number().required(' تعداد جلسات را وارد کنید '),
    CurrentCoursePaymentNumber: yup.number(),
    Cost: yup.number().min(1000, ' قیمت باید بیشتر از 1000 تومان باشد ').required(' قیمت را وارد کنید '),
    // StartTime: yup.date().required('تاریخ شروع دوره الزامی است').min(new Date(), 'تاریخ شروع نباید با امروز یکی باشد یا از امروز کمتر باشد').test('is-start-time-before-end-time', 'تاریخ شروع باید قبل از تاریخ پایان باشد', function(value) {
    //     const { EndTime } = this.parent
    //     return !EndTime || new Date(value) <= new Date(EndTime)
    //   }),
    // EndTime: yup.date().required('تاریخ پایان دوره الزامی است').min(yup.ref('StartTime'), 'تاریخ پایان باید بعد از تاریخ شروع باشد'),
  })

  const {data: CreateData} = useQuery({queryKey: ['GetCreateCourse'], queryFn: GetCreateCourse})

  const [currentType, setCurrentType] = useState({value: (Course.courseTypeName === "حضوری" && 1 || Course.courseTypeName === "آنلاین" && 2 || Course.courseTypeName === "حضوری آنلاین" && 3), label: Course.courseTypeName})
  const TypeOptions = CreateData?.courseTypeDtos.map(type => ({value: type.id, label: type.typeName}))

  const [currentTerm, setCurrentTerm] = useState({value: 3 , label: 'تابستان 1403'})
  const TermOptions = CreateData?.termDtos.map(type => ({value: type.id, label: type.termName}))

  const [currentLvl, setCurrentLvl] = useState({value: Course.courseLevelName === 'مبتدی' && 1 || Course.courseLevelName === 'متوسط' && 2 || Course.courseLevelName === 'پیشرفته' && 3, label: Course.courseLevelName})
  const LvlOptions = CreateData?.courseLevelDtos.map(type => ({value: type.id, label: type.levelName}))

  const [currentClass, setCurrentClass] = useState({value: Course.courseClassRoomName === "ClassRoom 1" && 1 || Course.courseClassRoomName === "ClassRoom 2" && 2 || Course.courseClassRoomName === 'ClassRoom 3' && 3 , label: Course.courseClassRoomName})
  const ClassOptions = CreateData?.classRoomDtos.map(type => ({value: type.id, label: type.classRoomName}))

  const [currentTeacher, setCurrentTeacher] = useState({value: Course.teacherId, label: Course.teacherName})
  const TeacherOptions = CreateData?.teachers.map(type => ({value: type.teacherId, label: type.fullName, img: type.pictureAddress}))

  // const [start, setStart] = useState(Course.startTime)
  // const [end, setEnd] = useState(Course.endTime)

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

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = async data => {
    // const DayS = String(data.StartTime.getDate()).padStart(2, '0')
    // const MonthS = String(data.StartTime.getMonth() + 1).padStart(2, '0')
    // const YearS = data.StartTime.getFullYear()
    // const formatS = `${MonthS}-${DayS}-${YearS}`
    // const DayE = String(data.EndTime.getDate()).padStart(2, '0')
    // const MonthE = String(data.EndTime.getMonth() + 1).padStart(2, '0')
    // const YearE = data.EndTime.getFullYear()
    // const formatE = `${MonthE}-${DayE}-${YearE}`
    const startDate = new Date(Course.startTime)
    const endDate = new Date(Course.endTime)
    const currentDate = new Date();
    console.log(startDate, endDate)

    if (startDate < currentDate) {
      startDate.setFullYear(startDate.getFullYear() + 1);
      console.log(startDate)
    }

    if (endDate <= startDate) {
      endDate.setFullYear(startDate.getFullYear() + 1);
    }
    const term = currentTerm.value > 2 ? 2 : currentTerm.value;
    
    const StartTime = startDate.toISOString();
    const EndTime = endDate.toISOString();

    const formData = new FormData()
    formData.append('Id', Course.courseId)
    formData.append('Title', data.Title)
    formData.append('Describe', data.Describe)
    formData.append('MiniDescribe', data.MiniDescribe)
    formData.append('Capacity', data.Capacity)
    formData.append('CourseTypeId', currentType.value)
    formData.append('SessionNumber', data.SessionNumber)
    formData.append('CurrentCoursePaymentNumber', data.CurrentCoursePaymentNumber)
    formData.append('TremId', term)
    formData.append('ClassId', currentClass.value)
    formData.append('CourseLvlId', currentLvl.value)
    formData.append('TeacherId', currentTeacher.value)
    formData.append('Cost', data.Cost)
    formData.append('UniqeUrlString', (data.Title + generateRandomString()))
    formData.append('Image', file !== null ? file : getItem('ImageCourse'))
    formData.append('StartTime', StartTime)
    formData.append('EndTime', EndTime)
    const response = await UpdateCourse(formData)
    if(!response){
      toast.error(' عملیت موفقیت آمیز نبود ')
    }
    else if(response.success == true){
      toast.success(response.message)
      toggleModal()
      refetch()
    }
  }

  return (
    <Modal className='iranSans' size='lg' isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader>
        <CardTitle tag='h4'> 😉 تغییر مشخصات دوره </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='Title'>
              نام دوره
            </Label>
            <Controller
              id='Title'
              name='Title'
              defaultValue={Course.title}
              control={control}
              render={({ field }) => <Input {...field} placeholder='نام دوره' invalid={errors.Title && true} />}
            />
            {errors.Title && <FormFeedback>{errors.Title.message}</FormFeedback>}
          </Col>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='Describe'>
              توضیحات
            </Label>
            <Controller
              id='Describe'
              name='Describe'
              defaultValue={Course.describe}
              control={control}
              render={({ field }) => <Input {...field} placeholder='توضیحات دوره' invalid={errors.Describe && true} />}
            />
            {errors.Describe && <FormFeedback>{errors.Describe.message}</FormFeedback>}
          </Col>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='MiniDescribe'>
               خلاصه توضیحات
            </Label>
            <Controller
              id='MiniDescribe'
              name='MiniDescribe'
              defaultValue={Course.describe}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder='پاره ای از توضیحات دوره را وارد کنید' invalid={errors.MiniDescribe && true} />
              )}
            />
            {errors.MiniDescribe && <FormFeedback>{errors.MiniDescribe.message}</FormFeedback>}
          </Col>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='Capacity'>
              ظرفیت دوره
            </Label>
            <Controller
              id='Capacity'
              name='Capacity'
              defaultValue={10}
              control={control}
              render={({ field }) => (
                <Input {...field} type='number' invalid={errors.Capacity && true} />
              )}
            />
            {errors.Capacity && <FormFeedback>{errors.Capacity.message}</FormFeedback>}
          </Col>
          <Col lg='6' className='mb-1'>
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
              onChange={(data) => {
                setCurrentType(data)
              }}
            />
          </Col>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='SessionNumber'>
               تعداد جلسات
            </Label>
            <Controller
              id='SessionNumber'
              name='SessionNumber'
              defaultValue={2}
              control={control}
              render={({ field }) => (
                <Input {...field} type='number' invalid={errors.SessionNumber && true} />
              )}
            />
            {errors.SessionNumber && <FormFeedback>{errors.SessionNumber.message}</FormFeedback>}
          </Col>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='CurrentCoursePaymentNumber'>
               تعداد پرداختی ها
            </Label>
            <Controller
              id='CurrentCoursePaymentNumber'
              name='CurrentCoursePaymentNumber'
              defaultValue={Course.paymentDoneTotal}
              control={control}
              render={({ field }) => (
                <Input {...field} type='number' invalid={errors.CurrentCoursePaymentNumber && true} />
              )}
            />
            {errors.CurrentCoursePaymentNumber && <FormFeedback>{errors.CurrentCoursePaymentNumber.message}</FormFeedback>}
          </Col>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='TermId'>
              ترم دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`TermId`}
              className='react-select'
              classNamePrefix='select'
              options={TermOptions}
              value={currentTerm}
              onChange={(data) => {
                setCurrentTerm(data)
              }}
            />
          </Col>
          
          <Col lg='12' className='mb-1'>
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
              onChange={(data) => {
                setCurrentClass(data)
              }}
            />
          </Col>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='CourseLvlId'>
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
              onChange={(data) => {
                setCurrentLvl(data)
              }}
            />
          </Col>
          <Col lg='6' className='mb-1'>
            <Label className='form-label' for='TeacherId'>
              استاد دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`TeacherId'`}
              className='react-select'
              classNamePrefix='select'
              options={TeacherOptions}
              value={currentTeacher}
              onChange={(data) => {
                setCurrentTeacher(data)
              }}
            />
          </Col>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='Cost'>
               قیمت دوره
            </Label>
            <Controller
              id='Cost'
              name='Cost'
              defaultValue={Course.cost}
              control={control}
              render={({ field }) => (
                <Input {...field} type='number' invalid={errors.Cost && true} />
              )}
            />
            {errors.Cost && <FormFeedback>{errors.Cost.message}</FormFeedback>}
          </Col>
          {/* <Col lg='6' className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='StartTime'>
              تاریخ شروع دوره
            </Label>
            <Controller
                  control={control}
                  id='StartTime'
                  name='StartTime'
                  render={({ field }) => (
                    <FlatPicker
                     onChange={(selectedDate) => {
                      setStart(selectedDate[0])
                    }}
                     options={{
                      enableTime: false,
                      dateFormat: 'Y-m-d',
                      altFormat: 'Y-m-d',
                      altInput: true,
                      defaultDate: start
                    }} {...field} id='StartTime' placeholder='تاریخ را وارد کنید' style={{width: '100%', height: '37px', outline: 'none'}} invalid={errors.StartTime && true} />
                  )}     
            />
            {errors.StartTime && <FormFeedback>{errors.StartTime.message} </FormFeedback>}
          </Col>

          <Col lg='6' className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='EndTime'>
              تاریخ پایان دوره
            </Label>
            <Controller
                  control={control}
                  id='EndTime'
                  name='EndTime'
                  render={({ field }) => (
                    <FlatPicker 
                    onChange={(selectedDate) => {
                      setEnd(selectedDate[0])
                    }}
                    options={{
                      enableTime: false,
                      dateFormat: 'Y-m-d',
                      altFormat: 'Y-m-d',
                      altInput: true,
                      defaultDate: end
                    }} {...field} id='EndTime' placeholder='تاریخ را وارد کنید' style={{width: '100%', height: '37px', outline: 'none'}} invalid={errors.StartTime && true} />
                  )}     
            />
            {errors.EndTime && <FormFeedback>{errors.EndTime.message}</FormFeedback>}
          </Col> */}
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
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              تایید
            </Button>
          </div>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ModalEditCourse
