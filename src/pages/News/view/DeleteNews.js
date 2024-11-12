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

const AuthenticationExample = ({showValue}) => {
  const [show, setShow] = useState(false)
  const [isFlag, setisFlag] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setShow(showValue)
  },[])
  const handleDeleteNews = () => {
    setisFlag(true)
    setShow(false)
    navigate('/News/list')
  }
  const handleClickNo = () => {
    setShow(false)
  }
  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-md'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-5 mx-50'>
          <h1 className='text-center mb-1 text-danger'>حذف خبر یا مقاله</h1>
          <p className='text-center mb-3 mt-5 fs-2'>
            آیا از حذف این خبر یا مقاله مطمئن هستید؟
          </p>
          
          <Button color='danger' className='float-end mt-2 fs-4' style={{minHeight:"45px"}} onClick={handleDeleteNews}>
            {isFlag && <Loader className='me-1'/>}
            <span className='me-50'>بله</span>
          </Button>
          <Button color='success' className='float-end mx-2 mt-2 fs-4' style={{minHeight:"45px"}} onClick={handleClickNo}>
            <span className='me-50'>خیر</span>
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AuthenticationExample
