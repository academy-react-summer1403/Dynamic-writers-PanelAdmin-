import jMoment from 'jalali-moment'

// ** Icons Imports
import { MoreVertical, Edit, Trash, Check, FileText, X, Trash2, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { GetRepliesCommentCourse } from '../../../core/Services/api/Comments/GetRepliesCourseComment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { AcceptCourseComment } from '../../../core/Services/api/Comments/AcceptComment'
import { RejectCourseComment } from '../../../core/Services/api/Comments/RejectComment'
import { DeleteCourseComment } from '../../../core/Services/api/Comments/DeleteComment'
import toast from 'react-hot-toast'
import ReplyCommentCourse from '../Modal/ReplyCourseCommentModal'
import { flip, preventOverflow } from '@popperjs/core'
import UpdateReplyCourse from '../Modal/UpdateReplyCourseModal'

const TableHover = () => {

  const {id, courseId} = useParams()
  const {data: Replies, refetch, error, isLoading, isFetching} = useQuery({queryKey: ['GetRepliesCourseComment'], queryFn: () => GetRepliesCommentCourse(courseId, id)})

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [show2, setShow2] = useState(false);
  const [selectedItem2, setSelectedItem2] = useState(null);

  const filteredCourses = Replies
  ? Replies.filter(course => {
      const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'accepted' && course.accept) || 
                            (statusFilter === 'pending' && !course.accept);

      return matchesSearch && matchesStatus;
    })
  : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
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
      <div className="mb-3 d-flex align-items-center iranSans gap-2">
        <div>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام نظر یا ثبت کننده..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '250px'}}
          />
        </div>
        <div>
          <Input
            id='statusFilter'
            type="select"
            className='iranSans'
            value={statusFilter}
            onChange={handleStatusFilterChange}
            style={{ width: '150px', marginRight: '10px' }}
          >
            <option value="all" className='iranSans'> همه </option>
            <option value="accepted" className='iranSans'>قبول شده</option>
            <option value="pending" className='iranSans'>در حال انتظار</option>
          </Input>
        </div>  
      </div>

    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}> پاسخ </th>
          <th style={{whiteSpace: 'nowrap'}}>مشخصات پاسخ </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ ثبت </th>
          <th style={{whiteSpace: 'nowrap'}}> ثبت کننده </th>
          <th style={{whiteSpace: 'nowrap'}}> وضعیت </th>
          <th >  </th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              هیچ پاسخی ثبت نشده است
            </td>
          </tr>
        ) : (
          filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((reply, index) => (
            <tr key={index}>
              <td> 
                <ArrowRight onClick={() => {
                  setSelectedItem(reply)
                  setShow(true)
                }} className='text-info cursor-pointer' /> 
              </td>
              <td>
                <div className='d-flex' style={{flexDirection: 'column', maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                  <span onClick={() => navigate(`/commentsNews/view/${reply.id}`)} className='align-middle' style={{fontSize: '16px', fontWeight: '700'}}> {reply.title} </span>
                  <span className='align-middle fw-bold'> {reply.describe} </span>
                </div>
              </td>
              <td style={{whiteSpace: 'nowrap'}}> {jMoment(reply.insertDate).locale('fa').format('jD jMMMM jYYYY')} </td>
              <td style={{whiteSpace: 'nowrap'}}>
                <img className='me-75 rounded bg-primary' src={reply.pictureAddress} alt='' height='30' width='30' />
                <span className='align-middle fw-bold'> {reply.author.replace('-', ' ')} </span>
              </td>
              <td>
                <Badge className='text-capitalize' color={reply.accept ? 'light-success' : 'light-warning'} pill>
                  {reply.accept ? 'قبول شده' : 'در حال انتظار'}
                </Badge>
              </td>
              <td>
              <UncontrolledDropdown className='position-static'>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu positionFixed >
                    <DropdownItem
                      tag={Link}
                      className='w-100'
                      to={`/comments/view/${reply.id}/${reply.courseId}`}
                    >
                      <FileText size={14} className='me-50' />
                      <span className='align-middle'> نمایش پاسخ ها </span>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setSelectedItem2(reply)
                        setShow2(true)
                      }} 
                      className='text-info cursor-pointer w-100'>
                      <FileText size={14} className='me-50' />
                      <span className='align-middle'> ویرایش نظر </span>
                      {show2 && <UpdateReplyCourse show={show2} setShow={setShow2} selectedItem={selectedItem2} refetch={refetch} />}
                    </DropdownItem>
                    {reply.accept === false && <DropdownItem tag='a' href='/' className='w-100' onClick={async (e) => {
                      e.preventDefault()
                      const response = await AcceptCourseComment(reply.id)
                      if(!response) {
                        toast.error(' عملیات ناموفق بود ')
                      }
                      else if(response.success == true){
                        toast.success(' عملبات با موفیقت انجام شد ')
                        refetch()
                      }  
                      else{
                        toast.error(' عملیات ناموفق بود ')
                      }
                    }}>
                      <Check size={14} className='me-50 text-success' />
                      <span className='align-middle text-success'> قبول کردن نظر </span>
                    </DropdownItem>}
                    {reply.accept === true && <DropdownItem tag='a' href='/' className='w-100' onClick={async (e) => {
                      e.preventDefault()
                      const response = await RejectCourseComment(reply.id)
                      if(!response) {
                        toast.error(' عملیات ناموفق بود ')
                      }
                      else if(response.success == true){
                        toast.success(' عملبات با موفیقت انجام شد ')
                        refetch()
                      }  
                      else{
                        toast.error(' عملیات ناموفق بود ')
                      }
                    }}>
                      <X size={14} className='me-50 text-warning' />
                      <span className='align-middle text-warning'> رد کردن نظر </span>
                    </DropdownItem>}
                    <DropdownItem
                      tag='a'
                      className='w-100'
                      onClick={async (e) => {
                        e.preventDefault()
                        const response = await DeleteCourseComment(reply.id)
                      if(!response) {
                        toast.error(' عملیات ناموفق بود ')
                      }
                      else if(response.success == true){
                        toast.success(' عملبات با موفیقت انجام شد ')
                        refetch()
                      }
                      else{
                        toast.error(' امکان به حذف این نظر وجود ندارد😎 ')
                      }
                      }}
                    >
                      <Trash2 size={14} className='me-50 text-danger' />
                      <span className='align-middle text-danger'> حذف </span>
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
      <ReplyCommentCourse show={show} setShow={setShow} selectedItem={selectedItem} />
      </>
    }
    </>
  )
}

export default TableHover
