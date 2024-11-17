import React, { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ArrowRight, ChevronDown, Edit, Edit2, FileText, MoreVertical, Trash } from 'react-feather'
import { useQuery } from 'react-query'
import { Card, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink, Spinner, Table, UncontrolledDropdown } from 'reactstrap'
import { GetNewsComment } from '../../../core/Services/api/Comments/GetNewsComment'
import Avatar from '@components/avatar'
import jMoment from 'jalali-moment'
import ReactPaginate from 'react-paginate'
import UpdateCommentNews from './Modal/UpdateCourseNewsModal'
import ReplyCommentNew from './Modal/ReplyCommentNew'
import { Link, useNavigate } from 'react-router-dom'

const CommentsNew = ({ id }) => {

    const {data: Comments, isLoading, refetch, isFetching, error} = useQuery({queryKey: ['GetNewsComment'], queryFn: () => GetNewsComment(id)})
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(Comments?.length / itemsPerPage);

    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const [show2, setShow2] = useState(false);
    const [selectedItem2, setSelectedItem2] = useState(null);
  

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const navigate = useNavigate()


    if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
    if (error) return <div>خطا در بارگذاری داده‌ها</div>;
    
  return (
    <Fragment>
    <Table hover responsive>
      <thead>
          <tr>
            <th style={{whiteSpace: 'nowrap'}}> پاسخ </th>
            <th style={{whiteSpace: 'nowrap'}}>مشخصات نظر</th>
            <th style={{whiteSpace: 'nowrap'}}>نام ثبت کننده</th>
            <th style={{whiteSpace: 'nowrap'}}>تاریخ ثبت</th>
            <th >  </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {Comments?.map((comment, index) => (
            <tr key={index} className='cursor-auto'>
              <td style={{height: '30px'}}> <ArrowRight onClick={() => {
                  setSelectedItem2(comment)
                  setShow2(true)
                }} className='text-info cursor-pointer' /> </td>
              <td style={{ fontWeight: 'bold' }}>
                <div className='d-flex' style={{flexDirection: 'column', gap: '5px'}}>
                    <span onClick={() => navigate(`/commentsNews/view/${comment.id}`)} className='font-bold'> {comment.title} </span>
                    <span className='text-body-secondary' style={{fontSize: '13px'}}> {comment.describe} </span>
                </div>
              </td>
              <td>{comment.autor.replace('-', ' ')}</td>
              <td>{jMoment(comment.inserDate).locale('fa').format('jD jMMMM jYYYY')}</td>
              <td>
              <UncontrolledDropdown className='position-static'>
                <DropdownToggle tag='div' className='btn btn-sm'>
                  <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => {setSelectedItem(comment), setShow(true)}} className='text-info cursor-pointer w-100'>
                    <UpdateCommentNews show={show} setShow={setShow} selectedItem={selectedItem} refetch={refetch} />
                    <Edit size={14} className='me-50' />
                    <span className='align-middle'> ویرایش نظر </span>
                    <ReplyCommentNew show={show2} setShow={setShow2} selectedItem={selectedItem2} />
                  </DropdownItem>
                  <DropdownItem
                    tag={Link}
                    className='w-100'
                    to={`/commentsNews/view/${comment.id}`}
                    onClick={() => console.log(comment)}
                  >
                    <FileText size={14} className='me-50' />
                    <span className='align-middle'> نمایش پاسخ ها </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {Comments?.length > 0 && <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>}
    </Fragment>
  )
}

export default CommentsNew
