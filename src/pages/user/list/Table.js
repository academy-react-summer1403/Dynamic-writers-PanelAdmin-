// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useQuery } from '@tanstack/react-query'
import { GetUserList } from '../../../core/Services/api/User/GetUserList'

// ** Table Header
const CustomHeader = ({ toggleSidebar, handlePerPage, handleQuery, rowsPerPage, handleFilter, searchTerm }) => {

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
            <label className='mb-0' htmlFor='search-invoice'>
              جستجو:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleQuery(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              اضافه کردن کاربر جدید
            </Button>
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [IsActiveUser, setIsActiveUser] = useState (null)
  const [IsDeletedUser, setIsDeletedUser] = useState(null)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'انتخاب کنید' })
  const [currentStatus, setCurrentStatus] = useState({ value: null, label: 'انتخاب کنید' })
  const [currentSort, setCurrentSort] = useState({ value: '', type: '', label: 'انتخاب کنید' })

  const {data: userList, refetch, isLoading, isFetching} = useQuery({
    queryKey: ['GetUserList', SortType, SortingCol, Query, PageNumber, RowsOfPage, IsActiveUser, IsDeletedUser, currentRole], 
    queryFn: () => GetUserList(SortType, SortingCol, Query, PageNumber, RowsOfPage, IsActiveUser, IsDeletedUser, currentRole),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: 'ادمین' },
    { value: 2, label: 'استاد' },
    { value: 3, label: 'کارمند ادمین' },
    { value: 4, label: 'کارمند نویسنده' },
    { value: 5, label: 'دانشجو' }
  ]

  const statusOptions = [
    { value: '', label: 'انتخاب کنید' },
    { value: 2, label: 'کاربران فعال' },
    { value: 3, label: 'کاربران حذف شده' },
  ]

  const SortOptions = [
    { value: '', type: '' ,  label: 'انتخاب کنید' },
    { value: 'DESC', type: 'InsertDate' , label: ' جدید ترین ' },
    { value: 'ASC', type: 'InsertDate' , label: ' قدیمی ترین ' },
  ]

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
  }, [SortType || SortingCol || Query || PageNumber || RowsOfPage || IsActiveUser || IsDeletedUser || currentRole])

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(userList?.totalCount / RowsOfPage)

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
    else if(userList?.listUser.length > 0) {
      return userList?.listUser
    } else if (userList?.listUser.length === 0) {
      return []
    } else {
      return userList?.listUser.slice(0, RowsOfPage)
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
     {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div>
       <Card>
        <CardHeader>
          <CardTitle tag='h4'>فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>دسترسی</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setPageNumber(1)
                  setCurrentRole(data)
                }}
              />
            </Col>
            <Col md='4'>
              <Label for='role-select'>تاریخ ورود</Label>
              <Select
                isClearable={false}
                value={currentSort}
                options={SortOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                    setPageNumber(1)
                    setSortType(data.value)
                    setSortingCol(data.type)
                    setCurrentSort(data)
                }}
              />
            </Col>
            <Col md='4'>
              <Label for='status-select'>وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setPageNumber(1)
                  setCurrentStatus(data)
                  handleSort(data)
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
            noDataComponent={<div style={{padding: '20px'}}>دوره ای موجود نمی باشد </div>}
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
      <Sidebar toggleSidebar={toggleSidebar} open={sidebarOpen} />
    </div>}
    </>
  )
}

export default UsersList
