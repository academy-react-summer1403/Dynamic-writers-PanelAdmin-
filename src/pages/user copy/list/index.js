// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Spinner } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, Clipboard } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetUserList } from '../../../core/Services/api/User/GetUserList'
import { useEffect, useState } from 'react'
import { GetCourseTotal } from '../../../core/Services/api/Course/GetCourseTotal'

const UsersList = () => {
  
  const {data: CourseList, isLoading} = useQuery({queryKey: ['GetCourseTotal'], queryFn: GetCourseTotal})

  return (
    <>
    {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='app-user-list'>
      <Row>
        <Col lg='12' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='تعداد دوره ها'
            icon={<Clipboard size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{CourseList?.totalCount}</h3>}
          />
        </Col>
        {/* <Col lg='6' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='کاربران مسدود شده'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>0</h3>}
          />
        </Col> */}
      </Row>
      <Table data={CourseList} />
    </div> }
    </>
  )
}

export default UsersList
