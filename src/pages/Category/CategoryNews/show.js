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
import jMoment from 'jalali-moment'
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'

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

const AddCardExample = ({showValue,setshowValue,information}) => {
  // ** States
  const [show, setShow] = useState(showValue)
    console.log(information)
  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => {setShow(!show);setTimeout(() => setshowValue(!show),600)}}
        className='modal-dialog-centered iranSans'
      >
        <ModalHeader className='bg-transparent' toggle={() => {setShow(!show);setTimeout(() => setshowValue(!show),600)}}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>اطلاعات دسته بندی</h1>
          <Row className='gy-1 gx-2 mt-75'>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                عنوان دسته بندی
              </Label>
              <div className='text-right' style={{fontSize:"18px"}}>
                {information.title}
              </div>
            </Col>
            <hr className='my-1'></hr>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                عنوان در گوگل
              </Label>
              <div className='text-right' style={{fontSize:"18px"}}>
              {information.google}
              </div>
            </Col>
            <hr className='my-1'></hr>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                توضیحات در گوگل
              </Label>
              <div className='text-right' style={{fontSize:"18px"}}>
              {information.googleDesc}
              </div>
            </Col>   
            <hr className='my-1'></hr>  
            <Col xs={12} style={{direction:"rtl"}}>
              <Label className='form-label ' style={{fontSize:"20px",color:"blue"}} for='credit-card'>بارگذاری شده در </Label>
              <span>{ "   "+ jMoment(information.insertDate).locale('fa').format('jD jMMMM jYYYY')}</span>
            </Col>            
            <Col className='text-center mt-1' xs={12}>
              
                          
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddCardExample
