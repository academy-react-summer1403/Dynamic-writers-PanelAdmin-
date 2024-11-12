// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import jMoment from 'moment-jalaali'
import ReactPaginate from 'react-paginate'

import { MessageSquare,Star,Eye,ThumbsUp,ThumbsDown } from 'react-feather'
import { Pagination } from '@nextui-org/react'
import { useQuery } from 'react-query'
import { selectThemeColors } from '@utils'

import Select from 'react-select'

// ** Custom Components
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import ActiveNews from './ActiveNews'
import Breadcrumbs from '@components/breadcrumbs'
import GetCategoriesForNews from '../../../core/Services/api/New/GetCategoriesForNews'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  CardHeader,
  Label,
  Input,
  Spinner,
  Alert,
  PaginationLink,
  Button
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import { GetNewsList } from './../../../core/Services/api/New/GetNewsList';

const BlogList = () => {
  // ** States
  const [IsActiveNew, setIsActiveNew] = useState({value:true,label:"فعال"})
  const [data, setData] = useState(null)
  const [RowsOfPage, setRowsOfPage] = useState(6)
  const [PageNumber, setPageNumber] = useState(1)
  const [SortType, setSortType] = useState({ value: 'DESC', label: 'نزولی' })
  const [totalNews, settotalNews] = useState(5)
  const [querySearch, setQuerySearch] = useState('');
  const [isFlag, setisFlag] = useState(false)
  const [idItemClick, setidItemClick] = useState(null)


  const { data: APIdata ,isLoading,refetch} = useQuery({queryKey: ['dataFromAPIList'], queryFn:async()=> await GetNewsList(SortType.value,RowsOfPage,PageNumber,IsActiveNew.value,querySearch)});

  useEffect(() => {
    if(!isLoading)
        getDetail()

  }, [APIdata])

  useEffect(()=>{
    
    refetch()
  },[IsActiveNew,SortType,querySearch,PageNumber,RowsOfPage])
  
  const getDetail=async()=>{
    settotalNews(Number(APIdata.totalCount/RowsOfPage))
    setData(APIdata.news)
  }
  var badgeColorsArr = {
    false: 'light-danger',
    true: 'light-success'
  }
  const ActiveOptions = [
    { value: 'true', label: 'فعال' },
    { value: 'false', label: 'غیر فعال' },
  ]
  const SortOptions = [
    { value: 'ASC', label: 'صعودی' },
    { value: 'DESC', label: 'نزولی' },
  ]

  const renderRenderList = () => {
    return data.map(item => {
      const renderTags = () => {
        return <Fragment><span>
                    <Badge
                        
                        color={'light-info'}
                        pill
                    >
                        {item.newsCatregoryName}
                    </Badge>
                </span>
                <span className='ms-1'>
                    <Badge
                        
                        color={badgeColorsArr[item.isActive]}
                        pill
                    >
                        {item.isActive? "فعال":"غیر فعال"}
                    </Badge>
                </span></Fragment>
      }
      
      return (
        <Fragment>
        <Col key={item.id} md='6'>
          <Card style={{height:"475px"}}>
            <div>
              <CardImg className={`img-fluid ${item.currentImageAddressTumb!=null ? "" : " bg-warning w-100 d-block"}`} style={{height: '220px'}} src={item.currentImageAddressTumb} top />
            </div>
            <CardBody>
              <CardTitle tag='h4'>
              {item.isActive==true && <Link className='blog-title-truncate text-body-heading' to={`/News/view/${item.id}`}>
                  {item.title}
                </Link>}
              {
                item.isActive==false && <div className='blog-title-truncate text-body-heading'>
                {item.title}
                </div>
              }
              </CardTitle>
              <div className='d-flex'>
                <Avatar className={`me-50 overflow-hidden ${item.addUserProfileImage ? "" : "bg-warning"}`} style={{cursor:"default"}} img={item.addUserProfileImage} imgHeight='24' imgWidth='24' />
                <div>
                  <small className='text-muted me-25'>توسط </small>
                  <small>
                    <span>
                      {item.addUserFullName}
                    </span>
                  </small>
                  <span className='text-muted ms-50 me-25'>|</span>
                  <small className='text-muted'>{(jMoment(item.insertDate).locale('fa').format('jYYYY jMMMM jD'))}</small>
                </div>
              </div>
              <div className='my-1 py-25 '>{renderTags()}</div>
              <CardText className='blog-content-truncate' style={{minHeight:"42px"}}>{item.miniDescribe}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <ThumbsUp size={15} className='text-body me-50' />
                  <span className='text-body fw-bold'>{item.currentLikeCount} پسندیدن </span>
                </div>
                <div>
                  <ThumbsDown size={15} className='text-body me-50' />
                  <span className='text-body fw-bold'>{item.currentDissLikeCount} نپسندیدن</span>
                </div>
                {
                  item.isActive==false && <span className='fw-bold text-success' style={{cursor:"pointer"}} onClick={()=>{setisFlag(true);setidItemClick(item.id)}}>فعال کردن خبر</span>
                }
                {item.isActive==true && <Link className='fw-bold' to={`/News/view/${item.id}`}>
                  مطالعه بیشتر
                </Link>}
                
              </div>
            </CardBody>
          </Card>
        </Col>
        </Fragment>
      )
    })
  }
  const notFoundResult=()=>{
   return <div color='w-100 d-flex justify-content-center'>
        <h4 className='alert-heading text-center text-danger'>!!!! خبر یا مقاله پیدا نشد </h4>
      </div>
  }
  if (APIdata==null) {
    return <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}><Spinner color="primary" style={{ width: '5rem', height: '5rem' }}/></div>
  }
  return (
    <Fragment>
      {isFlag && <ActiveNews showValue={isFlag} id={idItemClick} setFlag={setisFlag}/>}
      <Breadcrumbs title='لیست اخبار و مقالات' data={[{ title: 'اخبار و مقالات' }, { title: 'لیست اخبار و مقالات' }]} />
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row >
            <Col md='4'>
              <Label for='role-select'>وضعیت</Label>
              <Select
                isClearable={false}
                value={IsActiveNew}
                options={ActiveOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setIsActiveNew(data)
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>مرتب سازی</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={SortOptions}
                value={SortType}
                onChange={data => {
                  setSortType(data)
                }}
              />
            </Col>
            <Col md='4' className='d-flex align-items-end'>
              <div className='d-flex align-items-center w-100'>
                <label htmlFor='rows-per-page'>نمایش</label>
                <Input
                  className='mx-50'
                  type='select'
                  id='rows-per-page'
                  value={RowsOfPage}
                  onChange={(val) => setRowsOfPage(val.target.value)}
                  style={{ width: '5rem' }}
                >
                  <option value='6'>6</option>
                  <option value='8'>8</option>
                  <option value='12'>12</option>
                </Input>
                <label htmlFor='rows-per-page'>عدد</label>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>
                  {data.length!=0 ? renderRenderList() : notFoundResult()}</Row>
                <Row>
                  <Col sm='12'>
                  {data.length!=0 && 
                    <ReactPaginate
                        previousLabel={''}
                        nextLabel={''}
                        pageCount={totalNews || 1}
                        activeClassName='active'
                        forcePage={PageNumber !== 0 ? PageNumber - 1 : 0}
                        onPageChange={page => setPageNumber(page.selected + 1)}
                        pageClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        nextClassName={'page-item next'}
                        previousClassName={'page-item prev'}
                        previousLinkClassName={'page-link'}
                        pageLinkClassName={'page-link'}
                        containerClassName={'pagination react-paginate justify-content-center my-2 pe-1'}
                    />}
                  </Col>
                </Row>
              </div>
            ) : null}
          </div>
        </div>
        <Sidebar setQuerySearch={setQuerySearch}/>
      </div>
    </Fragment>
  )
}

export default BlogList
