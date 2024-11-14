// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import classnames from 'classnames'
import Sidebar from './BlogSidebar'
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
  X,
  MoreVertical,
  Trash2,
  Edit
} from 'react-feather'

// ** Utils
import { kFormatter } from '@utils'
import jMoment from 'jalali-moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import { useQuery } from '@tanstack/react-query'
import { GetDetailCourse } from '../../../core/Services/api/Course/GetDetailCourse'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import BlogSidebar from './BlogSidebar'
import { GetCategory } from '../../../core/Services/api/Course/GetCategory'
import { AddTech } from '../../../core/Services/api/Course/AddTech'
import { GetGroupCourse } from '../../../core/Services/api/CourseGroup/GetGroupCourse'
import { DeleteGroup } from '../../../core/Services/api/CourseGroup/DeleteGroup'
import ModalGroup from '../../ModalCourp/ModalGroup'
import EditModalGroup from '../../ModalCourp/EditModalGroup'
import { setItem } from '../../../core/Services/common/storage'

const BlogDetails = () => {
  const {id} = useParams()

  const {data: Course, refetch, isLoading} = useQuery({queryKey: ['GetDetailCourse', id], queryFn: () => GetDetailCourse(id)})
  const {data: Group, refetch: refetchGroup, isLoading: isLoadingGroup} = useQuery({queryKey: ['GetGroupCourse', Course?.teacherId, Course?.courseId], queryFn: () => GetGroupCourse(Course?.teacherId, Course?.courseId)})
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  setItem('ImageCourse', Course?.imageAddress)

  const filteredCourses = Group
  ? Group.filter(course => {
      const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
  : [];

  const [editingGroupId, setEditingGroupId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal2 = (groupId) => {
    setEditingGroupId(groupId === editingGroupId ? null : groupId)
  }
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // ** States
  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }

  const renderTags = () => {
    return Course?.courseTeches.map((tag, index) => {
      return (
        <a key={index} href='/' onClick={e => e.preventDefault()}>
          <Badge
            className={classnames({
              'me-50': index !== Course?.courseTeches.length - 1
            })}
            color={badgeColorsArr['Fashion']}
            pill
          >
            {tag}
          </Badge>
        </a>
      )
    })
  }

  return (
    <Fragment>
       {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='blog-wrapper' style={{height: '1320px'}}>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {Course !== null ? (
              <Row>
                <Col sm='12'>
                  <Card className='mb-3'>
                    <img src={Course?.imageAddress} className='img-fluid' style={{width: '100%', height: '560px', background: 'gray'}} top />
                    <CardBody>
                      <CardTitle tag='h4'>{Course?.title}</CardTitle>
                      <div className='d-flex' style={{justifyContent: 'space-between'}}>
                        <div>
                        <Avatar className='me-50' imgHeight='24' imgWidth='24' />
                          <small className='text-muted me-25'>توسط</small>
                          <small>
                              {Course?.teacherName}
                          </small>
                          <span className='text-muted ms-50 me-25'>|</span>
                          <small className='text-muted'>{jMoment(Course?.insertDate).locale('fa').format('jD jMMMM jYYYY')}</small>
                        </div>
                        <span style={{fontSize: '20px', fontWeight: 'bold'}}> {parseInt(Course?.cost).toLocaleString('en-US')} <span style={{fontSize: '14px', fontWeight: 'bold', color: 'blue'}}>  تومان  </span>  </span>
                      </div>
                      <div className='my-1 py-25 my-3'>{renderTags()}</div>
                      <CardTitle> توضیحات </CardTitle>

                      <div className='d-flex' style={{justifyContent: 'space-between', gap: '100px'}}>
                        <div className='d-flex'>
                          <div>
                            {/* <Avatar style={{overflow: 'hidden'}} img={Course?.imageAddress} className='me-2' imgHeight='60' imgWidth='60' /> */}
                          </div>
                          <div>
                            <h6 className='fw-bolder'>{Course?.title}</h6>
                            <CardText className='mb-0'>
                              {Course?.describe}
                            </CardText>
                          </div>
                        </div>
                        
                      </div>
                      <hr></hr>
                      <div className='d-flex justify-content-between w-100'>
                        <h3 className='my-1'> گروه ها </h3>
                        <Button style={{height: '40px', width: '160px'}} color='primary' onClick={toggleModal}> ساخت گروه جدید </Button>
                      </div>
                      <ModalGroup refetch={refetchGroup} isOpen={isModalOpen} toggleModal={toggleModal} CourseId={id} />
                      {Group?.length > 0 ? <Table hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>نام گروه</th>
                          <th>نام مدرس</th>
                          <th>طرفیت گروه</th>
                          <th>نام دوره</th>
                          <th>  </th>
                        </tr>
                      </thead>
                      {isLoadingGroup ? <div className='d-flex justify-content-center py-5'> <Spinner /> </div> : <tbody>
                        {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course, index) => (
                          <tr key={course.groupId}>
                            <td style={{height: '70px'}}> {(currentPage - 1) * itemsPerPage + index + 1} </td>
                            <td style={{ fontWeight: 'bold' }}>{course.groupName}</td>
                            <td>{(course.teacherName).replace('-', ' ')}</td>
                            <td>{course.groupCapacity}</td>
                            <td>{course.courseName}</td>
                            <td>
                            <UncontrolledDropdown className='position-static'>
                              <DropdownToggle tag='div' className='btn btn-sm'>
                                <MoreVertical size={14} className='cursor-pointer' />
                              </DropdownToggle>
                              <DropdownMenu>
                              <DropdownItem
                                tag='a'
                                className='w-100'
                                onClick={async (e) => {
                                  e.preventDefault()
                                  const formData = new FormData()
                                  formData.append('Id', course.groupId)
                                  const response = await DeleteGroup(formData)
                                  if(!response){
                                    toast.error( "این گروه به علت استفاده در اجزای دوره قابل حذف نمی باشد.")
                                  }
                                  else if(response.success === true){
                                    toast.success(' حذف انجام شد ')
                                    refetchGroup()
                                  }
                                  else{
                                    toast.error("این گروه به علت استفاده در اجزای دوره قابل حذف نمی باشد.")
                                  }
                                }}
                              >
                                <Trash2 size={14} className='me-50 text-danger' />
                                <span className='align-middle text-danger'> حذف </span>
                              </DropdownItem>
                              <DropdownItem
                                tag='a'
                                className='w-100'
                                onClick={() => toggleModal2(course.groupId)}
                              >
                                <Edit size={14} className='me-50' />
                                <span className='align-middle'> ویرایش </span>
                                <EditModalGroup refetch={refetchGroup} isOpen={editingGroupId === course.groupId} toggleModal={() => toggleModal2(course.groupId)} CourseId={id}
                                GroupId={course.groupId} GroupName={course.groupName} GroupCapacity={course.groupCapacity} />
                              </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>}
                      </Table> : <div style={{height: '20px'}}> گروهی موجود نیست <Badge color='danger'> <X /> </Badge> </div>}
                      <Pagination>
                        {[...Array(totalPages)].map((_, index) => (
                          <PaginationItem key={index + 1} active={index + 1 === currentPage}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)}>
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                      </Pagination>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <BlogSidebar Course={Course} refetch={refetch} />
      </div> }
    </Fragment>
  )
}

export default BlogDetails
