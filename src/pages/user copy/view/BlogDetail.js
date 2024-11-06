// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare
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
  Spinner
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import { ActiveCourse } from '../../../core/Services/api/Course/ActiveCourse'
import { useQuery } from '@tanstack/react-query'
import { GetDetailCourse } from '../../../core/Services/api/Course/GetDetailCourse'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const BlogDetails = () => {
  // ** States
  const {id} = useParams()

  const {data: Course, refetch, isLoading} = useQuery({queryKey: ['GetDetailCourse', id], queryFn: () => GetDetailCourse(id)})

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
            color={badgeColorsArr[tag == "ّفرانت اند" ? 'Fashion' : 'Food']}
            pill
          >
            {tag}
          </Badge>
        </a>
      )
    })
  }

  // const renderComments = () => {
  //   return Course.comments.map(comment => {
  //     return (
  //       <Card className='mb-3' key={comment.userFullName}>
  //         <CardBody>
  //           <div className='d-flex'>
  //             <div>
  //               <Avatar className='me-75' img={comment.avatar} imgHeight='38' imgWidth='38' />
  //             </div>
  //             <div>
  //               <h6 className='fw-bolder mb-25'>{comment.userFullName}</h6>
  //               <CardText>{comment.commentedAt}</CardText>
  //               <CardText>{comment.commentText}</CardText>
  //               <a href='/' onClick={e => e.preventDefault()}>
  //                 <div className='d-inline-flex align-items-center'>
  //                   <CornerUpLeft size={18} className='me-50' />
  //                   <span>Reply</span>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </CardBody>
  //       </Card>
  //     )
  //   })
  // }

  return (
    <Fragment>
       {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {Course !== null ? (
              <Row>
                <Col sm='12'>
                  <Card className='mb-3'>
                    <CardImg src={Course?.imageAddress} className='img-fluid' top />
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
                      <div className='my-1 py-25'>{renderTags()}</div>
                      <div className='d-flex'>
                        <div>
                          <Avatar style={{overflow: 'hidden'}} content={Course?.title || 'دوره'} img={Course?.imageAddress} className='me-2' imgHeight='60' imgWidth='60' />
                        </div>
                        <div>
                          <h6 className='fw-bolder'>{Course?.title}</h6>
                          <CardText className='mb-0'>
                            {Course?.describe}
                          </CardText>
                        </div>
                      </div>
                      <hr className='my-2' />
                      <div className='d-flex' style={{justifyContent: 'space-between'}}>
                        <div className='d-flex' style={{gap: '30px'}}>
                          <div className='info-container'>
                            {Course !== null ? (
                              <ul className='list-unstyled'>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'>پرداخت های تکمیل نشده :</span>
                                  <span>{Course?.paymentNotDoneTotal} کاربر </span>
                                </li>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'> گروه ها :</span>
                                  <span>{Course?.courseGroupTotal} گروه </span>
                                </li>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'>رزرو ها :</span>
                                  <span>{Course?.reserveUserTotal } کاربر </span>
                                </li>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'>دانشجو ها :</span>
                                  <span>{Course?.courseUserTotal} دانشجو </span>
                                </li>
                                
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'> پسندیده شده :</span>
                                  <span>{Course?.courseLikeTotal} کاربر </span>
                                </li>
                                
                              </ul>
                            ) : null}
                          </div>
                          <hr className='my-2' />
                          <div className='info-container'>
                            {Course !== null ? (
                              <ul className='list-unstyled'>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'> وضعیت :</span>
                                  <Badge color={Course?.isActive ? 'light-success' : 'light-danger'} >{Course?.isActive ? 'فعال' : 'غیر فعال'} </Badge>
                                </li>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'> نوع دوره :</span>
                                  <span>{Course?.courseTypeName} </span>
                                </li>
                                <li className='mb-75'>
                                  <span className='fw-bolder me-25'> سطح :</span>
                                  <span>{Course?.courseLevelName } </span>
                                </li>
                                
                              </ul>
                            ) : null}
                          </div>
                        </div>
                        <Button onClick={async () => {
                          const data = {
                            active: (Course?.isActive ? false : true),
                            id: Course?.courseId,
                          }
                          const response = await ActiveCourse(data)
                          if(response.success == true){
                            toast.success(response.message)
                            refetch()
                          }

                        }} style={{height: '40px', width: '100px'}} color={Course?.isActive === false ? 'primary' : 'danger'}> {Course?.isActive === false ? 'فعال' : 'غیر فعال'} </Button>
                      </div>
                      {/* <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex align-items-center me-1'>
                            <a className='me-50' href='/' onClick={e => e.preventDefault()}>
                              <MessageSquare size={21} className='text-body align-middle' />
                            </a>
                            <a href='/' onClick={e => e.preventDefault()}>
                              <div className='text-body align-middle'>{kFormatter(Course.blog.comments)}</div>
                            </a>
                          </div>
                          <div className='d-flex align-items-cente'>
                            <a className='me-50' href='/' onClick={e => e.preventDefault()}>
                              <Bookmark size={21} className='text-body align-middle' />
                            </a>
                            <a href='/' onClick={e => e.preventDefault()}>
                              <div className='text-body align-middle'>{Course.blog.bookmarked}</div>
                            </a>
                          </div>
                        </div>
                        <UncontrolledDropdown className='dropdown-icon-wrapper'>
                          <DropdownToggle tag='span'>
                            <Share2 size={21} className='text-body cursor-pointer' />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem className='py-50 px-1'>
                              <GitHub size={18} />
                            </DropdownItem>
                            <DropdownItem className='py-50 px-1'>
                              <Gitlab size={18} />
                            </DropdownItem>
                            <DropdownItem className='py-50 px-1'>
                              <Facebook size={18} />
                            </DropdownItem>
                            <DropdownItem className='py-50 px-1'>
                              <Twitter size={18} />
                            </DropdownItem>
                            <DropdownItem className='py-50 px-1'>
                              <Linkedin size={18} />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
      </div> }
    </Fragment>
  )
}

export default BlogDetails
