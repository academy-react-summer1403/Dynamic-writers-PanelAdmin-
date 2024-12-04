import { useState } from 'react';
import { Button, Input, Pagination, PaginationItem, PaginationLink, Table, Spinner, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import { GetSchedule } from '../../core/Services/api/Schedule/GetSchedule';
import jMoment from 'jalali-moment'
import { Edit, File, MoreVertical, Plus, RefreshCcw } from 'react-feather';
import { FormingSchedule } from '../../core/Services/api/Schedule/FormingSchedule';
import toast from 'react-hot-toast';
import { lockToRaiseSchedule } from '../../core/Services/api/Schedule/LockToRaiseSchedule';
import ModalUpdate from './ModalUpdate';
import { Link } from 'react-router-dom';
import { GetDetailSession } from '../../core/Services/api/Session/GetDetailSession';
import AddModalSession from './AddModalSession';

const ScheduleList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [show2, setShow2] = useState(false)
  const [selectedItem2, setSelectedItem2] = useState(null)
  const itemsPerPage = 5;

  const handleDateChange = (e, type) => {
    if (type === 'start') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const { data: schedules, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['GetSchedule', startDate, endDate],
    queryFn: () => {
      return GetSchedule(startDate, endDate);
    },
    enabled: !!startDate && !!endDate,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((schedules ?? []).length / itemsPerPage);

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

  return (
    <>
      <div className="mb-3 d-flex align-items-center gap-3">
        <div>
          <label className='my-1'>تاریخ شروع</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, 'start')}
            placeholder="تاریخ شروع را انتخاب کنید"
            className="form-control"
            style={{width: '200px'}}
          />
        </div>
        <div>
          <label className='my-1'>تاریخ پایان</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, 'end')}
            placeholder="تاریخ پایان را انتخاب کنید"
            className="form-control"
            style={{width: '200px'}}
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th style={{whiteSpace: 'nowrap'}}>شناسه گروه</th>
              <th style={{whiteSpace: 'nowrap'}}>تاریخ شروع و پایان</th>
              <th style={{whiteSpace: 'nowrap'}}>زمان شروع</th>
              <th style={{whiteSpace: 'nowrap'}}>زمان پایان</th>
              <th style={{whiteSpace: 'nowrap'}}>شماره هفته</th>
              <th style={{whiteSpace: 'nowrap'}}> وضعیت </th>
              <th style={{whiteSpace: 'nowrap'}}> حضور و غیاب </th>
              <th style={{whiteSpace: 'nowrap'}}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {(schedules ?? []).length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  
                </td>
              </tr>
            ) : (
              (schedules ?? [])
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((schedule, index) => (
                  <tr key={index}>
                    <td style={{whiteSpace: 'nowrap'}}>{schedule.courseGroupId}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{jMoment(schedule.startDate).locale('fa').format('jD jMMMM jYYYY')}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{schedule.startTime}:00</td>
                    <td style={{whiteSpace: 'nowrap'}}>{schedule.endTime}:00</td>
                    <td style={{whiteSpace: 'nowrap'}}>{schedule.weekNumber}</td>
                    <td style={{whiteSpace: 'nowrap'}}> <Badge color={schedule.forming ? 'light-success' : 'light-danger'}> {schedule.forming ?  'تشکیل شده' : 'تشکیل نشده'} </Badge> </td>
                    <td style={{whiteSpace: 'nowrap'}}> <Badge color={schedule.lockToRaise ? 'light-success' : 'light-danger'}> {schedule.lockToRaise ? ' حضور و غیاب شده ' : ' حضور غیاب نشده '} </Badge> </td>
                    <td>
                      <UncontrolledDropdown className='position-static'>
                        <DropdownToggle tag='div' className='btn btn-sm'>
                          <MoreVertical size={14} className='cursor-pointer' />
                        </DropdownToggle>
                        <DropdownMenu positionFixed >
                          <DropdownItem
                            className='w-100 cursor-pointer'
                            tag={Link}
                            to={`/session/${schedule.id}`}
                          >
                            <File size={14} className='me-50 text-secondary' />
                            <span className='align-middle text-secondary'> مشاهده جلسه </span>
                            
                          </DropdownItem>
                          <DropdownItem
                            className='w-100 cursor-pointer'
                            onClick={() => {setShow(true), setSelectedItem(schedule)}}
                          >
                            <Edit size={14} className='me-50 text-primary' />
                            <span className='align-middle text-primary'> تغییر مشخصات </span>
                            
                          </DropdownItem>
                          <DropdownItem
                            className='w-100 cursor-pointer'
                            onClick={async () => {
                              const response = await FormingSchedule({
                                active: schedule.forming ? false : true,
                                id: schedule.id
                              })
                              if(response.success == true){
                                toast.success(response.message)
                                refetch()
                              }
                            }}
                          >
                            <RefreshCcw size={14} className='me-50 text-primary' />
                            <span className='align-middle text-primary'> تغییر وضعیت </span>
                            
                          </DropdownItem>
                          <DropdownItem
                            className='w-100 cursor-pointer'
                            onClick={async () => {
                              const response = await lockToRaiseSchedule({
                                active: schedule.lockToRaise ? false : true,
                                id: schedule.id
                              })
                              if(response.success == true){
                                toast.success(response.message)
                                refetch()
                              }
                            }}
                          >
                            <RefreshCcw size={14} className='me-50 text-warning' />
                            <span className='align-middle text-warning'> تغییر حضور و غیاب </span>
                            
                          </DropdownItem>
                          <DropdownItem
                            className='w-100 cursor-pointer'
                            onClick={async () => {
                              const response = await GetDetailSession(schedule.id)

                              if(!response){
                                setShow2(true)
                                setSelectedItem2(schedule)
                              }
                              else{
                                toast.error(' جلسه قبلا برای این برنامه ثبت شده است ')
                              }
                            }}
                          >
                            <Plus size={14} className='me-50 text-warning' />
                            <span className='align-middle text-warning'> ساخت جلسه </span>
                            
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </Table>
      )}

      <Pagination className="d-flex mt-3">
          {renderPaginationItems()}
        </Pagination> 

      {show && <ModalUpdate refetch={refetch} show={show} setShow={setShow} selectedItem={selectedItem} />}
      {show2 && <AddModalSession refetch={refetch} show={show2} setShow={setShow2} selectedItem={selectedItem2} />}
    </>
  );
};

export default ScheduleList;
