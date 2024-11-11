import { useEffect, useState } from 'react'
import Sidebar from '@components/sidebar'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { AddUser } from '../../../core/Services/api/User/AddUser'
import toast from 'react-hot-toast'

const defaultValues = {
  phoneNumber: '',
  gmail: '',
  password: '',
  firstName: '',
  lastName: '',
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
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

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSub = async (dataObj) => {
    const response = await AddUser(dataObj)

    if(!response){
      toast.error(' کاربر اضافه نشد! ')
    }
    else if(response.success == true){
      toast.success('کاربر اضافه شد')
    }
  }

  // const {mutate} = AddUser()

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      toggleSidebar()
        onSub({
          gmail: data.gmail,
          password: data.password,
          phoneNumber: data.phoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          isTeacher: isTeacher,
          isStudent: isStudent
        })
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('isStudent')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='ساخت کاربر'
      headerClassName='mb-1 iranSans'
      contentClassName='pt-0 iranSans'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='firstName'>
           نام <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input id='firstName' placeholder='Kian' invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='lastName'>
            نام خانوادگی <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input id='lastName' placeholder='Janloo' invalid={errors.lastName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='gmail'>
            ایمیل <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gmail'
            control={control}
            render={({ field }) => (
              <Input
                type='gmail'
                id='gmail'
                placeholder='john.doe@example.com'
                invalid={errors.gmail && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='phoneNumber'>
            شماره <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <Input
                type='text'
                id='phoneNumber'
                placeholder='09112223344'
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='password'>
            رمز عبور <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' placeholder='(397) 294-5153' invalid={errors.password && true} {...field} />
            )}
          />
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
