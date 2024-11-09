import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import { AddGroup } from '../../core/Services/api/CourseGroup/AddCourp'
import toast from 'react-hot-toast'
const ModalGroup = ({ isOpen, toggleModal, CourseId, refetch }) => {
  const SignupSchema = yup.object().shape({
    GroupName: yup.string().required('  نام گروه را وارد کنید '),
    GroupCapacity: yup.number().min(5, ' ظرفیت گروه باید حداقل 5 دوره باشد ').required('  طرفیت گروه را وارد کنید '),
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const handleReset = () => {
    reset({
        GroupName: '',
        GroupCapacity: 5,
    })
  }

  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('GroupName', data.GroupName)
    formData.append('CourseId', CourseId)
    formData.append('GroupCapacity', data.GroupCapacity)

    const response = await AddGroup(formData)
    if(!response){
        toast.error(' مشکلی پیش آمده است ')
    }
    else if(response.success == true){
        toast.success(response.message)
        toggleModal()
        handleReset()
        refetch()
    }
    }

  return (
    <Modal className='iranSans' isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader>
        <CardTitle tag='h4'> گروه جدید </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='GroupName'>
              نام گروه
            </Label>
            <Controller
              id='GroupName'
              name='GroupName'
              defaultValue=''
              control={control}
              render={({ field }) => <Input {...field} placeholder='نام گروه' invalid={errors.GroupName && true} />}
            />
            {errors.GroupName && <FormFeedback>{errors.GroupName.message}</FormFeedback>}
          </Col>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='GroupCapacity'>
              ظرفیت گروه
            </Label>
            <Controller
              id='GroupCapacity'
              name='GroupCapacity'
              defaultValue={5}
              control={control}
              render={({ field }) => <Input {...field} type='number' invalid={errors.GroupCapacity && true} />}
            />
            {errors.GroupCapacity && <FormFeedback>{errors.GroupCapacity.message}</FormFeedback>}
          </Col>
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              تایید
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              حذف تغییرات
            </Button>
          </div>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ModalGroup
