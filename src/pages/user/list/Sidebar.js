import { useEffect, useState } from 'react'
import Sidebar from '@components/sidebar'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, Form, Input, FormFeedback } from 'reactstrap'
import { AddUser } from '../../../core/Services/api/User/AddUser'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  phoneNumber: '',
  gmail: '',
  password: '',
  firstName: '',
  lastName: '',
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {

  const [role, setRole] = useState('isStudent')
  const [isStudent, setIsStudent] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    if(role == 'isStudent') {
      setIsStudent(true)
    }
    else if(role == 'isTeacher') {
      setIsTeacher(true)
    }
  }, [role])

  const SignupSchema = yup.object().shape({
    gmail: yup.string().email(' ایمیل صحیح نمی باشد ').required(' لطفا ایمیل کاربر را وارد کنید '),
    password: yup.string().required(' لطفا رمز عبور را وارد کنید ').min(4, 'رمز عبور باید بیشتر از 4 حرف باشد'),
    phoneNumber: yup.string().required(' لطفا شماره موبایل را وارد کنید ').min(11, ' شماره صحیح نیست '),
    firstName: yup.string().required(' نام کاربری را وارد کنید '),
    lastName: yup.string().required(' نام خانوادگی را وارد کنید '),
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
    const dataObj = {
      gmail: data.gmail,
      password: data.password,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      isTeacher: isTeacher,
      isStudent: isStudent
    }

    const response = await AddUser(dataObj)

    if(response.success == true){
      toast.success('کاربر اضافه شد')
      toggleSidebar()
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='ساخت کاربر'
      headerClassName='mb-1 iranSans'
      contentClassName='pt-0 iranSans'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='firstName'>
           نام 
          </Label>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input id='firstName' placeholder='Kian' invalid={!!errors.firstName} {...field} />
            )}
          />
          {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='lastName'>
            نام خانوادگی 
          </Label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input id='lastName' placeholder='Janloo' invalid={!!errors.lastName} {...field} />
            )}
          />
          {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='gmail'>
            ایمیل
          </Label>
          <Controller
            name='gmail'
            control={control}
            render={({ field }) => (
              <Input
                type='gmail'
                id='gmail'
                placeholder='john.doe@example.com'
                className='text-sm'
                invalid={!!errors.gmail}
                {...field}
              />
            )}
          />
          {errors.gmail && <FormFeedback>{errors.gmail.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='phoneNumber'>
            شماره 
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <Input
                type='text'
                id='phoneNumber'
                placeholder='09112223344'
                className='text-sm'
                invalid={!!errors.phoneNumber}
                {...field}
              />
            )}
          />
          {errors.phoneNumber && <FormFeedback>{errors.phoneNumber.message}</FormFeedback>}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='password'>
            رمز عبور 
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' placeholder='رمز عبور را وارد کنید' className='text-sm' invalid={!!errors.password} {...field} />
            )}
          />
          {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='user-role'>
            دسترسی
          </Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='isStudent' className='iranSans'> دانشجو </option>
            <option value='isTeacher' className='iranSans'> استاد </option>
          </Input>
        </div>
        <Button type='submit' className='me-1' color='primary'>
          تایید
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          برگشت
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
