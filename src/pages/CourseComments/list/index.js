// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Spinner } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetCourseComments } from '../../../core/Services/api/Comments/GetCourseComments'

const UsersList = () => {
  
  const {data: courseComments, isLoading} = useQuery({queryKey: ['GetCourseComments'], queryFn: GetCourseComments})

  return (
    <>
     {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> :<div className='app-user-list'>
      {/* <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='تعداد کابران'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{userList?.totalCount}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='پرداخت شده ها'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>267</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='کاربران فعال'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>192</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='کاربران مسدود شده'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>0</h3>}
          />
        </Col>
      </Row> */}
      <Table data={courseComments} />
    </div> }
    </>
  )
}

export default UsersList
