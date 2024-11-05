// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** store? & Actions
import { getUser } from '../store?'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
// import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import Tabs from './Tabs'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'

const UserView = () => {
  // ** Hooks
  const { id } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const {data: user} = useQuery({queryKey: ['GetDetailUser'], queryFn: () => GetDetailUser(id)})

  return user?.id !== null && user?.id !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={user} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tabs user={user}  active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'> کاربر پیدا نشد </h4>
      <div className='alert-body'>
       کاربر با شناسه: {id} پیدا نشد لطفا کاربر مورد نظر را انتخاب کنید: <Link to='/user/list'> لیست کاربران </Link>
      </div>
    </Alert>
  )
}
export default UserView
