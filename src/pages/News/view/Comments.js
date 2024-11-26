import React, { Fragment, useState } from 'react'
import { Spinner, Table, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { useQuery } from 'react-query'
import { GetNewsComment } from '../../../core/Services/api/Comments/GetNewsComment'
import jMoment from 'jalali-moment'
import UpdateCommentNews from './Modal/UpdateCourseNewsModal'
import ReplyCommentNew from './Modal/ReplyCommentNew'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Edit, FileText, MoreVertical } from 'react-feather'

const CommentsNew = ({ id }) => {
  const { data: Comments, isLoading, refetch, isFetching, error } = useQuery({
    queryKey: ['GetNewsComment', id],
    queryFn: () => GetNewsComment(id)
  })

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Comments ? Math.ceil(Comments.length / itemsPerPage) : 1

  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [show2, setShow2] = useState(false)
  const [selectedItem2, setSelectedItem2] = useState(null)

  const navigate = useNavigate()

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedComments = Comments
    ? Comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : []

  if (isLoading || isFetching)
    return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}>
      <Spinner />
    </div>
  if (error) return <div>خطا در بارگذاری داده‌ها</div>

  return (
    <Fragment>
      <Table hover responsive>
        <thead>
          <tr>
            <th style={{ whiteSpace: 'nowrap' }}>پاسخ</th>
            <th style={{ whiteSpace: 'nowrap' }}>مشخصات نظر</th>
            <th style={{ whiteSpace: 'nowrap' }}>نام ثبت کننده</th>
            <th style={{ whiteSpace: 'nowrap' }}>تاریخ ثبت</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {paginatedComments.map((comment, index) => (
            <tr key={index} className='cursor-auto'>
              <td style={{ height: '30px', whiteSpace: 'nowrap'  }}>
                <ArrowRight
                  onClick={() => {
                    setSelectedItem2(comment)
                    setShow2(true)
                  }}
                  className='text-info cursor-pointer'
                />
              </td>
              <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap'  }}>
                <div className='d-flex' style={{ flexDirection: 'column', gap: '5px' }}>
                  <span style={{overflow: 'hidden', maxWidth: '200px', textOverflow: 'ellipsis'}} onClick={() => navigate(`/commentsNews/view/${comment.id}`)} className='font-bold'>
                    {comment.title}
                  </span>
                  <span className='text-body-secondary' style={{overflow: 'hidden', maxWidth: '200px', textOverflow: 'ellipsis', fontSize: '13'}}>
                    {comment.describe}
                  </span>
                </div>
              </td>
              <td style={{whiteSpace: 'nowrap' }}>{comment.autor.replace('-', ' ')}</td>
              <td style={{whiteSpace: 'nowrap' }}>{jMoment(comment.inserDate).locale('fa').format('jD jMMMM jYYYY')}</td>
              <td style={{whiteSpace: 'nowrap' }}>
                <UncontrolledDropdown className='position-static'>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {
                        setSelectedItem(comment)
                        setShow(true)
                      }}
                      className='text-info cursor-pointer w-100'
                    >
                      <Edit size={14} className='me-50' />
                      <span className='align-middle'>ویرایش نظر</span>
                    </DropdownItem>
                    <DropdownItem tag={Link} className='w-100' to={`/commentsNews/view/${comment.id}`}>
                      <FileText size={14} className='me-50' />
                      <span className='align-middle'>نمایش پاسخ‌ها</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {Comments?.length > 0 && totalPages > 1 && (
        <Pagination className='my-2'>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index + 1} active={index + 1 === currentPage}>
              <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      )}
      {show2 && <ReplyCommentNew show={show2} setShow={setShow2} selectedItem={selectedItem2} />}
      {show && <UpdateCommentNews show={show} setShow={setShow} selectedItem={selectedItem} refetch={refetch} />}
    </Fragment>
  )
}

export default CommentsNew
