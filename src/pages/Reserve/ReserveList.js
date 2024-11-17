import React, { useState } from 'react';
import { Table, Input, Pagination, PaginationItem, PaginationLink, Button, Badge, Spinner, FormGroup, Label } from 'reactstrap';
import { Check, Trash2 } from 'react-feather';
import { useQuery } from '@tanstack/react-query';
import { GetReserves } from '../../core/Services/api/Course/GetReserves';
import jMoment from 'jalali-moment';
import { DeleteReserve } from '../../core/Services/api/Course/DeleteReserve';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AcceptReserve } from '../../core/Services/api/Course/AcceptReserve';
import AcceptReserveModal from './AcceptReserveModal';

const CourseTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['GetReserves'],
    queryFn: GetReserves
  });

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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
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
    const response = await AcceptReserve(courseId, studentId);
    if (!response) {
      toast.error(' عملیات موفقیت آمیز نبود ');
    } else if (response.success === true) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(' اطلاعات صحیح نمی باشد ');
    }
  };

  const renderPaginationItems = () => {
    const pages = [];
    const maxVisiblePages = 7;
    const delta = 2; 

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > delta + 3) {
        pages.push("...");
      }
      const startPage = Math.max(2, currentPage - delta);
      const endPage = Math.min(totalPages - 1, currentPage + delta);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - delta - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <PaginationItem key={`ellipsis-${index}`} disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => handlePageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  if (isLoading) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
    <div>
      <div className="mb-3 d-flex align-items-center iranSans gap-2">
        <Input
          id='search'
          name='search'
          type="text"
          className='iranSans'
          placeholder="جستجو بر اساس نام دوره یا دانشجو..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '260px' }}
        />
        <Input
          id='statusFilter'
          type="select"
          className='iranSans'
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{ width: '150px'}}
        >
          <option value="all" className='iranSans'> همه </option>
          <option value="accepted" className='iranSans'>قبول شده</option>
          <option value="pending" className='iranSans'>در حال انتظار</option>
        </Input>

        <Input
          id="itemsPerPageSelect"
          type="select"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          style={{ width: '100px', }}
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </Input>
      </div>

      {isLoading || isFetching ? (
        <div className='d-flex' style={{ justifyContent: 'center', margin: '50px' }}> <Spinner /> </div>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>نام دوره</th>
              <th>نام دانشجو</th>
              <th>تاریخ رزرو</th>
              <th>وضعیت</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course, index) => (
              <tr key={course.reserveId}>
                <td style={{height: '60px'}}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td onClick={() => navigate('/courses/view/' + course.courseId)} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.courseName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{course.studentName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{jMoment(course.reserverDate).locale('fa').format('jD jMMMM jYYYY')}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Badge color={course.accept ? 'light-success' : 'light-danger'}>
                    {course.accept ? 'قبول شده' : 'در حال انتظار'}
                  </Badge>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {course.accept === false && (
                    <div className='d-flex gap-2'>
                      <Button color='danger' onClick={() => DeleteRes(course.reserveId)}> <Trash2 size={16} /> </Button>
                      <Button color='success' onClick={() => {
                        setShow(true)
                        setSelectedItem(course)
                      }}> <Check size={16} /> </Button>
                      <AcceptReserveModal show={show} setShow={setShow} refetch={refetch} selectedItem={selectedItem} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination className="d-flex justify-content-center mt-3">
        {renderPaginationItems()}
      </Pagination>    </div>
  );
};

export default CourseTable;
