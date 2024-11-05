// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X, User } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

import jMoment from 'jalali-moment'

// ** Custom Components
import Avatar from '@components/avatar'

import "flatpickr/dist/themes/material_green.css";

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UpdateUser } from '../../../core/Services/api/User/UpdateUser'
import toast from 'react-hot-toast'
import DatePicker from 'react-flatpickr'

const roleColors = {
  Administrator: 'light-danger',
  Teacher: 'light-warning',
  Student: 'light-primary'
}

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: selectedUser?.id,
      fName: selectedUser?.fName,
      lName: selectedUser?.lName,
      userName: selectedUser?.userName,
      gmail: selectedUser?.gmail,
      phoneNumber: selectedUser?.phoneNumber,
      active: selectedUser?.active,
      isDelete: selectedUser?.isDelete,
      isTecher: selectedUser?.isTeacher,
      isStudent: selectedUser?.isStudent,
      recoveryEmail: selectedUser?.recoveryEmail,
      twoStepAuth: selectedUser?.twoStepAuth,
      userAbout: selectedUser?.userAbout,
      currentPictureAddress: selectedUser?.currentPictureAddress,
      profileCompletionPercentage: selectedUser?.profileCompletionPercentage,
      linkdinProfile: selectedUser?.linkdinProfile,
      telegramLink: selectedUser?.telegramLink,
      receiveMessageEvent: selectedUser?.receiveMessageEvent,
      homeAdderess: selectedUser?.homeAdderess,
      nationalCode: selectedUser?.nationalCode,
      gender: selectedUser?.gender,
      latitude: selectedUser?.latitude,
      longitude: selectedUser?.longitude,
      insertDate: selectedUser?.insertDate,
      birthDay: selectedUser?.birthDay,
      roles: [],
      courses: [],
      coursesReseves: []
    }
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
    const response = await UpdateUser(data)
    if (!response){
      toast.error(' عملیات موفقیت آمیز نبود ')
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
        fName: selectedUser?.fName,
        lName: selectedUser?.lName,
        userName: selectedUser?.userName,
        gmail: selectedUser?.gmail,
        phoneNumber: selectedUser?.phoneNumber,
        active: selectedUser?.active,
        isDelete: selectedUser?.isDelete,
        isTecher: selectedUser?.isTeacher,
        isStudent: selectedUser?.isStudent,
        recoveryEmail: selectedUser?.recoveryEmail,
        twoStepAuth: selectedUser?.twoStepAuth,
        userAbout: selectedUser?.userAbout,
        currentPictureAddress: selectedUser?.currentPictureAddress,
        profileCompletionPercentage: selectedUser?.profileCompletionPercentage,
        linkdinProfile: selectedUser?.linkdinProfile,
        telegramLink: selectedUser?.telegramLink,
        receiveMessageEvent: selectedUser?.receiveMessageEvent,
        homeAdderess: selectedUser?.homeAdderess,
        nationalCode: selectedUser?.nationalCode,
        gender: selectedUser?.gender,
        latitude: selectedUser?.latitude,
        longitude: selectedUser?.longitude,
        insertDate: selectedUser?.insertDate,
        birthDay: selectedUser?.birthDay,
        roles: [],
        courses: [],
        coursesReseves: []
    })
  }

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert user!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Suspend user!',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-outline-danger ms-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: 'success',
  //         title: 'Suspended!',
  //         text: 'User has been suspended.',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: 'Cancelled',
  //         text: 'Cancelled Suspension :)',
  //         icon: 'error',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     }
  //   })
  // }

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
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>نام کاربری:</span>
                  <span>{selectedUser.userName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ایمیل :</span>
                  <span>{selectedUser.gmail}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>شماره :</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>آدرس :</span>
                  <span>{selectedUser.homeAdderess}</span>
                </li>
                
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>کد ملی :</span>
                  <span>{selectedUser.nationalCode}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>تاریخ تولد :</span>
                  <span>{selectedUser.birthDay != '0001-01-01T00:00:00' ? jMoment(selectedUser.birthDay).locale('fa').format('jD jMMMM jYYYY') : ''}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>دسترسی:</span>
                  <span className='text-capitalize'>{selectedUser !== null ? (
                    selectedUser.roles.map(role => {
                      return  <span style={{margin: '2px'}}> {role.roleName} </span>
                    })
                  ) : null}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>توضیحات کاربر:</span>
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
                    <Input {...field} id='birthDay' placeholder='2002-02-03' invalid={errors.birthDay && true} />
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
                    <Input {...field} id='linkdinProfile' placeholder='https://linkdin.com' invalid={errors.linkdinProfile && true} />
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

              {/* <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                    <Label className='form-check-label fw-bolder' for='billing-switch'>
                      
                    </Label>
                  </div>
                </div>
              </Col> */}
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
