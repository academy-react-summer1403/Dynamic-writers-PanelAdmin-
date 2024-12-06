import { useForm } from 'react-hook-form'
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
    reset({})
  }

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFile = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }

  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('PaymentId', course.id)
    formData.append('Image', file !== null ? file : course.paymentInvoiceImage)

    const response = await AddImageCoursePayments(formData)
    if(response.success === true){
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
        centered
    >
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'> تغییر رسید </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg='12' className='mb-1'>
              <div>
                تصویر رسید
              </div>
              <Label for='image' style={{width: '100%'}}>
                <div className='border bg-white p-1 cursor-pointer' style={{width: '100%'}}> لطفا عکس را انتخاب کنید </div>                                   
              </Label>
              <Input type='file' id='image' className='hidden' onChange={handleFile} />
            </Col>

            {preview && (
              <Col lg="12" className="">
                <img src={preview} alt="Image Preview" style={{ width: '100%', height: '300px', background: '#ddd', borderRadius: '10px', objectFit: 'cover' }} />
              </Col>
            )}

            <div className='d-flex mt-3'>
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

export default AddImageCoursePaymentModal
