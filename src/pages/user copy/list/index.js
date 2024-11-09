// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Spinner } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, Clipboard, X } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetUserList } from '../../../core/Services/api/User/GetUserList'
import { useEffect, useState } from 'react'
import { GetCourseTotal } from '../../../core/Services/api/Course/GetCourseTotal'
import { GetTotalActiveCourse } from '../../../core/Services/api/Course/ActiveCoursesTotal'

const UsersList = () => {
  
  const {data: CourseList, isLoading} = useQuery({queryKey: ['GetCourseTotal'], queryFn: GetCourseTotal})
  const {data: Actives, isLoading: loadingActive} = useQuery({queryKey: ['GetActiveTotal'], queryFn: GetTotalActiveCourse})

  return (
    <>
    {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='app-user-list'>
      <Row>
        <Col lg='4' sm='2'>
          <StatsHorizontal
            color='info'
            statTitle='تعداد دوره ها'
            icon={<Clipboard size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{CourseList?.totalCount}</h3>}
          />
        </Col>
        <Col lg='4' sm='2'>
          <StatsHorizontal
            color='danger'
            statTitle='دوره های غیر فعال شده'
            icon={<X size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{CourseList?.totalCount - Actives?.totalCount || ''}</h3>}
          />
        </Col>
        <Col lg='4' sm='2'>
          <StatsHorizontal
            color='primary'
            statTitle='دوره های در حال اجرا '
            icon={<Clipboard size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{Actives?.totalCount}</h3>}
          />
        </Col>
      </Row>
      <Table data={CourseList} />
    </div>}
    </>
  )
}

export default UsersList
