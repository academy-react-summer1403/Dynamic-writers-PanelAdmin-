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
import { GetCourseList } from '../../../core/Services/api/Course/GetCourseList'
import { Link } from 'react-router-dom'

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
            <Button className='add-new-user' color='primary' tag={Link} to='/courses/new'>
              اضافه کردن دوره جدید
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

  const {data: CourseList, refetch, isLoading, isFetching} = useQuery({
    queryKey: ['GetCourseList', SortType, SortingCol, Query, PageNumber, RowsOfPage], 
    queryFn: () => GetCourseList(SortType, SortingCol, Query, PageNumber, RowsOfPage),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

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
  }, [SortType || SortingCol || Query || PageNumber || RowsOfPage])

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(CourseList?.totalCount / RowsOfPage)

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
    else if(CourseList?.courseDtos.length > 0) {
      return CourseList?.courseDtos
    } else if (CourseList?.courseDtos.length === 0) {
      return []
    } else {
      return CourseList?.courseDtos.slice(0, RowsOfPage)
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
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<div style={{padding: '20px'}}>دوره ای موجود نمی باشد </div>}
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

      <Sidebar toggleSidebar={toggleSidebar} open={sidebarOpen} />
    </Fragment>
  )
}

export default UsersList
