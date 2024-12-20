
import { useState } from 'react'
import Select from 'react-select'
import {
  Badge,
  Button,
  Card,
  Col,
  Label,
  Row,
} from 'reactstrap'
import '@styles/base/pages/page-blog.scss'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { ActiveCourse } from '../../../core/Services/api/Course/ActiveCourse'
import toast from 'react-hot-toast'
import { ChangeStatusCourse } from '../../../core/Services/api/Course/ChangeStatusCourse'
import { ThumbsUp, User, UserMinus, UserPlus, X } from 'react-feather'
import ModalEditCourse from '../../UpdateCourse/ModalEditCourse'
import { useQuery } from '@tanstack/react-query'
import { GetCategory } from '../../../core/Services/api/Course/GetCategory'
import { AddTech } from '../../../core/Services/api/Course/AddTech'
import { useParams } from 'react-router-dom'
import ModalAddAssistant from '../../Assistants/ModalAddAssistant'
import AddModal from '../../Schedule/AddModal'

const BlogSidebar = ({ Course, refetch }) => {
  const {data: Category, refetch: refetchCat, isLoading: isLoadingCat} = useQuery({queryKey: ['GetCategory'], queryFn: GetCategory})
  const [currentStatus, setCurrentStatus] = useState({value: '', label: Course?.courseStatusName || 'انتخاب کنید'})
  
  const [currentCat, setCurrentCat] = useState({value: '', label: Course.courseTeches[1] || 'انتخاب کنید'})
  const CatOption = Category?.map(cat => ({value: cat.id, label: cat.techName}))

  const {id} = useParams()

  const statusOptions = [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: "شروع ثبت نام" },
    { value: 3, label: "درحال برگزاری" },
    { value: 2, label: "منقضی شده" },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Card className='shadow-none' sm='4' style={{height: 'content-fit', background: 'none'}}>
      <div className='shadow d-flex justify-content-between' style={{padding: '10px', borderRadius: '10px', position: 'sticky', top: '0', height: '100%'}} >
        <div className='d-flex justify-content-between' style={{gap: '30px', flexDirection: 'column'}}>
        <div className='d-flex justify-content-between' style={{gap: '7px',  flexDirection: 'column'}}>
          <div className='info-container'>
            {Course !== null ? (
                <Row>
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
            ) : null}
          </div>
          <div className='info-container'>
            {Course !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 my-2 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'> وضعیت </span>
                  <Badge color={Course?.isActive ? 'light-success' : 'light-danger'} >{Course?.isActive ? 'فعال' : 'غیر فعال'} </Badge>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 my-2 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'> در حال </span>
                  <Badge color={Course?.courseStatusName === "شروع ثبت نام" && 'light-success' || Course?.courseStatusName ===  "منقضی شده" && 'light-danger' || Course?.courseStatusName ===  "درحال برگزاری" && 'light-warning'} > {Course?.courseStatusName} </Badge>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 my-2 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'> نوع دوره </span>
                  <Badge color='light-warning'>{Course?.courseTypeName} </Badge>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 my-2 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'> سطح </span>
                  <Badge color='light-warning'>{Course?.courseLevelName } </Badge>
                </li>
                <hr className='my-2'></hr>
                <li className='mb-75 my-2 d-flex justify-content-between'>
                  <span className='fw-bolder me-25'> کلاس </span>
                  <Badge color='light-info'>{Course?.courseClassRoomName } </Badge>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        <div className='d-flex mb-5' style={{gap: '10px', flexDirection: 'column'}}>
        <div>
          <Label for='tech' className='d-flex justify-content-between'>
            <span> تکنولوژی : </span>
          </Label>
          <Select
            isClearable={false}
            id='tech'
            name='tech'
            value={currentCat}
            options={CatOption}
            className='react-select'
            classNamePrefix='select'
            theme=''
            onChange={async (data) => {
              setCurrentCat(data)
              const response = await AddTech(id, data.value)
              if(response.success == true){
                if(response.message.match('تکنولوژی برای این کورس قبلا افزوده شده.عملیات با موفقیت انجام شد.')){
                  toast.error(' این تکنولوژی قبلا برای این دوره ثبت شده است ')
                }
                else{
                  toast.success(response.message)                }
                refetch()
                refetchCat()
              }
            }}
          />
          </div>
          وضعیت :
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
              toast.dismiss()
              toast.success(response.message)
              refetch()
            }
          }}
        />
        <div className='my-1 d-flex flex-column gap-1'>
            <div>
              <Button style={{height: '40px', width: '100%'}} color='primary' onClick={toggleModal}> تغییر مشخصات </Button>
            </div>
            <Button style={{height: '40px', width: '100%'}} color='primary' onClick={() => setShow(true)}> منتور جدید </Button>
            <Button style={{height: '40px', width: '100%'}} color='primary' onClick={() => setShow2(true)}> زمان کلاس </Button>
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
        </div>
        </div>
        <ModalEditCourse isOpen={isModalOpen} refetch={refetch} toggleModal={toggleModal} Course={Course} />
      </div>
      </div>
      {show && <ModalAddAssistant refetch={refetch} show={show} setShow={setShow} courseId={Course?.courseId} />}
      {show2 && <AddModal show={show2} setShow={setShow2} selectedItem={Course?.courseId} refetch={refetch} />}
    </Card>
  )
}

export default BlogSidebar
