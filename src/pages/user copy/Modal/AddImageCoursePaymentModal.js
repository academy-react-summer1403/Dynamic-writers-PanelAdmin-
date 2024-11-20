import { Controller, useForm } from 'react-hook-form'

import { CardTitle, Button, Form, Modal, ModalHeader, ModalBody, Row, Col, Label, Input } from 'reactstrap'
import toast from 'react-hot-toast'
import { AddImageCoursePayments } from '../../../core/Services/api/Payment/AddImageCoursePayments'
import { useState } from 'react'

const AddImageCoursePaymentModal = ({ show, setShow, course, refetch }) => {

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange'})

  const handleReset = () => {
    reset({
        
    })
  }

  const [file, setFile] = useState(null)

  const handleFile = (e) => {
    setFile(e.target.files)
  }

  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('PaymentId', course.id)
    formData.append('Image', file[0] || course.paymentInvoiceImage)

    const response = await AddImageCoursePayments(formData)
    if(response.success == true){
        toast.success(response.message)
        setShow(false)
        handleReset()
        refetch()
    }
    }

  return (
    <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='iranSans'
        >

      <ModalHeader>
        <CardTitle tag='h2' className='my-2'> تغییر تصویر </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col lg='12' className='mb-1'>
            <Label className='form-label' for='Image'>
              تصویر
            </Label>
            <Input type='file' onChange={(e) => handleFile(e)} />
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

export default AddImageCoursePaymentModal
