import React from 'react'
import { useQuery } from 'react-query'
import { Button, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { GetDetailPayment } from '../../../core/Services/api/Payment/GetDetailPayment'

const DetailPayment = ({ show, setShow, selectedPayment }) => {

  const {data} = useQuery({queryKey: ['GetDetailPayment', selectedPayment.id], queryFn: () => GetDetailPayment(selectedPayment.id)})

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} size='lg' centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'>  مشخصات پرداخت  </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg='12' className='mb-1'>
            <img src={data?.paymentInvoiceImage} style={{width: '100%', background: '#ddd', borderRadius: '10px'}} />
          </Col>
          <Col lg='12'>
            <h5> نام دوره : </h5>
            <h3 className='my-1'> {data?.title} </h3>
          </Col>
          <Col lg='12' className='my-3'>
            <h5> شماره پرداخت : </h5>
            <h3 className='my-1'> {data?.paymentInvoiceNumber} </h3>
          </Col>
          <Col lg='12' className='my-2'>
            <h5> قیمت : </h5>
            <h3 className='my-1'> {parseInt(data?.paid).toLocaleString('en-US')} </h3>
          </Col>
          <div className='d-flex my-2'>
            <Button outline color='secondary' type='reset' onClick={() => setShow(false)}>
              برگشت
            </Button>
          </div>
          </Row>
      </ModalBody>
    </Modal>
  )
}

export default DetailPayment
