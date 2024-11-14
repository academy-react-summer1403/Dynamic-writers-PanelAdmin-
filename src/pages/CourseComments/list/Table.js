// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ArrowRight, Check, ChevronDown, FileText, MoreVertical, Trash2, X } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Badge,
  Col,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
} from 'reactstrap'

// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

import toast from 'react-hot-toast'
import { AcceptCourseComment } from '../../../core/Services/api/Comments/AcceptComment'
import { RejectCourseComment } from '../../../core/Services/api/Comments/RejectComment'
import { DeleteCourseComment } from '../../../core/Services/api/Comments/DeleteComment'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useQuery } from '@tanstack/react-query'
import { GetCourseComments } from '../../../core/Services/api/Comments/GetCourseComments'
import { GetCreateCourse } from '../../../core/Services/api/Course/GetCreateCourse'
import AddCardExample from '../Modal/AddReply'
import UpdateCommentCourse from '../Modal/UpdateCourseCommentModal'

// ** Table Header
const CustomHeader = ({ handlePerPage, handleQuery, rowsPerPage, searchTerm }) => {

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>نمایش</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={(val) => handlePerPage(val.target.value)}
              style={{ width: '5rem' }}
            >
              <option value='5'>5</option>
              <option value='7'>7</option>
              <option value='10'>10</option>
            </Input>
            <label htmlFor='rows-per-page'>عدد</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <Input
              placeholder='جستحوی نظر...'
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleQuery(e.target.value)}
            />
          </div>

        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** States
  const [SortingCol, setSortingCol] = useState('')
  const [SortType, setSortType] = useState('')
  const [RowsOfPage, setRowsOfPage] = useState(5)
  const [PageNumber, setPageNumber] = useState(1)
  const [Query, setQuery] = useState('')
  const [Accept, setAccept] = useState({ value: '', label: 'انتخاب کنید' })
  const [Teacher, setTeacher] = useState({ value: '', label: 'انتخاب کنید' })

  const {data: Create} = useQuery({queryKey: ['GetCreateCourse'], queryFn: GetCreateCourse})

  const {data: CourseComment, refetch, isLoading, isFetching} = useQuery({
    queryKey: ['GetCourseComments', SortType, SortingCol, Query, PageNumber, RowsOfPage, Accept, Teacher], 
    queryFn: () => GetCourseComments(SortType, SortingCol, Query, PageNumber, RowsOfPage, Accept, Teacher),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [show2, setShow2] = useState(false);
  const [selectedItem2, setSelectedItem2] = useState(null);

  const renderClient = row => {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.pictureAddress || 'light-primary'}
        content={row.fname || 'John Doe'}
      />
    )
    }

    const statusObj = {
      pending: 'light-warning',
      active: 'light-success',
      inactive: 'light-secondary',
      danger: 'light-danger',
    }

    const columns = [
    {
      name: 'پاسخ',
      maxWidth: '50px',
      selector: row => <ArrowRight onClick={() => {
        setSelectedItem(row)
        setShow(true)
      }} className='text-info cursor-pointer' />
    }
    ,{
      name: 'مشخصات نظر',
      sortable: true,
      minWidth: '300px',
      sortField: 'fullName',
      selector: row => row.fname,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column' style={{maxWidth: '200px', overflow: 'hidden'}}>
            <Link
              to={`/comments/view/${row.commentId}/${row.courseId}`}
              className='user_name text-truncate text-body'
            >
              <span className='fw-bolder'> {row.commentTitle ? row.commentTitle : 'نامشخص'} </span>
            </Link>
            <small className='text-truncate text-muted mb-0'>{row.describe}</small>
          </div>
        </div>
      )
    },
    {
      name: ' نام ثبت کننده ',
      minWidth: '230px',
      sortable: true,
      sortField: 'billing',
      selector: row => row.userFullName,
      cell: row => <span className='text-capitalize'>{row.userFullName.replace('-', ' ')}</span>
    },
    {
      name: ' نام دوره ',
      minWidth: '230px',
      sortable: true,
      sortField: 'billing',
      selector: row => row.courseTitle,
      cell: row => <span className='text-capitalize'>{row.courseTitle}</span>
    },
    {
      name: 'وضعیت',
      minWidth: '138px',
      sortable: true,
      sortField: 'status',
      selector: row => row.active,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.accept ? 'active' : 'danger']} pill>
          {row.accept ? 'قبول شده' : 'در حال انتظار'}
        </Badge>
      )
    },
    {
      name: 'اکشن ها',
      minWidth: '100px',
      cell: row => (
        <div style={{zIndex: 'auto'}}>
          <UncontrolledDropdown className='position-static'>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className='w-100'
                to={`/comments/view/${row.commentId}/${row.courseId}`}
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'> نمایش پاسخ ها </span>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setSelectedItem2(row)
                  setShow2(true)
                }} 
                className='text-info cursor-pointer w-100'>
                <FileText size={14} className='me-50' />
                <span className='align-middle'> ویرایش نظر </span>
              </DropdownItem>
              {row.accept === false && <DropdownItem tag='a' href='/' className='w-100' onClick={async (e) => {
                e.preventDefault()
                const response = await AcceptCourseComment(row.commentId)
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
              {row.accept === true && <DropdownItem tag='a' href='/' className='w-100' onClick={async (e) => {
                e.preventDefault()
                const response = await RejectCourseComment(row.commentId)
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
                  const response = await DeleteCourseComment(row.commentId)
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
        </div>
      )
    }
  ]

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const AcceptOptions = [
    { value: '',  label: 'انتخاب کنید' },
    { value: false, label: ' در حال انتظار ' },
    { value: true, label: ' قبول شده ' },
  ]

  const TeacherOptions = Create?.teachers.map(teacher => ({value: teacher.teacherId, label: teacher.fullName !== null ? (teacher.fullName).replace('-', ' ') : ' نامشخص '}))

  // ** Function in get data on search query change
  const handleFilter = val => {
    
  }

  const handlePerPage = (val) => {
    setRowsOfPage(val)
  }

  const handleQuery = (query) => {
    setQuery(query)
    setPageNumber(1)
  }

  useEffect(() => {
    refetch()
  }, [SortType || SortingCol || Query || PageNumber || RowsOfPage || Accept || Teacher])

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(CourseComment?.totalCount / RowsOfPage)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={PageNumber !== 0 ? PageNumber - 1 : 0}
        onPageChange={(page) => setPageNumber(page.selected + 1)}
        pageClassName={'page-item rtl'}
        nextLinkClassName={'page-link rtl'}
        nextClassName={'page-item next rtl'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {

    if(isLoading || isFetching){
      return []
    }
    else if(CourseComment?.length > 0) {
      return CourseComment
    } else if (CourseComment?.length === 0) {
      return []
    } else {
      return CourseComment?.comments.slice(0, RowsOfPage)
    }
  }

  const handleSort = (val) => {
    if(val.value === 2){
      setIsActiveUser(true)
      setIsDeletedUser(false)
    }
    else if(val.value === 3){
      setIsActiveUser(false)
      setIsDeletedUser(true)
    }
  }

  return (
    <>
       <Card>
        <CardHeader>
          <CardTitle tag='h4'>فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='6'>
              <Label for='role-select'> وضعیت نظرات </Label>
              <Select
                isClearable={false}
                value={Accept}
                options={AcceptOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                    setPageNumber(1)
                    setAccept(data)
                }}
              />
            </Col>
            <Col md='6'>
              <Label for='role-select'> استاد دوره </Label>
              <Select
                isClearable={false}
                value={Teacher}
                options={TeacherOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                    setPageNumber(1)
                    setTeacher(data)
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
            <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            progressPending={isLoading || isFetching}
            progressComponent={<Spinner className='my-5' />}
            noDataComponent={<div style={{padding: '20px'}}> نظری ثبت نشده است </div>}
            subHeaderComponent={
              <CustomHeader
                handleFilter={handleFilter}
                handleQuery={handleQuery}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                rowsPerPage={RowsOfPage}
              />
            }
          />
        </div>
      </Card> 
      <AddCardExample show={show} setShow={setShow} selectedItem={selectedItem} />
      <UpdateCommentCourse show={show2} setShow={setShow2} selectedItem={selectedItem2} refetch={refetch} />
    </>
  )
}

export default UsersList
