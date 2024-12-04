import React, { useState } from 'react';
import { Table, Spinner, Pagination, PaginationItem, PaginationLink, Badge, Button, Input, Label, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { GetTerms } from '../../core/Services/api/Term/GetTerms';
import jMoment from 'jalali-moment';
import ModalUpdate from './ModalUpdate';
import AddModal from './AddModal';
import AddModalCloseDate from './AddModalCloseDate';
import { Edit, MoreVertical, Plus } from 'react-feather';

const TermList = () => {
  const { data: departments, isLoading, isFetching, error, refetch } = useQuery({ queryKey: ['GetTerms'], queryFn: GetTerms });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [show3, setShow3] = useState(false);
  const [selectedItem3, setSelectedItem3] = useState(null);

  const [show2, setShow2] = useState(false);

  const [statusFilter, setStatusFilter] = useState(null);

  const statusOptions = [
    { value: null, label: 'همه' },
    { value: 'active', label: 'فعال' },
    { value: 'expired', label: 'منقضی شده' }
  ];

  const filteredCourses = departments
    ? departments?.filter(course => {
        const matchesSearch = course.termName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === null || (statusFilter === 'active' && course.expire === false) || (statusFilter === 'expired' && course.expire === true);
        return matchesSearch && matchesStatus;
      })
    : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (selectedOption) => {
    setStatusFilter(selectedOption?.value);
    setCurrentPage(1);
  };

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

  if (isLoading || isFetching) return <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
    <>
      <div className="mb-3 d-flex gap-1 iranSans w-100" style={{justifyItems: 'center', flexFlow: 'row wrap'}}>
        <div>
          <Input
            id="search"
            name="search"
            type="text"
            className="iranSans"
            placeholder="جستجو بر اساس نام ترم..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '200px' }}
          />
        </div>

        <div style={{width: '150px'}}>
          <Select
            id="statusFilter"
            options={statusOptions}
            value={statusOptions.find(option => option.value === statusFilter)}
            onChange={handleStatusFilterChange}
            className="react-select"
            style={{width: '150px'}}
            classNamePrefix="select"
            isClearable={false}
          />
        </div>

        <Button color="primary" style={{ height: '40px' }} onClick={() => { setShow2(true) }}> ساخت ترم جدید </Button>
      </div>

      {isLoading || isFetching ? (
        <div className="d-flex" style={{ justifyContent: 'center', margin: '50px' }}>
          <Spinner />
        </div>
      ) : (
        <>
          <Table hover responsive>
            <thead>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}> نام ترم </th>
                <th style={{ whiteSpace: 'nowrap' }}> بخش </th>
                <th style={{ whiteSpace: 'nowrap' }}> وضعیت </th>
                <th style={{ whiteSpace: 'nowrap' }}> زمان شروع </th>
                <th style={{ whiteSpace: 'nowrap' }}> تاریخ </th>
                <th> </th>
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
                    <td style={{ whiteSpace: 'nowrap' }}> {term.termName} </td>
                    <td style={{ whiteSpace: 'nowrap' }}> {term.departmentName} </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Badge color={term.expire === false ? 'light-success' : 'light-danger'}>
                        {term.expire === false ? ' فعال ' : ' منقضی شده '}
                      </Badge>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {jMoment(term.startDate).locale('fa').format('jD jMMMM jYYYY')}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {jMoment(term.insertDate).locale('fa').format('jD jMMMM jYYYY')}
                    </td>
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
                            <DropdownItem
                              className='w-100 cursor-pointer'
                              onClick={() => {setShow3(true), setSelectedItem3(term)}}
                            >
                              <Plus size={14} className='me-50 text-warning' />
                              <span className='align-middle text-warning'> تاریخ پایان </span>
                              
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

      {show && <ModalUpdate show={show} refetch={refetch} setShow={setShow} selectedItem={selectedItem} />}
      {show2 && <AddModal show={show2} refetch={refetch} setShow={setShow2} />}
      {show3 && <AddModalCloseDate show={show3} refetch={refetch} setShow={setShow3} selectedItem={selectedItem3} />}
    </>
  );
};

export default TermList;
