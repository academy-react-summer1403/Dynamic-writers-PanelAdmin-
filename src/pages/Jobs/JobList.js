import { MoreVertical, FileText, Edit, Check, X, XCircle } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label, Button, Badge } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import jMoment from 'jalali-moment'
import { GetJobs } from '../../core/Services/api/Jobs/GetJobs'
import { SendToIndex } from '../../core/Services/api/Jobs/SendToIndex'
import toast from 'react-hot-toast'
import { DeleteJob } from '../../core/Services/api/Jobs/DeleteJob'
import ModalUpdate from './ModalUpdate'

const JobList = () => {

  const { data: jobs, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['GetJobs'],
    queryFn: GetJobs
  })

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredJobs = jobs
    ? jobs?.filter(job => {
        const matchesSearch = job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch;
      })
    : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate()

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
    <>
      <div className="mb-3 d-flex align-items- gap-1 iranSans">
        <div>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام شغل..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '250px' }}
          />
        </div>
      </div>

      {isLoading || isFetching ? <div className='d-flex' style={{ justifyContent: 'center', margin: '50px' }}> <Spinner /> </div> : <>
        <Table hover responsive>
          <thead>
            <tr>
              <th style={{ whiteSpace: 'nowrap' }}>نام شغل</th>
              <th style={{ whiteSpace: 'nowrap' }}>وب سایت شرکت</th>
              <th style={{ whiteSpace: 'nowrap' }}>وضعیت</th>
              <th style={{ whiteSpace: 'nowrap' }}>تاریخ شروع</th>
              <th style={{ whiteSpace: 'nowrap' }}>تاریخ پایان</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  هیچ شغلی ثبت نشده است
                </td>
              </tr>
            ) : (
              filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((job, index) => (
                <tr key={index}>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.jobTitle}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.companyWebSite}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Badge color={job.inWork ? 'light-success' : 'light-danger'}>
                      {job.inWork ? 'در حال کار' : 'اتمام کار'}
                    </Badge>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {jMoment(job.workStartDate).locale('fa').format('jD jMMMM jYYYY')}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {jMoment(job.workEndDate).locale('fa').format('jD jMMMM jYYYY')}
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
                        <DropdownItem
                          className='w-100 cursor-pointer'
                          onClick={async () => {
                            const response = await DeleteJob(job.id)

                            if(response.success == true){
                              toast.success(response.message)
                              refetch()
                            }
                            else{
                              toast.error(response.message)
                            }
                          }}
                        >
                          <X size={14} className={`me-50 text-danger`} />
                          <span className={`align-middle text-danger`}> حذف </span>
                        </DropdownItem>
                        <DropdownItem
                          className='w-100 cursor-pointer'
                          onClick={() => {setShow(true), setSelectedItem(job)}}
                        >
                          <Edit size={14} className={`me-50 text-primary`} />
                          <span className={`align-middle text-primary`}> ویرایش مشخصات </span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index + 1} active={index + 1 === currentPage}>
              <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </>
      }
      {show && <ModalUpdate show={show} setShow={setShow} selectedItem={selectedItem} refetch={refetch} />}
    </>
  )
}

export default JobList;
