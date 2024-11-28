import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateCoursePayments } from '../../../core/Services/api/Payment/UpdateCoursePayments'

const UpdateCoursePaymentModal = ({ show, setShow, course }) => {
  const SignupSchema = yup.object().shape({
    Paid: yup.number().required(' قیمت رو وارد کنید ').typeError(' این فیلد باید عدد باشد '),
    PaymentInvoiceNumber:  yup.number().required(' شماره فاکتور را وارد کنید ').typeError(' این فیلد باید عدد باشد ')
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const handleReset = () => {
    reset({
        Paid: course.paid,
        PaymentInvoiceNumber: course.paymentInvoiceNumber
    })
  }

  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('Id', course.id)
    formData.append('Paid', data.Paid)
    formData.append('PeymentDate', course.peymentDate)
    formData.append('PaymentInvoiceNumber', data.PaymentInvoiceNumber)
    
    const response = await UpdateCoursePayments(formData)
    if(response.success == true){
        toast.success(response.message)
        setShow(false)
        handleReset()
        refetch()
    }
    }

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'> تغییر مشخصات </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='Paid'>
              قیمت
            </Label>
            <Controller
              id='Paid'
              name='Paid'
              defaultValue={course.paid}
              control={control}
              render={({ field }) => <Input {...field} type='number' invalid={errors.Paid && true} />}
            />
            {errors.Paid && <FormFeedback>{errors.Paid.message}</FormFeedback>}
          </Col>
          <Col lg='12' className='mb-1'>
            <Label className='form-label' for='PaymentInvoiceNumber'>
              شماره فاکتور پرداخت
            </Label>
            <Controller
              id='PaymentInvoiceNumber'
              name='PaymentInvoiceNumber'
              defaultValue={course.paymentInvoiceNumber}
              control={control}
              render={({ field }) => <Input {...field} type='number' invalid={errors.PaymentInvoiceNumber && true} />}
            />
            {errors.PaymentInvoiceNumber && <FormFeedback>{errors.PaymentInvoiceNumber.message}</FormFeedback>}
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

export default UpdateCoursePaymentModal
