import { MoreVertical, FileText, Edit, Check, X, XCircle } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label, Button, Badge } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import jMoment from 'jalali-moment'
import { GetJobs } from '../../core/Services/api/Jobs/GetJobs'
import { SendToIndex } from '../../core/Services/api/Jobs/SendToIndex'
import toast from 'react-hot-toast'
import Select from 'react-select'

const JobList = () => {
  const { data: jobs, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['GetJobs'],
    queryFn: GetJobs
  })

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredJobs = jobs
    ? jobs?.filter(job => {
        const matchesSearch = job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter
          ? (statusFilter.value === 'all' ||
            (statusFilter.value === 'inProgress' && job.inWork) ||
            (statusFilter.value === 'completed' && !job.inWork))
          : true;
        return matchesSearch && matchesStatus;
      })
    : [];

  const sortedJobs = filteredJobs.sort((a, b) => {
    if (a.showInFirstPage && !b.showInFirstPage) return -1;
    if (!a.showInFirstPage && b.showInFirstPage) return 1;
    return 0;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate()

  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);

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

  if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  const statusOptions = [
    { value: 'all', label: 'همه' },
    { value: 'inProgress', label: 'در حال کار' },
    { value: 'completed', label: 'اتمام کار' },
  ];

  return (
    <>
      <div className="mb-3 d-flex align-items-center gap-2 iranSans" style={{flexFlow: 'row wrap', width: '100%'}}>
        <Input
          id='search'
          name='search'
          type="text"
          className='iranSans'
          placeholder="جستجو بر اساس نام شغل..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '200px' }}
        />

        <Select
          className="react-select"
          classNamePrefix="select"
          options={statusOptions}
          onChange={setStatusFilter}
          placeholder= "وضعیت"
          value={statusFilter}
          style={{ minWidth: '200px'}}
        />
      </div>

      {isLoading || isFetching ? (
        <div className='d-flex' style={{ justifyContent: 'center', margin: '50px' }}> <Spinner /> </div>
      ) : (
        <>
          <Table hover responsive>
            <thead>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}>نام شغل</th>
                <th style={{ whiteSpace: 'nowrap' }}>درباره شغل</th>
                <th style={{ whiteSpace: 'nowrap' }}>وب سایت شرکت</th>
                <th style={{ whiteSpace: 'nowrap' }}>شرکت</th>
                <th style={{ whiteSpace: 'nowrap' }}>وضعیت</th>
                <th style={{ whiteSpace: 'nowrap' }}>تاریخ شروع</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedJobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    هیچ شغلی ثبت نشده است
                  </td>
                </tr>
              ) : (
                sortedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((job, index) => (
                  <tr key={index}>
                    <td style={{ whiteSpace: 'nowrap' }}>{job.jobTitle}</td>
                    <td style={{ whiteSpace: 'nowrap', maxWidth: '250px', textOverflow: 'ellipsis', overflow:'hidden' }}>{job.aboutJob}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{job.companyWebSite}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{job.companyName}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Badge color={job.inWork ? 'light-success' : 'light-danger'}>
                        {job.inWork ? 'در حال کار' : 'اتمام کار'}
                      </Badge>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {jMoment(job.workStartDate).locale('fa').format('jD jMMMM jYYYY')}
                    </td>
                    <td>
                      <UncontrolledDropdown className='position-static'>
                        <DropdownToggle tag='div' className='btn btn-sm'>
                          <MoreVertical size={14} className='cursor-pointer' />
                        </DropdownToggle>
                        <DropdownMenu positionFixed >
                          <DropdownItem
                            className='w-100 cursor-pointer'
                            onClick={async () => {
                              const response = await SendToIndex(job.id, job.showInFirstPage ? false : true)

                              if(response.success == true){
                                toast.success(response.message)
                                refetch()
                              }
                            }}
                          >
                            {job.showInFirstPage ? <XCircle size={14} className={`me-50 text-danger`} /> : <Check size={14} className={`me-50 text-success`} />}
                            <span className={`align-middle ${job.showInFirstPage ? 'text-danger' : 'text-success'}`}> نمایش اول </span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <Pagination className="d-flex mt-3">
            {renderPaginationItems()}
          </Pagination> 
        </>
      )}
    </>
  );
};

export default JobList;
