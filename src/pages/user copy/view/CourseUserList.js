import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { GetCourseUserList } from '../../../core/Services/api/Course/GetCourseUserList'
import { X } from 'react-feather'
import { Table, Badge, Pagination, PaginationItem, PaginationLink, Spinner, CardTitle } from 'reactstrap'

const CourseUserList = ({ id }) => {

  const {data: Users, isLoading, isFetching, refetch} = useQuery({queryKey: ['GetCourseUserList'], queryFn: () => GetCourseUserList(id)})
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Users?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if(isLoading || isFetching) return <div className='d-flex justify-content-center'> <Spinner /> </div>

  return (
    <Fragment>
        <CardTitle> کاربران </CardTitle>
        {Users?.length > 0 ? <Table hover responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>نام کاربر</th>
            <th> شناسه کاربر </th>
            <th> وضعیت پرداختی </th>
        </tr>
        </thead>
        {isLoading || isFetching ? <div className='d-flex justify-content-center py-5'> <Spinner /> </div> : <tbody>
        {Users.map((course, index) => (
            <tr key={index}>
            <td style={{height: '70px'}}> {(currentPage - 1) * itemsPerPage + index + 1} </td>
            <td style={{ fontWeight: 'bold' }}>{course.studentName}</td>
            <td>{course.studentId}</td>
            <td>{course.peymentDone ? <Badge color='light-success'> پرداخت شده </Badge> : <Badge color='light-danger'> پرداخت نشده </Badge>}</td>
            </tr>
        ))}
        </tbody>}
        </Table> : <div style={{height: '20px'}}> کاربری موجود نیست <Badge color='danger'> <X /> </Badge> </div>}
        <Pagination>
        {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
            </PaginationLink>
            </PaginationItem>
        ))}
        </Pagination>
    </Fragment>
  )
}

export default CourseUserList
