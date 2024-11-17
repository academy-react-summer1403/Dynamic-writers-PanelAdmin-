// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import GetNewsById from '../../../core/Services/api/New/GetNewsById'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import jMoment from 'moment-jalaali'
import { MessageSquare,Star,Eye,ThumbsUp,ThumbsDown, ChevronDown } from 'react-feather'
import {
  Bookmark,
  Trash,
  Edit2
} from 'react-feather'
import { kFormatter } from '@utils'
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Badge,
  CardBody,
  CardTitle,
  Spinner,
  Alert,
  DropdownToggle,
  UncontrolledDropdown,
  Input
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import ActiveNews from '../../../core/Services/api/New/ActiveNews'
import toast from 'react-hot-toast'
import CommentsNew from './Comments'
import NewsFile from './NewsFile'

const BlogDetails = () => {
  // ** States
  const navigate=useNavigate()
  const [data, setData] = useState(null)
  const {id} = useParams()
  const [userData, setUserData] = useState(null)

  const { data: APIdata ,isLoading, refetch} = useQuery({queryKey: ['dataFromAPIDEtail'], queryFn:async()=> await GetNewsById(id)});

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

  const handleDelete = async (id) => {
    const response = await ActiveNews(id, false)
    if(response.success == true){
      toast.success(response.message)
      navigate('/News/List')
    }
    else{
      toast.error(' عملیات ناموق بود ')
    }
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
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <Row>
                <Col sm='12'>
                  <Card className='mb-3'>
                  <img src={data.currentImageAddress} className='img-fluid bg-secondary' style={{width: '100%', height: '560px'}} top />
                    <CardBody>
                      <CardTitle tag='h4'>{data.title}</CardTitle>
                      <div className='d-flex'>
                        <Avatar className={`me-50 ${userData.addUserProfileImage ? "" : "bg-secondary"}`} img={userData.addUserProfileImage} imgHeight='24' imgWidth='24' />
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
                      <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                          <h4 className='p-0'>بروز شده در</h4>
                          <p className='px-1'>{(jMoment(data.updateDate).locale('fa').format('jYYYY jMMMM jD'))}   </p>
                        </div>
                      </div>
                      <hr className='my-2' />
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex align-items-center me-1'>
                            <div>
                              <MessageSquare size={21} className='text-body align-middle' style={{marginLeft:"5px"}} />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{kFormatter(data.commentsCount)}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente  me-1'>
                            <div>
                              <Bookmark size={21} className='text-body align-middle' style={{marginLeft:"5px"}} />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{data.inUsersFavoriteCount}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <Eye size={21} className='text-body align-middle' style={{marginLeft:"5px"}} />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{data.currentView}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <Star size={21} className='text-body align-middle' style={{marginLeft:"5px"}} />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{data.currentRate}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <ThumbsUp size={21} className='text-body align-middle' style={{marginLeft:"5px"}} />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{data.currentLikeCount}</div>
                            </div>
                          </div>
                          <div className='d-flex align-items-cente me-1'>
                            <div>
                              <ThumbsDown size={21} className='text-body align-middle' style={{marginLeft:"5px"}} />
                            </div>
                            <div>
                              <div className='text-body align-middle' style={{marginLeft:"3px"}}>{data.currentDissLikeCount}</div>
                            </div>
                          </div>
                        </div>
                        
                        <UncontrolledDropdown className='dropdown-icon-wrapper'>
                        <DropdownToggle tag='span'>
                            <Edit2 size={21} color='blue' className='text-body cursor-pointer me-2' onClick={() => navigate(`/News/Edit/${data.id}`)}/>
                          </DropdownToggle>
                          <DropdownToggle tag='span'>
                            <Trash size={21} color='red' className='text-body cursor-pointer' onClick={()=> handleDelete(data.id)}/>
                          </DropdownToggle>
                        </UncontrolledDropdown>
                      </div>
                      <hr className='my-2' />
                      <Card><CardTitle> نظرات </CardTitle></Card>
                      <CommentsNew id={id} />
                      <hr className='my-2' />
                      <NewsFile id={id} refetchB={refetch} />
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
