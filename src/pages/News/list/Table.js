import { Fragment, useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Check, ChevronDown, FileText, MoreVertical, X } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
  Badge
} from 'reactstrap'

import Avatar from '@components/avatar'
import jMoment from 'jalali-moment'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link, useNavigate } from 'react-router-dom'
import ActiveNews from '../../../core/Services/api/New/ActiveNews'
import toast from 'react-hot-toast'

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
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              placeholder='جستجوی مقاله...'
              type='text'
              value={searchTerm}
              onChange={e => handleQuery(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' tag={Link} to='/News/add'>
              اضافه کردن مقاله جدید
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = ({ RowsOfPage, setRowsOfPage, PageNumber, setPageNumber, Query, setQuery, NewsList, isLoading, refetch, isFetching, refetchL, refetchA }) => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = useNavigate()

  const handleActiveNews = async (id, Active) => {
    const response = await ActiveNews(id, Active)
    if(response.success == true){
      toast.success(response.message)
      refetch()
      refetchA()
      refetchL()
    }
    else{
      toast.error(" عملیات ناموفق بود ")
    }
  }

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handlePerPage = (val) => {
    setRowsOfPage(val)
  }

  const handleQuery = (query) => {
    setQuery(query)
    setPageNumber(1)
  }

  useEffect(() => {
    refetch()
  }, [Query || PageNumber || RowsOfPage])

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(NewsList?.totalCount / RowsOfPage)

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

  const renderClient = row => {
    if (row.currentImageAddressTumb) {
      return <Avatar className='me-1' img={row.currentImageAddressTumb != null && row.currentImageAddressTumb} width='32' height='32' />
    } else {
      return (
        <Avatar
          style={{overflow: 'hidden', minWidth: '32px', height: '32px'}}
          initials
          className='me-1'
          color={row.currentImageAddressTumb || 'light-primary'}
          content={row.title || 'مقاله'}
        />
      )
    }
  }
  
  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  }

  const columns = [
    {
      name: 'نام مقاله',
      sortable: true,
      minWidth: '300px',
      sortField: 'fullName',
      selector: row => row.title,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center' style={{overflow: 'hidden'}}>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <div
              onClick={() => {row.isActive ? navigate(`/News/view/${row.id}`) : toast.error(' این مقاله فعال نیست ')}}
              className='user_name text-truncate text-body cursor-pointer'
            >
              <span className='fw-bolder'> {row.title ? (row.title) : 'نامشخص'} </span>
            </div>
            <small className='text-truncate text-muted mb-0' style={{height: '20px', overflow: 'hidden', width: '200px'}} >{row.miniDescribe}</small>
          </div>
        </div>
      )
    },
    {
      name: 'تاریخ بروزنسانی',
      sortable: true,
      minWidth: '172px',
      sortField: 'insertDate',
      selector: row => row.updateDate,
      cell: row => <span className='text-capitalize'> {jMoment(row.updateDate).locale('fa').format('jD jMMMM jYYYY')} </span>
    },
    {
      name: 'پخش کننده',
      minWidth: '230px',
      sortable: true,
      sortField: 'billing',
      selector: row => row.addUserFullName,
      cell: row => <span className='text-capitalize'> {row.addUserFullName.replace('-', ' ')} </span>
    },
    {
      name: 'وضعیت',
      minWidth: '138px',
      sortable: true,
      sortField: 'status',
      selector: row => row.statusName,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.isActive ? 'active' : 'pending']} pill>
          {row.isActive ? 'فعال' : 'غیر فعال'}
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
              {row.isActive ? <DropdownItem
                tag={Link}
                className='w-100'
                to={`/News/view/${row.id}`}
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'> مشخصات مقاله </span>
              </DropdownItem> : <DropdownItem
                className='w-100'
                onClick={() => {
                  handleActiveNews(row.id, true)
                }}
              >
                <Check size={14} className='me-50 text-success' />
                <span className='align-middle text-success'> فعال کردن </span>
              </DropdownItem>}
              {row.isActive && <DropdownItem
                onClick={() => {
                  handleActiveNews(row.id, false)
                }}
                className='w-100'
              >
                <X size={14} className='me-50 text-danger' />
                <span className='align-middle text-danger'> غیر فعال کردن </span>
              </DropdownItem>}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]
  

  // ** Table data to render
  const dataToRender = () => {

    if(isLoading || isFetching){
      return []
    }
    else if(NewsList?.news.length > 0) {
      return NewsList?.news
    } else if (NewsList?.news.length === 0) {
      return []
    } else {
      return NewsList?.news.slice(0, RowsOfPage)
    }
  }

  return (
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
            <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            progressPending={isLoading || isFetching}
            progressComponent={<Spinner className='my-5' />}
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<div style={{padding: '20px'}}>ملاقه ای موجود نمی باشد </div>}
            subHeaderComponent={
              <CustomHeader
                handleQuery={handleQuery}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                rowsPerPage={RowsOfPage}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UsersList
