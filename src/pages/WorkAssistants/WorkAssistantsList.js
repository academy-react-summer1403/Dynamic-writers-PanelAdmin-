import jMoment from 'jalali-moment'
import { MoreVertical, FileText, Edit } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GetWorkAssistants } from '../../core/Services/api/WorkAssistants/GetWorkAssistants'
import ModalUpdate from './ModalUpdate'

const WorkAssistantsList = () => {

  const {data: assistants, isLoading, isFetching, error, refetch} = useQuery({queryKey: ['GetWorkAssistants'], queryFn: GetWorkAssistants})

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredCourses = assistants
  ? assistants?.filter(course => {
      const matchesSearch = course.worktitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.assistanceName?.toLowerCase().includes(searchTerm.toLowerCase());

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
      <div className="mb-3 d-flex align-items-center iranSans">
        <div>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام منتور یا فعالیت..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '250px'}}
          />
        </div>  
      </div>

    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}> نام فعالیت </th>
          <th style={{whiteSpace: 'nowrap'}}> نام دوره </th>
          <th style={{whiteSpace: 'nowrap'}}> منتور </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ فعالیت </th>
          <th >  </th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              هیچ فعالیتی ثبت نشده است
            </td>
          </tr>
        ) : (
          filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((assistant, index) => (
            <tr key={index}>
              <td style={{whiteSpace: 'nowrap', maxWidth: '200px'}}> <div className='d-flex justify-content-left cursor-pointer align-items-center' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{assistant.worktitle}</span>
              <small className='text-muted' style={{height: '20px', overflow: 'hidden'}}>{assistant.workDescribe}</small>
            </div>
          </div> </td>
              <td style={{whiteSpace: 'nowrap'}}> {assistant.courseName} </td>
              <td style={{whiteSpace: 'nowrap'}}> {assistant.assistanceName} </td>
              <td style={{whiteSpace: 'nowrap'}}> {jMoment(assistant.workDate).locale('fa').format('jD jMMMM jYYYY')} </td>
              <td>
              <UncontrolledDropdown className='position-static'>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu positionFixed >
                    <DropdownItem
                      className='w-100 cursor-pointer'
                      onClick={() => {setShow(true), setSelectedItem(assistant)}}
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
    {show && <ModalUpdate show={show} setShow={setShow} refetch={refetch} selectedAssistant={selectedItem} />}
    </>
  )
}

export default WorkAssistantsList
