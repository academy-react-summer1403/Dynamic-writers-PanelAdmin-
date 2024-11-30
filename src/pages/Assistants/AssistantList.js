import jMoment from 'jalali-moment'
import { MoreVertical, FileText, Edit } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GetAssistants } from '../../core/Services/api/Assistants/GetAssistants'
import ModalUpdate from './ModalUpdate'

const AssistantList = () => {

  const {data: assistants, isLoading, isFetching, error, refetch} = useQuery({queryKey: ['GetAssistants'], queryFn: GetAssistants})

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredCourses = assistants
  ? assistants?.filter(course => {
      const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            placeholder="جستجو بر اساس نام دستیار یا دوره..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '250px'}}
          />
        </div>  
      </div>

    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}> نام دوره </th>
          <th style={{whiteSpace: 'nowrap'}}> شناسه کاربر </th>
          <th style={{whiteSpace: 'nowrap'}}> دستیار </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ </th>
          <th >  </th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              هیچ دستیاری ثبت نشده است
            </td>
          </tr>
        ) : (
          filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((assistant, index) => (
            <tr key={index}>
              <td style={{whiteSpace: 'nowrap'}} onClick={() => navigate(`/assistants/view/${assistant.id}`)}> {assistant.courseName} </td>
              <td style={{whiteSpace: 'nowrap'}}> {assistant.userId} </td>
              <td style={{whiteSpace: 'nowrap'}}> {assistant.assistanceName === null ? 'نامشخص' : assistant.assistanceName } </td>
              <td style={{whiteSpace: 'nowrap'}}> {jMoment(assistant.inserDate).locale('fa').format('jD jMMMM jYYYY')} </td>
              <td>
              <UncontrolledDropdown className='position-static'>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu positionFixed >
                    <DropdownItem
                      tag={Link}
                      className='w-100'
                      to={`/assistants/view/${assistant.id}`}
                    >
                      <FileText size={14} className='me-50' />
                      <span className='align-middle'> نمایش بیشتر </span>
                    </DropdownItem>
                    <DropdownItem
                      className='w-100 cursor-pointer'
                      onClick={() => {setShow(true), setSelectedItem(assistant)}}
                    >
                      <Edit size={14} className='me-50 text-primary' />
                      <span className='align-middle text-primary'> تغییر دستیار </span>
                      
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
    <ModalUpdate show={show} refetch={refetch} setShow={setShow} selectedAssistant={selectedItem} />
    </>
  )
}

export default AssistantList
