import { MoreVertical, FileText, Edit } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label, Button, Badge } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalUpdate from './ModalUpdate'
import jMoment from 'jalali-moment'
import AddModal from './AddModal'
import { GetTerms } from '../../core/Services/api/Term/GetTerms'

const TermList = () => {

  const {data: departments, isLoading, isFetching, error, refetch} = useQuery({queryKey: ['GetTerms'], queryFn: GetTerms})

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [show2, setShow2] = useState(false);

  const filteredCourses = departments
  ? departments?.filter(course => {
      const matchesSearch = course.termName?.toLowerCase().includes(searchTerm.toLowerCase())

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
      <div className="mb-3 d-flex align-items- gap-1 iranSans">
        <div>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام ترم..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '250px'}}
          />
        </div>  
        <Button color='primary' style={{height: '40px'}} onClick={() => {setShow2(true)}}> ساخت ترم جدید </Button>
      </div>

    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}> نام ترم </th>
          <th style={{whiteSpace: 'nowrap'}}> بخش </th>
          <th style={{whiteSpace: 'nowrap'}}> وضعیت </th>
          <th style={{whiteSpace: 'nowrap'}}> زمان شروع </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ </th>
          <th >  </th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              هیچ ترمی ثبت نشده است
            </td>
          </tr>
        ) : (
          filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((term, index) => (
            <tr key={index}>
              <td style={{whiteSpace: 'nowrap'}}> {term.termName} </td>
              <td style={{whiteSpace: 'nowrap'}}> {term.departmentName} </td>
              <td style={{whiteSpace: 'nowrap'}}> <Badge color={term.expire == false ? 'light-success' : 'light-danger'}> {term.expire == false ? ' فعال ' : ' منقضی شده '} </Badge> </td>
              <td style={{whiteSpace: 'nowrap'}}> {jMoment(term.startDate).locale('fa').format('jD jMMMM jYYYY')} </td>
              <td style={{whiteSpace: 'nowrap'}}> {jMoment(term.insertDate).locale('fa').format('jD jMMMM jYYYY')} </td>
              <td>
              <UncontrolledDropdown className='position-static'>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu positionFixed >
                    <DropdownItem
                      className='w-100 cursor-pointer'
                      onClick={() => {setShow(true), setSelectedItem(term)}}
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
    {show && <ModalUpdate show={show} refetch={refetch} setShow={setShow} selectedItem={selectedItem} />}
    {show2 && <AddModal show={show2} refetch={refetch} setShow={setShow2} />}
    </>
  )
}

export default TermList
