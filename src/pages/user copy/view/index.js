// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
// import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import Tabs from './Tabs'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailCourse } from '../../../core/Services/api/Course/GetDetailCourse'
import BlogDetails from './BlogDetail'

const UserView = () => {
  // ** Hooks
  const { id } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const {data: Course} = useQuery({queryKey: ['GetDetailCourse'], queryFn: () => GetDetailCourse(id)})

  return Course?.courseId !== null && Course?.courseId !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='12' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <BlogDetails Course={Course} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'> دوره پیدا نشد </h4>
      <div className='alert-body'>
       دوره با شناسه: {id} پیدا نشد لطفا دوره مورد نظر را انتخاب کنید: <Link to='/courses/list'> لیست دوره ها </Link>
      </div>
    </Alert>
  )
}
export default UserView
