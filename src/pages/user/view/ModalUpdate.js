import { UpdateUser } from '../../../core/Services/api/User/UpdateUser'
import toast from 'react-hot-toast'
import FlatPicker from 'react-flatpickr'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Modal, Input, Label, ModalBody, ModalHeader, FormFeedback } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import "flatpickr/dist/themes/material_green.css";
import '@styles/react/libs/react-select/_react-select.scss'
import { useNavigate } from 'react-router-dom'

const ModalUpdate = ({ show, setShow, selectedUser }) => {

    const SignupSchema = yup.object().shape({
        nationalCode: yup.string().min(10, ' کد ملی معتبر نمی باشد ').required(' کد ملی معتبر نمی باشد '),
        gmail: yup.string().email(' ایمیل وارد شده صحیح نمی باشد ')
    })

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
            currentPictureAddress: selectedUser.currentPictureAddress,
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
          currentPictureAddress: selectedUser.currentPictureAddress,
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

  return (
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
  )
}

export default ModalUpdate
