// ** React Imports
import { Fragment, useState } from 'react'

import {
  X,
  MoreVertical,
  Trash2,
  Edit,
  Check,
  Image
} from 'react-feather'

import {
  Badge,
  Button,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import jMoment from 'moment-jalaali'
import { GetCoursePayments } from '../../core/Services/api/Payment/GetCoursePayments'
import { DeleteCoursePayments } from '../../core/Services/api/Payment/DeleteCoursePayment'
import { AcceptCoursePayments } from '../../core/Services/api/Payment/AcceptCoursePayments'
import UpdateCoursePaymentModal from './Modal/UpdateCoursePaymentModal'
import AddImageCoursePaymentModal from './Modal/AddImageCoursePaymentModal'

const CoursePayment = () => {

  const {data: Course, refetch: refetchCourse, isLoading: isLoadingCourse} = useQuery({queryKey: ['GetCoursePayments', '0ed74730-9012-ef11-b6c2-f4b229435c5d'], queryFn: () => GetCoursePayments('0ed74730-9012-ef11-b6c2-f4b229435c5d')})

  
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = Course
  ? Course?.filter(course => {
      const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }).reverse()
  : [];

  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [show2, setShow2] = useState(false)
  const [selectedItem2, setSelectedItem2] = useState(null)

  const [show3, setShow3] = useState(false)
  const [selectedItem3, setSelectedItem3] = useState(null)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  return (
    <Fragment>
        <div className='d-flex justify-content-between w-100 my-2'>
            <CardTitle tag={'h3'}> پرداختی ها </CardTitle>
        </div>
        {Course?.length > 0 ? <Table hover responsive>
        <thead>
        <tr>
            <th style={{whiteSpace: 'nowrap'}}> عنوان </th>
            <th style={{whiteSpace: 'nowrap'}}> شماره پرداخت </th>
            <th style={{whiteSpace: 'nowrap'}}> نام کاربر </th>
            <th style={{whiteSpace: 'nowrap'}}> وضعیت </th>
            <th style={{whiteSpace: 'nowrap'}}> قیمت </th>
            <th>  </th>
        </tr>
        </thead>
        {isLoadingCourse ? <div className='d-flex justify-content-center py-5'> <Spinner /> </div> : <tbody>
        {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course, index) => (
            <tr key={course.id}>
            <td className='d-flex gap-2' style={{ fontWeight: 'bold',justifyItems: 'center' , whiteSpace: 'nowrap', height: '60px' }}>
            <img className='bg-secondary' src={course.paymentInvoiceImage} style={{borderRadius: '50px', width: '40px', height: '40px'}} /> 
            <div className='d-flex' style={{flexDirection: 'column'}}>
              <span style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}> {course.title} </span>
              <span className='text-secondary' style={{fontSize: '11px'}}> {jMoment(course.peymentDate).locale('fa').format('jD jMMMM jYYYY')} </span> 
            </div> </td>
            <td style={{whiteSpace: 'nowrap'}}>{course.paymentInvoiceNumber}</td>
            <td style={{whiteSpace: 'nowrap' ,maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(course.studentName).replace('-', ' ')}</td>
            <td style={{whiteSpace: 'nowrap'}}> <Badge color={course.accept ? 'light-success' : 'light-danger'}> {course.accept ? 'قبول شده' : 'در حال انتظار'} </Badge> </td>
            <td style={{whiteSpace: 'nowrap'}}>{parseInt(course.paid).toLocaleString('en-US')} <span className='text-secondary' style={{fontSize: '11px'}}>  تومان </span> </td>
            <td>
            <UncontrolledDropdown className='position-static'>
                <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu>
                {course.accept === false && <DropdownItem
                tag='a'
                className='w-100'
                onClick={async (e) => {
                    e.preventDefault()
                    const data = new FormData()
                    data.append('PaymentId', course.id)
                    const response = await DeleteCoursePayments(data)
                    if(response.success === true){
                    toast.success(' حذف انجام شد ')
                    refetchCourse()
                    }
                }}
                >
                <Trash2 size={14} className='me-50 text-danger' />
                <span className='align-middle text-danger'> حذف </span>
                </DropdownItem>}
                <DropdownItem
                tag='a'
                className='w-100'
                onClick={() => {
                  setShow(true)
                  setSelectedItem(course)
                }}
                >
                <Edit size={14} className='me-50' />
                <span className='align-middle'> ویرایش </span>
                </DropdownItem>
                <DropdownItem
                tag='a'
                className='w-100'
                onClick={() => {
                  setShow2(true)
                  setSelectedItem2(course)
                }}
                >
                <Image size={14} className='me-50 text-primary' />
                <span className='align-middle text-primary'> رسید </span>
                </DropdownItem>
                {course.accept === false && <DropdownItem
                tag='a'
                className='w-100'
                onClick={async () => {
                  const data = new FormData()
                  data.append('PaymentId', course.id)
                  console.log(data)
                  const response = await AcceptCoursePayments(data)
                  if(response.success === true){
                    toast.success(' عملیات انجام شد ')
                    refetchCourse()
                    }
                }}
                >
                <Check size={14} className='me-50 text-success' />
                <span className='align-middle text-success'> قبول کردن </span>
                </DropdownItem>}
                </DropdownMenu>
            </UncontrolledDropdown>
            </td>
            </tr>
        ))}
        </tbody>}
        </Table> : <div style={{height: '20px'}}> <Badge color='danger'> <X /> </Badge> گروهی موجود نیست </div>}
        <Pagination className="d-flex justify-content-center mt-3">
          {renderPaginationItems()}
        </Pagination> 
        {show2 && <AddImageCoursePaymentModal show={show2} refetch={refetchCourse} setShow={setShow2} course={selectedItem2} />}
        {show && <UpdateCoursePaymentModal show={show} setShow={setShow} course={selectedItem} />}
    </Fragment>
  )
}

export default CoursePayment
