// ** React Imports
import { Fragment } from 'react'

import classnames from 'classnames'

import jMoment from 'jalali-moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Badge,
  CardBody,
  CardText,
  CardTitle,
  Spinner,
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import { useQuery } from '@tanstack/react-query'
import { GetDetailCourse } from '../../../core/Services/api/Course/GetDetailCourse'
import { useParams } from 'react-router-dom'
import BlogSidebar from './BlogSidebar'
import { setItem } from '../../../core/Services/common/storage'
import Tabs from './Tabs'

const BlogDetails = () => {
  const {id} = useParams()

  const {data: Course, refetch, isLoading} = useQuery({queryKey: ['GetDetailCourse', id], queryFn: () => GetDetailCourse(id)})
  setItem('ImageCourse', Course?.imageAddress)

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
       {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='blog-wrapper' style={{height: 'fit'}}>
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
                      <hr className='my-2'></hr>
                      <Tabs id={id} Course={Course} />
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
