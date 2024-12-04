import { useState } from 'react'
import { Card, CardBody, Button, Badge } from 'reactstrap'
import jMoment from 'jalali-moment'
import "flatpickr/dist/themes/material_green.css";
import '@styles/react/libs/react-select/_react-select.scss'
import UpdateModalSession from './UpdateModalSession';

const UserInfoCard = ({ selectedUser, refetch }) => {

  const [show, setShow] = useState(false)

  console.log(selectedUser)

  return (
    <div className='iranSans'>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>مشخصات</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>نام جلسه</span>
                  <span>{selectedUser?.sessionTitle}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>توضیحات جلسه</span>
                  <span>{selectedUser?.sessionDescribe}</span>
                </li>
                {/* <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>تایم شروع</span>
                  <span>{selectedUser?.schedualStartTime}:00</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>تایم پایان</span>
                  <span>{selectedUser?.schedualEndTime}:00</span>
                </li> */}
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>وضعیت</span>
                  <Badge color={selectedUser?.forming ? 'light-success' : 'light-danger'}> {selectedUser?.forming ?  'تشکیل شده' : 'تشکیل نشده'} </Badge>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>تاریخ برگزاری</span>
                  <span>{selectedUser?.insertDate != '0001-01-01T00:00:00' ? jMoment(selectedUser?.insertDate).locale('fa').format('jD jMMMM jYYYY') : ''}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              تغییر مشخصات
            </Button>
          </div>
        </CardBody>
      </Card>
      {show && <UpdateModalSession refetch={refetch} show={show} setShow={setShow} selectedItem={selectedUser} />}
    </div>
  )
}

export default UserInfoCard
