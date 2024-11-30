import { useState } from 'react'
import { Card, CardBody, Button } from 'reactstrap'
import jMoment from 'jalali-moment'
import "flatpickr/dist/themes/material_green.css";
import '@styles/react/libs/react-select/_react-select.scss'
import ModalUpdate from './ModalUpdate';

const UserInfoCard = ({ selectedUser, refetch }) => {

  const [show, setShow] = useState(false)

  return (
    <div className='iranSans'>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>مشخصات</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>نام دوره</span>
                  <span>{selectedUser.courseAssistanceDto.courseName}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>شناسه کاربر</span>
                  <span>{selectedUser.courseAssistanceDto.userId}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>نام منتور</span>
                  <span>{selectedUser.courseAssistanceDto.assistanceName || 'نامشخص'}</span>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'>تاریخ</span>
                  <span>{selectedUser.courseAssistanceDto.inserDate != '0001-01-01T00:00:00' ? jMoment(selectedUser.courseAssistanceDto.inserDate).locale('fa').format('jD jMMMM jYYYY') : ''}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              تغییر منتور
            </Button>
          </div>
        </CardBody>
      </Card>
      <ModalUpdate show={show} setShow={setShow} refetch={refetch} selectedAssistant={selectedUser.courseAssistanceDto} />
    </div>
  )
}

export default UserInfoCard
