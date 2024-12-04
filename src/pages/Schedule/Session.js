import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Alert, Spinner } from 'reactstrap'
import UserInfoCard from './UserInfoCard'
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import UserProjectsList from './UserProjectsList'
import { GetDetailSession } from '../../core/Services/api/Session/GetDetailSession'

const Session = () => {
  const { id } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const {data: session, refetch, isLoading} = useQuery({queryKey: ['GetDetailSession', id], queryFn: () => GetDetailSession(id)})

  return (
    <>
    { isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : session?.scheduleSessionId !== null && session?.scheduleSessionId !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='5' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={session} refetch={refetch} isLoading={isLoading} />
        </Col>
        <Col xl='7' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserProjectsList data={session} refetch={refetch} />
       </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'> جلسه ای پیدا نشد </h4>
      <div className='alert-body'>
       جلسه ای با شناسه: {id} پیدا نشد لطفا جلسه مورد نظر را انتخاب کنید: <Link to='/scheduleList'> لیست زمان بندی دوره </Link>
      </div>
    </Alert>
  )}
  </>
  )
}

export default Session
