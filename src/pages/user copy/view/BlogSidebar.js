
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Images
import { ActiveCourse } from '../../../core/Services/api/Course/ActiveCourse'
import toast from 'react-hot-toast'
import { ChangeStatusCourse } from '../../../core/Services/api/Course/ChangeStatusCourse'
import { Clipboard, LifeBuoy, ThumbsUp, User, UserMinus, UserPlus, X } from 'react-feather'
import ModalEditCourse from '../../UpdateCourse/ModalEditCourse'

const BlogSidebar = ({ Course, refetch }) => {
  // ** States
  const [currentStatus, setCurrentStatus] = useState({value: '', label: Course?.courseStatusName || 'انتخاب کنید'})

  const statusOptions = [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: "شروع ثبت نام" },
    { value: 3, label: "درحال برگزاری" },
    { value: 2, label: "منقضی شده" },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Card className='shadow-none' sm='4' style={{height: '100%', background: 'none'}}>
      <div className='shadow d-flex justify-content-between' style={{padding: '10px', borderRadius: '10px', position: 'sticky', top: '0', height: '100%'}} >
        <div className='d-flex justify-content-between' style={{gap: '30px', flexDirection: 'column'}}>
        <div className='d-flex justify-content-between' style={{gap: '7px',  flexDirection: 'column'}}>
          <div className='info-container'>
            {Course !== null ? (
                <Row>
                <Col>
                    <StatsHorizontal
                      color='success'
                      statTitle='پرداخت شده ها'
                      icon={<UserPlus size={20} />}
                      renderStats={<h3 className='fw-bolder'> {Course?.paymentDoneTotal} کاربر </h3>}
                    />
                  </Col>
                  <Col>
                    <StatsHorizontal
                      color='danger'
                      statTitle='پرداخت نشده '
                      icon={<UserMinus size={20} />}
                      renderStats={<h3 className='fw-bolder'> {Course?.paymentNotDoneTotal} کاربر  </h3>}
                    />
                  </Col>
                  <Col>
                    <StatsHorizontal
                      color='info'
                      statTitle=' گروه ها '
                      icon={<User size={20} />}
                      renderStats={<h3 className='fw-bolder'> {Course?.courseGroupTotal} گروه  </h3>}
                    />
                  </Col>
                  <Col>
                    <StatsHorizontal
                      color='success'
                      statTitle='دانشجو ها'
                      icon={<User size={20} />}
                      renderStats={<h3 className='fw-bolder'> {Course?.courseUserTotal} دانشجو  </h3>}
                    />
                  </Col>
                  <Col>
                    <StatsHorizontal
                      color='primary'
                      statTitle='نظرات '
                      icon={<User size={20} />}
                      renderStats={<h3 className='fw-bolder'> {Course?.courseCommentTotal} نظر  </h3>}
                    />
                  </Col>
                  
                  <Col>
                    <StatsHorizontal
                      color='danger'
                      statTitle='پسندیده شده ها'
                      icon={<ThumbsUp size={20} />}
                      renderStats={<h3 className='fw-bolder'> {Course?.courseLikeTotal} کاربر </h3>}
                    />
                  </Col>
              </Row>
              /* <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>پرداخت نشده :</span>
                  <Badge   color='info'>{Course?.paymentNotDoneTotal} کاربر </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'> گروه ها :</span>
                  <Badge color='info'>{Course?.courseGroupTotal} گروه </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>رزرو ها :</span>
                  <Badge color='info'>{Course?.reserveUserTotal } کاربر </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>دانشجو ها :</span>
                  <Badge color='info'>{Course?.courseUserTotal} دانشجو </Badge>
                </li>
                
                <li className='mb-75 d-flex' style={{gap: '5px', justifyItems: 'center', marginTop: '20px'}}>
                  <ThumbsUp />
                  <span style={{fontSize: '20px'}}>{Course?.courseLikeTotal} </span>
                </li>
                
              </ul> */
            ) : null}
          </div>
          <div className='info-container'>
            {Course !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 my-2'>
                  <span className='fw-bolder me-25'> وضعیت :</span>
                  <Badge color={Course?.isActive ? 'light-success' : 'light-danger'} >{Course?.isActive ? 'فعال' : 'غیر فعال'} </Badge>
                </li>
                <li className='mb-75 my-2'>
                  <span className='fw-bolder me-25'> در حال :</span>
                  <Badge color={Course?.courseStatusName === "شروع ثبت نام" && 'light-success' || Course?.courseStatusName ===  "منقضی شده" && 'light-danger' || Course?.courseStatusName ===  "درحال برگزاری" && 'light-warring'} > {Course?.courseStatusName} </Badge>
                </li>
                <li className='mb-75 my-2'>
                  <span className='fw-bolder me-25'> نوع دوره :</span>
                  <Badge color='light-warning'>{Course?.courseTypeName} </Badge>
                </li>
                <li className='mb-75 my-2'>
                  <span className='fw-bolder me-25'> سطح :</span>
                  <Badge color='light-warning'>{Course?.courseLevelName } </Badge>
                </li>
                <li className='mb-75 my-2'>
                  <span className='fw-bolder me-25'> کلاس :</span>
                  <Badge color='light-info'>{Course?.courseClassRoomName } </Badge>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        <div className='d-flex' style={{gap: '10px', flexDirection: 'column'}}>
          <Select
          isClearable={false}
          value={currentStatus}
          options={statusOptions}
          className='react-select'
          classNamePrefix='select'
          theme=''
          onChange={async (data) => {
            setCurrentStatus(data)
            const dataObj = new FormData()
            dataObj.append('CourseId', Course.courseId)
            dataObj.append('StatusId', data.value)
            const response = await ChangeStatusCourse(dataObj)
            if(response.success == true){
              toast.success(response.message)
              refetch()
            }
          }}
        />
          <Button name='active' onClick={async () => {
            const data = {
              active: (Course?.isActive ? false : true),
              id: Course?.courseId,
            }
            const response = await ActiveCourse(data)
            if(response.success == true){
              toast.success(response.message)
              refetch()
            }

          }} style={{height: '40px', width: '100%'}} color={Course?.isActive === false ? 'primary' : 'danger'}> {Course?.isActive === false ? 'فعال' : 'غیر فعال'} </Button>
          <div>
            <Button style={{height: '40px', width: '100%'}} color='primary' onClick={toggleModal}> تغییر مشخصات </Button>
          </div>
        </div>
        <ModalEditCourse isOpen={isModalOpen} toggleModal={toggleModal} Course={Course} />
      </div>
      </div>
    </Card>
  )
}

export default BlogSidebar
