// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Alert,
  Input,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { Key, Settings, MessageSquare, ChevronRight , Loader } from 'react-feather'

// ** Images
import qrCode from '@src/assets/images/icons/qrcode.png'
import { useNavigate } from 'react-router-dom'
import ActiveNews from '../../../core/Services/api/New/ActiveNews'

const AuthenticationExample = ({showValue,id,setFlag}) => {
  const [show, setShow] = useState(false)
  const [isFlag, setisFlag] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setShow(showValue)
    
  },[])
  const handleActiveNews = async() => {
    setisFlag(true)
    setShow(false)
    let massage=await ActiveNews(id)
    console.log(massage)
    navigate('/News/list')
  }
  const handlekNoActive = () => {
    setShow(false)
    setTimeout(() => {
        setFlag(false)
    }, 1000);
  }
  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-md'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-5 mx-50'>
          <h1 className='text-center mb-1 text-success'>فعال کردن خبر یا مقاله</h1>
          <p className='text-center mb-3 mt-5 fs-2 lh-base'>
            آیا از فعال کردن این خبر یا مقاله مطمئن هستید؟
          </p>
          
          <Button color='success' className='float-end mt-2 fs-4' style={{minHeight:"45px"}} onClick={handleActiveNews}>
            {isFlag && <Loader className='me-1'/>}
            <span className='me-50'>بله</span>
          </Button>
          <Button color='danger' className='float-end mx-2 mt-2 fs-4' style={{minHeight:"45px"}} onClick={handlekNoActive}>
            <span className='me-50'>خیر</span>
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AuthenticationExample
