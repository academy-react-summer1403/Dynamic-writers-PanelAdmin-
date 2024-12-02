import { MoreVertical, FileText, Edit } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label, Button } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalUpdate from './ModalUpdate'
import jMoment from 'jalali-moment'
import AddModal from './AddModal'
import { GetDepartment } from '../../core/Services/api/Department/GetDepartment'

const DepartmentList = () => {

  const {data: departments, isLoading, isFetching, error, refetch} = useQuery({queryKey: ['GetDepartments'], queryFn: GetDepartment})

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [show2, setShow2] = useState(false);

  const filteredCourses = departments
  ? departments?.filter(course => {
      const matchesSearch = course.depName?.toLowerCase().includes(searchTerm.toLowerCase())

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

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

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

  return (
    <>
      <div className="mb-3 d-flex align-items- gap-1 iranSans" style={{flexFlow: 'row wrap'}}>
        <div>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام بخش..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '200px'}}
          />
        </div>  
        <Button color='primary' style={{height: '40px', whiteSpace:'nowrap'}} onClick={() => {setShow2(true)}}> بخش جدید </Button>
      </div>

    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}> شناسه بخش </th>
          <th style={{whiteSpace: 'nowrap'}}> نام بخش </th>
          <th style={{whiteSpace: 'nowrap'}}> ساختمان </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ </th>
          <th >  </th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              هیچ بخشی ثبت نشده است
            </td>
          </tr>
        ) : (
          filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((department, index) => (
            <tr key={index}>
              <td style={{whiteSpace: 'nowrap'}}> {department.id} </td>
              <td style={{whiteSpace: 'nowrap'}}> {department.depName} </td>
              <td style={{whiteSpace: 'nowrap'}}> {department.buildingName} </td>
              <td style={{whiteSpace: 'nowrap'}}> {jMoment(department.insertDate).locale('fa').format('jD jMMMM jYYYY')} </td>
              <td style={{zIndex: 'auto'}}>
              <UncontrolledDropdown className='position-static'>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu positionFixed >
                    <DropdownItem
                      className='w-100 cursor-pointer'
                      onClick={() => {setShow(true), setSelectedItem(department)}}
                    >
                      <Edit size={14} className='me-50 text-primary' />
                      <span className='align-middle text-primary'> تغییر مشخصات </span>
                      
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
    }
    {show && <ModalUpdate show={show} refetch={refetch} setShow={setShow} selectedItem={selectedItem} />}
    {show2 && <AddModal show={show2} refetch={refetch} setShow={setShow2} />}
    </>
  )
}

export default DepartmentList