import { useState } from 'react'
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader, FormFeedback } from 'reactstrap'
import { Check, Briefcase, X, User } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import jMoment from 'jalali-moment'
import Avatar from '@components/avatar'
import { yupResolver } from '@hookform/resolvers/yup'
import "flatpickr/dist/themes/material_green.css";
import * as yup from 'yup'
import '@styles/react/libs/react-select/_react-select.scss'
import { useNavigate } from 'react-router-dom'
import { UpdateUser } from '../../../core/Services/api/User/UpdateUser'
import toast from 'react-hot-toast'
import FlatPicker from 'react-flatpickr'

const UserInfoCard = ({ selectedUser }) => {

  const [show, setShow] = useState(false)

  const SignupSchema = yup.object().shape({
    nationalCode: yup.string().min(10, ' کد ملی معتبر نمی باشد ').required(' کد ملی معتبر نمی باشد '),
    gmail: yup.string().email(' ایمیل وارد شده صحیح نمی باشد ')
  })
  // ** Hook
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: selectedUser?.id,
      fName: selectedUser?.fName || '',
      lName: selectedUser?.lName || '',
      userName: selectedUser?.userName || '',
      gmail: selectedUser?.gmail || '',
      phoneNumber: selectedUser?.phoneNumber || '',
      active: selectedUser?.active,
      isDelete: selectedUser?.isDelete,
      isTecher: selectedUser?.isTecher,
      isStudent: selectedUser?.isStudent,
      recoveryEmail: selectedUser?.recoveryEmail !== null ? selectedUser?.recoveryEmail : 'default@gmail.com',
      twoStepAuth: selectedUser?.twoStepAuth,
      userAbout: selectedUser?.userAbout || '',
      currentPictureAddress: selectedUser?.currentPictureAddress,
      profileCompletionPercentage: selectedUser?.profileCompletionPercentage,
      linkdinProfile: selectedUser?.linkdinProfile || '',
      telegramLink: selectedUser?.telegramLink || '',
      receiveMessageEvent: selectedUser?.receiveMessageEvent,
      homeAdderess: selectedUser?.homeAdderess || '',
      nationalCode: selectedUser?.nationalCode !== null ? selectedUser?.nationalCode : '',
      gender: selectedUser?.gender,
      latitude: selectedUser?.latitude || '',
      longitude: selectedUser?.longitude || '',
      insertDate: selectedUser?.insertDate,
      birthDay: selectedUser?.birthDay === '0001-01-01T00:00:00' ? '2024-09-09' : selectedUser?.birthDay,
      roles: [],
      courses: [],
      coursesReseves: []
  }
    ,resolver: yupResolver(SignupSchema)
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.currentPictureAddress != 'Not-set' && selectedUser.currentPictureAddress.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.currentPictureAddress}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.currentPictureAddress || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={(selectedUser.fName)}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '100%'
          }}
        />
      )
    }
  }

  const navigate = useNavigate()

  const onSubmit = async data => {
    data.birthDay = data.birthDay === '2024-09-09' ? '2024-09-09' : selectedUser.birthDay !== data.birthDay ? data.birthDay[0] : selectedUser.birthDay
    console.log(data)
    const response = await UpdateUser(data)
    if (!response){
      toast.error(' کد ملی معتبر نمی باشد یا عملیات موفقیت آمیز نیست ')
    }
    else if(response.success == true){
      toast.success(' عملیات انجام شد ')
      setShow(false)
      handleReset()
      navigate(`/user/view/${data.id}`)
    }
  }

  const handleReset = () => {
    reset({
        id: selectedUser?.id,
        fName: selectedUser?.fName || '',
        lName: selectedUser?.lName || '',
        userName: selectedUser?.userName || '',
        gmail: selectedUser?.gmail || '',
        phoneNumber: selectedUser?.phoneNumber || '',
        active: selectedUser?.active,
        isDelete: selectedUser?.isDelete,
        isTecher: selectedUser?.isTecher,
        isStudent: selectedUser?.isStudent,
        recoveryEmail: selectedUser?.recoveryEmail !== null ? selectedUser?.recoveryEmail : 'default@gmail.com',
        twoStepAuth: selectedUser?.twoStepAuth,
        userAbout: selectedUser?.userAbout || '',
        currentPictureAddress: selectedUser?.currentPictureAddress,
        profileCompletionPercentage: selectedUser?.profileCompletionPercentage,
        linkdinProfile: selectedUser?.linkdinProfile || '',
        telegramLink: selectedUser?.telegramLink || '',
        receiveMessageEvent: selectedUser?.receiveMessageEvent,
        homeAdderess: selectedUser?.homeAdderess || '',
        nationalCode: selectedUser?.nationalCode !== null ? selectedUser?.nationalCode : '',
        gender: selectedUser?.gender,
        latitude: selectedUser?.latitude || '',
        longitude: selectedUser?.longitude || '',
        insertDate: selectedUser?.insertDate,
        birthDay: selectedUser?.birthDay === '0001-01-01T00:00:00' ? '2024-09-09' : selectedUser?.birthDay,
        roles: [],
        courses: [],
        coursesReseves: []
    })
  }

  return (
    <div className='iranSans'>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser.fName !== null && selectedUser.lName !== null ? (selectedUser.fName + ' ' + selectedUser.lName) : 'نامشخص'}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.id} </h4>
                <small> شناسه کاربر </small>
              </div>
            </div>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <User className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.gender == true ? 'زن' : 'مرد'} </h4>
                <small> جنسیت </small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.profileCompletionPercentage ? selectedUser.profileCompletionPercentage : '0'}% </h4>
                <small> وضعیت حساب </small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>مشخصات کاربر</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>نام کاربری</span>
                  <span>{selectedUser.userName}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>ایمیل</span>
                  <span>{selectedUser.gmail}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>شماره</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>آدرس</span>
                  <span>{selectedUser.homeAdderess}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>کد ملی</span>
                  <span>{selectedUser.nationalCode}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>تاریخ تولد</span>
                  <span>{selectedUser.birthDay != '0001-01-01T00:00:00' ? jMoment(selectedUser.birthDay).locale('fa').format('jD jMMMM jYYYY') : ''}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>دسترسی</span>
                  <span className='text-capitalize d-flex' style={{width: '300px', flexFlow: 'row wrap'}} dir='ltr'>{selectedUser !== null ? (
                    selectedUser.roles.map(role => {
                      return  <Badge color='primary' style={{margin: '2px'}}> {role.roleName} </Badge>
                    })
                  ) : null}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>توضیحات کاربر</span>
                  <span>{selectedUser.userAbout}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => {setShow(true), handleReset()}}>
              تغییر مشخصات
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg iranSans'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'> تغییر مشخصات کاربر </h1>
            <p>بروز نسانی مشخصات کاربری :</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='fName'>
                  نام
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='fName'
                  name='fName'
                  render={({ field }) => (
                    <Input {...field} id='fName' placeholder='کیان' invalid={errors.fName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lName'>
                  نام خانوادگی
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lName'
                  name='lName'
                  render={({ field }) => (
                    <Input {...field} id='lName' placeholder='جانلو' invalid={errors.lName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='userName'>
                  نام کاربری
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='userName'
                  name='userName'
                  render={({ field }) => (
                    <Input {...field} id='userName' placeholder='kian1234UI' invalid={errors.userName && true} />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='gmail'>
                  ایمیل
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='gmail'
                  name='gmail'
                  render={({ field }) => (
                    <Input {...field} id='gmail' placeholder='example@gmail.com' invalid={errors.gmail && true} />
                  )}
                />
                {errors.gmail && <FormFeedback>{errors.gmail.message}</FormFeedback>}
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='phoneNumber'>
                  شماره
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='phoneNumber'
                  name='phoneNumber'
                  render={({ field }) => (
                    <Input {...field} id='phoneNumber' placeholder='09126778787' invalid={errors.phoneNumber && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='recoveryEmail'>
                  ایمیل پشتیبان
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='recoveryEmail'
                  name='recoveryEmail'
                  render={({ field }) => (
                    <Input {...field} id='recoveryEmail' placeholder='Example@gmail.com' invalid={errors.recoveryEmail && true} />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className='form-label' for='userAbout'>
                  درباره من
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='userAbout'
                  name='userAbout'
                  render={({ field }) => (
                    <Input {...field} id='userAbout' placeholder='سلام دوستان من .....' invalid={errors.userAbout && true} />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='nationalCode'>
                  کد ملی
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='nationalCode'
                  name='nationalCode'
                  render={({ field }) => (
                    <Input {...field} id='nationalCode' placeholder='000000000000' invalid={errors.nationalCode && true} />
                  )}
                />
                {errors.nationalCode && <FormFeedback>{errors.nationalCode.message}</FormFeedback>}
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='birthDay'>
                  تاریخ تولد
                </Label>
                <Controller
                  control={control}
                  id='birthDay'
                  name='birthDay'
                  render={({ field }) => (
                    <FlatPicker options={{
                      enableTime: false,
                      dateFormat: 'Y-m-d',
                      altFormat: 'Y-m-d',
                      altInput: true
                    }} {...field} id='birthDay' placeholder='2002-02-03' style={{width: '100%', height: '37px', outline: 'none'}} invalid={errors.birthDay && true} />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='linkdinProfile'>
                  لینک لینکدین
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='linkdinProfile'
                  name='linkdinProfile'
                  render={({ field }) => (
                    <Input {...field} id='linkdinProfile' placeholder='https://linkdin.com' />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='telegramLink'>
                  لینک تلگرام
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='telegramLink'
                  name='telegramLink'
                  render={({ field }) => (
                    <Input {...field} id='telegramLink' placeholder='https://t.me/example' invalid={errors.nationalCode && true} />
                  )}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  تایید
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  انصراف
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default UserInfoCard
