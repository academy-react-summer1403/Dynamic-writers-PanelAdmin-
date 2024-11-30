import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Alert, Spinner } from 'reactstrap'
import UserInfoCard from './UserInfoCard'
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailAssistants } from '../../core/Services/api/Assistants/GetDetailAssistant'
import UserProjectsList from './UserProjectsList'

const AssistantView = () => {
  const { id } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const {data: assistant, refetch, isLoading} = useQuery({queryKey: ['GetDetailAssistant', id], queryFn: () => GetDetailAssistants(id)})

  return (
    <>
    { isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : assistant?.courseAssistanceDto.id !== null && assistant?.courseAssistanceDto.id !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='5' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={assistant} refetch={refetch} isLoading={isLoading} />
        </Col>
        <Col xl='7' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserProjectsList user={assistant} />
       </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'> دستیار پیدا نشد </h4>
      <div className='alert-body'>
       دستیار با شناسه: {id} پیدا نشد لطفا دستیار مورد نظر را انتخاب کنید: <Link to='/assistants/list'> لیست دستیاران دوره </Link>
      </div>
    </Alert>
  )}
  </>
  )
}

export default AssistantView
