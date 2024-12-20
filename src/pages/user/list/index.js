import Table from './Table'
import { Spinner } from 'reactstrap'
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetTotalCount } from '../../../core/Services/api/User/GetTotalCount'

const UsersList = () => {
  
  const {data: userList, isLoading} = useQuery({queryKey: ['GetUserList'], queryFn: GetTotalCount})

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
      <Table data={userList} />
    </div> }
    </>
  )
}

export default UsersList
