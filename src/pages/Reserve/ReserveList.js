import React, { useState } from 'react';
import { Table, Input, Pagination, PaginationItem, PaginationLink, Button, Badge, Label, Spinner } from 'reactstrap';
import { Check, Search, Trash2 } from 'react-feather';
import { useQuery } from '@tanstack/react-query';
import { GetReserves } from '../../core/Services/api/Course/GetReserves';
import jMoment from 'jalali-moment';
import { DeleteReserve } from '../../core/Services/api/Course/DeleteReserve';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AcceptReserve } from '../../core/Services/api/Course/AcceptReserve';

const CourseTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, error, isLoading, refetch, isFetching } = useQuery({ queryKey: ['GetReserves'], queryFn: GetReserves });

  const filteredCourses = data
    ? data.filter(course => {
        const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              course.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || 
                              (statusFilter === 'accepted' && course.accept) || 
                              (statusFilter === 'pending' && !course.accept);

        return matchesSearch && matchesStatus;
      })
    : [];

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const DeleteRes = async (id) => {
    const response = await DeleteReserve(id);
    if (!response) {
      toast.error(' عملیات ناموفق بود ');
    } else if (response.success === true) {
      toast.success(response.message);
      refetch();
    }
  };

  const AcceptRes = async (courseId, studentId) => {
    const response = await AcceptReserve(courseId, studentId)
    console.log(courseId)
    if(!response){
      toast.error(' عملیات موفقیت آمیز نبود ')
    }
    else if(response.success === true){
      toast.success(response.message)
    }
    else{
      toast.error(' اطلاعات صحیح نمی باشد ')
    }
  }

  if (isLoading) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
    <div>
      <div className="mb-3 d-flex align-items-center iranSans" style={{gap: '20px'}}>
        <div>
          <Label for='search'>جستجو :</Label>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام دوره یا دانشجو..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '260px', marginRight: '10px' }}
          />
        </div>
        <div>
        <Label for='statusFilter'>وضعیت:</Label>
          <Input
            id='statusFilter'
            type="select"
            className='iranSans'
            value={statusFilter}
            onChange={handleStatusFilterChange}
            style={{ width: '150px', marginRight: '10px' }}
          >
            <option value="all" className='iranSans'> همه </option>
            <option value="accepted" className='iranSans'>قبول شده</option>
            <option value="pending" className='iranSans'>در حال انتظار</option>
          </Input>
        </div>  
      </div>
      
      {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>نام دوره</th>
            <th>نام دانشجو</th>
            <th>تاریخ رزرو</th>
            <th>وضعیت</th>
            <th>  </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course, index) => (
            <tr key={course.reserveId}>
              <td style={{height: '30px'}}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td onClick={() => navigate('/courses/view/' + course.courseId)} style={{ fontWeight: 'bold' }}>{course.courseName}</td>
              <td>{course.studentName}</td>
              <td>{jMoment(course.reserverDate).locale('fa').format('jD jMMMM jYYYY')}</td>
              <td> 
                <Badge onClick={() => {
                  course.accept === false && AcceptRes(course.courseId, course.studentId)
                }} color={course.accept ? 'light-success' : 'light-danger'}> 
                  {course.accept ? 'قبول شده' : 'در حال انتظار'} 
                </Badge> 
              </td>
              <td>
                {course.accept ? <Button color='success'> <Check size={16} /> </Button> : 
                <Button color='danger' onClick={() => DeleteRes(course.reserveId)}>
                  <Trash2 size={16} />
                </Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      }
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};

export default CourseTable;