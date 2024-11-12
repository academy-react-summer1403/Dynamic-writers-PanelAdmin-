// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import GetNewsById from '../../../core/Services/api/New/GetNewsById'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import jMoment from 'moment-jalaali'
import { MessageSquare,Star,Eye,ThumbsUp,ThumbsDown } from 'react-feather'
import DeleteNews from './DeleteNews'
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
  Trash,
  Edit2
} from 'react-feather'

// ** Utils
import { kFormatter } from '@utils'

// ** Custom Components
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

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
  Spinner,
  Alert,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg'

const BlogDetails = () => {
  // ** States
  const navigate=useNavigate()
  const [data, setData] = useState(null)
  const {id}=useParams()
  const [userData, setUserData] = useState(null)
  const [isFlag, setisFlage] = useState(false)

  const { data: APIdata ,isLoading} = useQuery({queryKey: ['dataFromAPIDEtail'], queryFn:async()=> await GetNewsById(id)});

  useEffect(() => {
    getDetail()
  }, [APIdata])

  const getDetail=async()=>{
    if(!isLoading){
        let dataUser = await GetDetailUser(APIdata.detailsNewsDto.userId);
        setUserData(dataUser)
        setData(APIdata.detailsNewsDto)
    }
  }
  var badgeColorsArr = {
    false: 'light-danger',
    true: 'light-success',
    all:'light-info'
  }

  const renderTags = () => {
    return <Fragment><a href='/' onClick={e => e.preventDefault()}>
            <Badge
                
                color={badgeColorsArr['all']}
                pill
            >
                {data.newsCatregoryName}
            </Badge>
        </a>
        <a href='/' className='mx-1' onClick={e => e.preventDefault()}>
            <Badge
                
                color={badgeColorsArr[data.active]}
                pill
            >
                {data.active? "فعال":"غیر فعال"}
            </Badge>
        </a></Fragment>
  }

  if(id==1){
    return <Alert color='danger'>
      <h4 className='alert-heading'> خبر یا مقاله پیدا نشد </h4>
      <div className='alert-body'>
        خبر یا مقاله مورد نظر یافت نشد ، خبر یا مقاله مورد نظر را از <Link to='/News/list'>  لیست اخبار و مقالات </Link> انتخاب کنید

      </div>
    </Alert>
  }else
  if (userData==null) {
    return <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}><Spinner color="primary" style={{ width: '5rem', height: '5rem' }}/></div>
  } 
  return (
    <Fragment>
        {isFlag && <DeleteNews showValue={isFlag}/>}
      <Breadcrumbs title='نمایش خبر یا مقاله' data={[{ title: 'اخبار و مقالات' }, { title: 'نمایش خبر یا مقاله' }]} />
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <Row>
                <Col sm='12'>
                  <Card className='mb-3'>
                    <CardImg src={data.currentImageAddress} className={`img-fluid ${data.currentImageAddress?  "" : "bg-warning w-100 d-block"}`} style={{height: '310px'}} top />
                    <CardBody>
                      <CardTitle tag='h4'>{data.title}</CardTitle>
                      <div className='d-flex'>
                        <Avatar className={`me-50 ${userData.addUserProfileImage ? "" : "bg-warning"}`} img={userData.addUserProfileImage} imgHeight='24' imgWidth='24' />
                        <div>
                          <small className='text-muted me-25'> توسط </small>
                          <small>
                            <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                              {data.addUserFullName}
                            </a>
                          </small>
                          <span className='text-muted ms-50 me-25'>|</span>
                          <small className='text-muted'>{(jMoment(data.insertDate).locale('fa').format('jYYYY jMMMM jD'))}</small>
                        </div>
                      </div>
                      <div className='my-1 py-25'>{renderTags()}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.describe
                        }}
                      ></div>
                      <div>
                        <h4 className='mt-2'>توضیحات کوتاه</h4>
                        <p>{data.miniDescribe}</p>
                      </div>
                      <div>
                        <h4 className='mt-2'>عنوان در گوگل</h4>
                        <p>{data.googleTitle}</p>
                      </div>
                      <div>
                        <h4 className='mt-2'>توضیحات در گوگل</h4>
                        <p>{data.googleDescribe}</p>
                      </div>
                      <div className='d-flex'>
                        <h4 className='p-0'>بروز شده در</h4>
                        <p className='px-1'>{(jMoment(data.updateDate).locale('fa').format('jYYYY jMMMM jD'))}   </p>
                      </div>
                      <hr className='my-2' />
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex align-items-center me-1'>
                            <div>
                              <MessageSquare size={21} className='text-body align-middle' />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{kFormatter(data.commentsCount)}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente  me-1'>
                            <div>
                              <Bookmark size={21} className='text-body align-middle' />
                            </div>
                            <div>
                              <div className='text-body align-middle'style={{marginLeft:"3px"}}>{data.inUsersFavoriteCount}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <Eye size={21} className='text-body align-middle' />
                            </div>
                            <div>
                              <div className='text-body align-middle'style={{marginLeft:"3px"}}>{data.currentView}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <Star size={21} className='text-body align-middle' />
                            </div>
                            <div>
                              <div className='text-body align-middle'style={{marginLeft:"3px"}}>{data.currentRate}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <ThumbsUp size={21} className='text-body align-middle' />
                            </div>
                            <div>
                              <div className='text-body align-middle'style={{marginLeft:"3px"}}>{data.currentLikeCount}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <ThumbsDown size={21} className='text-body align-middle' />
                            </div>
                            <div>
                              <div className='text-body align-middle'style={{marginLeft:"3px"}}>{data.currentDissLikeCount}</div>
                            </div>
                          </div>
                        </div>
                        
                        <UncontrolledDropdown className='dropdown-icon-wrapper'>
                        <DropdownToggle tag='span'>
                            <Edit2 size={21} color='blue' className='text-body cursor-pointer me-2' onClick={()=>navigate('/News/Edit/'+data)}/>
                          </DropdownToggle>
                          <DropdownToggle tag='span'>
                            <Trash size={21} color='red' className='text-body cursor-pointer' onClick={()=>setisFlage(true)}/>
                          </DropdownToggle>
                        </UncontrolledDropdown>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  )
}

export default BlogDetails