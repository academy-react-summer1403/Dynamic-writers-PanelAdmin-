import jMoment from 'jalali-moment'

// ** Icons Imports
import { MoreVertical, Edit, Trash, Check, FileText, X, Trash2, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { GetRepliesCommentNews } from '../../../core/Services/api/Comments/GetRepliesCommentNew'
import UpdateCommentNews from './Modal/UpdateCourseNewsModal'
import ReplyCommentNew from './Modal/ReplyCommentNew'

const TableHover = () => {

  const {id} = useParams()
  const {data: Replies, refetch, error, isLoading, isFetching} = useQuery({queryKey: ['GetRepliesNewsComment'], queryFn: () => GetRepliesCommentNews(id)})

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [show2, setShow2] = useState(false);
  const [selectedItem2, setSelectedItem2] = useState(null);

  const filteredCourses = Replies
  ? Replies.filter(comment => {
      const matchesSearch = comment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            comment.author?.toLowerCase().includes(searchTerm.toLowerCase());

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
  
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const navigate = useNavigate()

  if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
    <>
      <div className="mb-3 d-flex align-items-center iranSans" style={{gap: '20px'}}>
        <div>
          <Input
            id='search'
            name='search'
            type="text"
            className='iranSans'
            placeholder="جستجو بر اساس نام نظر یا ثبت کننده..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '260px'}}
          />
        </div>
      </div>

    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th> پاسخ </th>
          <th style={{whiteSpace: 'nowrap'}}>مشخصات پاسخ </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ ثبت </th>
          <th style={{whiteSpace: 'nowrap'}}> ثبت کننده </th>
          <th style={{whiteSpace: 'nowrap'}}>  </th>
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
                <ReplyCommentNew selectedItem={selectedItem} show={show} setShow={setShow} />
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
                <span className='align-middle fw-bold'> {reply.autor.replace('-', ' ')} </span>
              </td>
              <td>
              <UncontrolledDropdown className='position-static'>
                <DropdownToggle tag='div' className='btn btn-sm'>
                  <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    tag={Link}
                    className='w-100'
                    to={`/commentsNews/view/${reply.id}`}
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
                    <Edit size={14} className='me-50' />
                    <UpdateCommentNews show={show2} setShow={setShow2} selectedItem={selectedItem2} refetch={refetch} />
                    <span className='align-middle'> ویرایش نظر </span>
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
    </>
  )
}

export default TableHover
