import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Alert, Spinner } from 'reactstrap'
import UserInfoCard from './UserInfoCard'
import Tabs from './Tabs'
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'

const UserView = () => {
  const { id } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const {data: user, refetch, isLoading} = useQuery({queryKey: ['GetDetailUser'], queryFn: () => GetDetailUser(id)})

  return (
    <>
    { isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : user?.id !== null && user?.id !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='5' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={user} isLoading={isLoading} />
        </Col>
        <Col xl='7' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tabs user={user}  active={active} refetch={refetch} isLoading={isLoading} toggleTab={toggleTab} />
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
  )}
  </>
  )
}
export default UserView
