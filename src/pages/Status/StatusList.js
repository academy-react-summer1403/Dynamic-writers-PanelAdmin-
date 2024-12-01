import { Edit } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label, Button } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalUpdate from './ModalUpdate'
import AddModal from './AddModal'
import { GetStatus } from '../../core/Services/api/Status/GetStatus'

const StatusList = () => {

  const {data: status, isLoading, isFetching, error, refetch} = useQuery({queryKey: ['GetStatus'], queryFn: GetStatus})

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCourses = status
      ? status.filter(course =>
          course.statusName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
  };

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  const navigate = useNavigate();

  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [show2, setShow2] = useState(false)

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
      <>
          <div className="mb-3 d-flex align-items-center iranSans gap-1">
              <div>
                  <Input
                      id='search'
                      name='search'
                      type="text"
                      className='iranSans'
                      placeholder="جستجو بر اساس نام وضعیت..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ width: '250px' }}
                  />
              </div>
              <Button color='primary' style={{height: '40px'}} onClick={() => {setShow2(true)}}> ساخت وضعیت جدید </Button>
          </div>

          {isLoading || isFetching ? (
              <div className='d-flex' style={{ justifyContent: 'center', margin: '50px' }}> <Spinner /> </div>
          ) : (
              <div>
                  <div className="d-flex flex-wrap">
                      {filteredCourses.length === 0 ? (
                          <div className="w-100 text-center">
                              هیچ وضعیتی ثبت نشده است
                          </div>
                      ) : (
                          filteredCourses
                              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                              .map((status, index) => (
                                  <UncontrolledDropdown key={index} className="card m-2" style={{ width: '24rem' }}>
                                      <DropdownToggle tag="div" className="card-body" style={{ cursor: 'pointer' }}>
                                          <div className="d-flex align-items-center justify-content-between">
                                              <div>
                                                  <h6 className="card-title mb-1" style={{fontSize: '16px'}}>{status.id}_ {status.statusName}</h6>
                                                  <span className="text-muted">توضیحات: {status.describe}</span>
                                              </div>
                                              <Edit size={20} className="text-primary" />
                                          </div>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                          <DropdownItem onClick={() => {setShow(true), setSelectedItem(status)}}>
                                              <Edit size={14} className='me-50 text-primary' />
                                              <span className='align-middle text-primary'> تغییر مشخصات </span>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </UncontrolledDropdown>
                              ))
                      )}
                  </div>
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
          )}
          {show && <ModalUpdate show={show} setShow={setShow} refetch={refetch} selectedItem={selectedItem} />}
          {show2 && <AddModal show={show2} setShow={setShow2} refetch={refetch} />}
      </>
  )
}

export default StatusList