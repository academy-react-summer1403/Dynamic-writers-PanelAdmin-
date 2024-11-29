import { Fragment, useState } from 'react'
import {
  Row,
  Col,
  Modal,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import jMoment from 'jalali-moment'


const Show = ({showValue,setshowValue,information}) => {

  const [show, setShow] = useState(showValue)

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
              <div className='text-right' style={{fontSize:"18px", overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {information.google}
              </div>
            </Col>
            <hr className='my-1'></hr>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                توضیحات در گوگل
              </Label>
              <div className='text-right' style={{fontSize:"18px", overflow: 'hidden', textOverflow: 'ellipsis'}}>
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

export default Show
