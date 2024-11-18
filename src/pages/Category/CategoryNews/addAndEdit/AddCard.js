// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Label,
  Input,
  Form,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  FormFeedback,
} from 'reactstrap'

// ** Third Party Components
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { Check, X, CreditCard } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// ** Images
import toast from "react-hot-toast";
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'
import { UpdateCategory } from '../../../../core/Services/api/Category/UpdateCategory'
import { AddCategory } from '../../../../core/Services/api/Category/AddCategory'

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
}

const defaultValues = {
  cardNumber: ''
}

const AddCardExample = ({showValue,setshowValue,isEdit,information,refetch}) => {
  // ** States
  const [show, setShow] = useState(showValue)
  const [cardType, setCardType] = useState('')

  // ** Hooks


  const onSubmit =async(value)=>{
    if(isEdit){

      let massage=await UpdateCategory(information.id,value.title,value.google,value.googleDesc)
      console.log(massage)
        toast.success(massage.message)
        setShow(!show);
        setTimeout(() => setshowValue(!show),600)
        refetch()

      }
      else{
        let massage=await AddCategory(information.id,value.title,value.google,value.googleDesc)
        console.log(massage)
          toast.success(massage.message)
          setShow(!show);
          setTimeout(() => setshowValue(!show),600)
          refetch()
      }
  }

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'عنوان باید حداقل 3 کاراکتر باشد').max(80, 'عنوان نمی‌تواند بیش از 80 کاراکتر باشد').required('فیلد اجباریست'),
  google: Yup.string().min(40, 'عنوان باید حداقل 40 کاراکتر باشد').max(70, 'عنوان نمی‌تواند بیش از 70 کاراکتر باشد').required('فیلد اجباریست'),
  googleDesc: Yup.string().min(70, 'عنوان باید حداقل 70 کاراکتر باشد').max(150, 'عنوان نمی‌تواند بیش از 150 کاراکتر باشد').required('فیلد اجباریست'),

})

const formik = useFormik({
  initialValues: {
    title: information.title,
    google: information.google,
    googleDesc:information.googleDesc,
  },
  validationSchema:validationSchema,
  enableReinitialize:true,
  onSubmit: (values) => {
    onSubmit(values)
  },
})
const handleTitleChange = (e) => formik.setFieldValue('title', e.target.value)
const handleGoogleChange = (e) => formik.setFieldValue('googleDesc', e.target.value)
const handleTitleGoogleChange = (e) => formik.setFieldValue('google', e.target.value)

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => {setShow(!show);setTimeout(() => setshowValue(!show),600)}}
        className='modal-dialog-centered iranSans'
      >
        <ModalHeader className='bg-transparent' toggle={() => {setShow(!show);setTimeout(() => setshowValue(!show),600)}}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>{isEdit? "ویرایش دسته بندی":"افزودن دسته بندی"}</h1>
          <Form className='gy-1 gx-2 mt-75' onSubmit={formik.handleSubmit}>

          <Row className='gy-1 gx-2 mt-75'>
            <Col xs={12}>
              <Label className='form-label' for='credit-card'>
                عنوان دسته بندی
              </Label>
              <Input
                  name="title"
                  type='textarea'
                  style={{minHeight:"70px",maxHeight:"70px"}}
                  placeholder='عنوان دسته بندی را وارد کنید'
                  value={formik.values.title}
                  onChange={handleTitleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.title ? true : false}
                />
                {formik.errors.title && <FormFeedback>{formik.errors.title}</FormFeedback>}
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='credit-card'>
                عنوان در گوگل
              </Label>
              <Input
                  name="google"
                  type='textarea'
                  style={{minHeight:"60px",maxHeight:"60px"}}
                  placeholder='عنوان دسته بندی در گوگل را وارد کنید'
                  value={formik.values.google}
                  onChange={handleTitleGoogleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.google ? true : false}
                />
                {formik.errors.google && <FormFeedback>{formik.errors.google}</FormFeedback>}
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='credit-card'>
                توضیحات در گوگل
              </Label>
              <Input
                  type='textarea'
                  name="googleDesc"
                  placeholder='توضیحات دسته بندی در گوگل را وارد کنید'
                  value={formik.values.googleDesc}
                  style={{minHeight:"100px",maxHeight:"100px"}}
                  onChange={handleGoogleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.googleDesc ? true : false}
                />
                {formik.errors.googleDesc && <FormFeedback>{formik.errors.googleDesc}</FormFeedback>}
            </Col>            
            <Col className='text-center mt-1' xs={12}>
              <Button type='submit' className='me-1' color='success'>
              {isEdit? "ویرایش":"افزودن"}
              </Button>
              <Button
                color='danger'
                outline
                onClick={() => {
                  setShow(!show)
                  setTimeout(() => setshowValue(!show),600)
                  reset()
                }}
              >
                لغو
              </Button>
            </Col>
          </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddCardExample
