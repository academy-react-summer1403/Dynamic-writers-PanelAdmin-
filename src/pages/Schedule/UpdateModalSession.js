import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateSession } from '../../core/Services/api/Session/UpdateSession'

const UpdateModalSession = ({ show, setShow, refetch, selectedItem }) => {

  const SignupSchema = yup.object().shape({
    sessionTitle: yup.string().required(' نام جلسه را وارد کنید ').min(5, ' نام جلسه باید بیشتر از 5 حرف باشد '),
    sessionDescribe: yup.string().required(' توصیحات جلسه را وارد کنید ').min(10, ' توصیحات جلسه باید بیشتر از 10 حرف باشد ')
  })

  const { reset, control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (data) => {

    const dataObj = {
        scheduleSessionId: selectedItem.scheduleSessionId,
        sessionTitle: data.sessionTitle,
        sessionDescribe: data.sessionDescribe
      }

    const response = await UpdateSession(dataObj)
    if (response.success) {
        refetch()
        toast.success(response.message)
        setShow(false)
    }
  }

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'>ویرایش مشخصات</CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='sessionTitle'>
                نام جلسه
              </Label>
              <Controller
                id='sessionTitle'
                name='sessionTitle'
                defaultValue={selectedItem.sessionTitle || ''}
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.sessionTitle && true} />}
              />
              {errors.sessionTitle && <FormFeedback>{errors.sessionTitle.message}</FormFeedback>}
            </Col>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='sessionDescribe'>
                توضیحات جلسه
              </Label>
              <Controller
                id='sessionDescribe'
                name='sessionDescribe'
                defaultValue={selectedItem.sessionDescribe || ''}
                control={control}
                render={({ field }) => <Input {...field} invalid={errors.sessionDescribe && true} />}
              />
              {errors.sessionDescribe && <FormFeedback>{errors.sessionDescribe.message}</FormFeedback>}
            </Col>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                تایید
              </Button>
              <Button outline color='secondary' type='reset' onClick={() => setShow(false)}>
                برگشت
              </Button>
            </div>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default UpdateModalSession
