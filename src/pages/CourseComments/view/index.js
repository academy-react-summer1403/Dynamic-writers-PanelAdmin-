// ** React Imports
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Alert, Spinner } from 'reactstrap'

import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import TableHover from './TableHover'

const UserView = () => {
  // ** Hooks
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
        <Col lg='12' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <TableHover selectedUser={user} isLoading={isLoading} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'> نظر انتخاب شده پیدا نشد </h4>
      <div className='alert-body'>
       نظر با شناسه: {id} پیدا نشد لطفا نظر مورد نظر را انتخاب کنید: <Link to='/CourseComment'> لیست نظرات </Link>
      </div>
    </Alert>
  )}
  </>
  )
}
export default UserView
