import { useState } from 'react'
import { Card, CardBody, Button, Badge } from 'reactstrap'
import { Check, Briefcase, X, User } from 'react-feather'
import jMoment from 'jalali-moment'
import Avatar from '@components/avatar'
import "flatpickr/dist/themes/material_green.css";
import '@styles/react/libs/react-select/_react-select.scss'
import { useNavigate } from 'react-router-dom'
import ModalUpdate from './ModalUpdate'

const UserInfoCard = ({ selectedUser }) => {

  const [show, setShow] = useState(false)

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.currentPictureAddress != 'Not-set' && selectedUser.currentPictureAddress.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.currentPictureAddress}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.currentPictureAddress || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={(selectedUser.fName)}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '100%'
          }}
        />
      )
    }
  }

  return (
    <div className='iranSans'>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser.fName !== null && selectedUser.lName !== null ? (selectedUser.fName + ' ' + selectedUser.lName) : 'نامشخص'}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.id} </h4>
                <small> شناسه کاربر </small>
              </div>
            </div>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <User className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.gender == true ? 'زن' : 'مرد'} </h4>
                <small> جنسیت </small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.profileCompletionPercentage ? selectedUser.profileCompletionPercentage : '0'}% </h4>
                <small> وضعیت حساب </small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>مشخصات کاربر</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>نام کاربری</span>
                  <span>{selectedUser.userName}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>ایمیل</span>
                  <span>{selectedUser.gmail}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>شماره</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>آدرس</span>
                  <span>{selectedUser.homeAdderess}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>کد ملی</span>
                  <span>{selectedUser.nationalCode}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>تاریخ تولد</span>
                  <span>{selectedUser.birthDay != '0001-01-01T00:00:00' ? jMoment(selectedUser.birthDay).locale('fa').format('jD jMMMM jYYYY') : ''}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>دسترسی</span>
                  <span className='text-capitalize d-flex' style={{width: '300px', flexFlow: 'row wrap'}} dir='ltr'>{selectedUser !== null ? (
                    selectedUser.roles.map(role => {
                      return  <Badge color='primary' style={{margin: '2px'}}> {role.roleName} </Badge>
                    })
                  ) : null}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>توضیحات کاربر</span>
                  <span>{selectedUser.userAbout}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => {setShow(true), handleReset()}}>
              تغییر مشخصات
            </Button>
          </div>
          {show && <ModalUpdate show={show} setShow={setShow} selectedUser={selectedUser} />}
        </CardBody>
      </Card>
    </div>
  )
}

export default UserInfoCard
