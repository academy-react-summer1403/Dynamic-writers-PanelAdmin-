import { Fragment, useState } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, MoreVertical, X,Edit2 } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
} from 'reactstrap'
import jMoment from 'jalali-moment'
import AddCard from './addAndEdit/AddCard'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Show from '../CategoryNews/show'

const CustomHeader = ({refetch}) => {

  const [Add, setAdd] = useState(false)
  const [information, setinformation] = useState({
    title:"",
    google:"",
    googleDesc:"",
    id:""
  })
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      {Add && <AddCard showValue={Add} setshowValue={setAdd} isEdit={false} information={information} refetch={refetch}/>}
      <Row>
        
        <Col
          xl='6'
          className='w-100 d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' onClick={()=>setAdd(true)}>
              اضافه کردن دسته بندی جدید
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = ({ NewsList, isLoading, refetch}) => {

  const RowsOfPage = 5
  const [PageNumber, setPageNumber] = useState(1)
  // ** States
  // ** Function to toggle sidebar
  const [show, setShow] = useState(false)
  const [detail, setdetail] = useState(false)
  const [informationForShow, setinformationForShow] = useState({
    title:"",
    google:"",
    googleDesc:"",
    insertDate:"",
    id:""
  })
  const [information, setinformation] = useState({
    title:"",
    google:"",
    googleDesc:"",
    id:""
  })

  const columns = [
    {
      name: 'نام دسته بندی',
      sortable: true,
      minWidth: '300px',
      sortField: 'fullName',
      cell: row => (
        <div className='d-flex justify-content-left align-items-center' style={{overflow: 'hidden'}}>
          <div className='d-flex flex-column'>
              <span className='fw-bolder'> {row.categoryName ? (row.categoryName) : 'نامشخص'} </span>
          </div>
        </div>
      )
    },
    {
      name: 'تاریخ بروزرسانی',
      sortable: true,
      minWidth: '172px',
      sortField: 'insertDate',
      selector: row => row.insertDate,
      cell: row => <span className='text-capitalize'> {jMoment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')} </span>
    },
    {
      name: 'عنوان در گوگل',
      minWidth: '600px',
      sortable: true,
      sortField: 'billing',
      selector: row => row.googleTitle,
      cell: row => <span className='text-capitalize text-nowrap text-truncate' style={{width:"600px"}}> {row.googleTitle} </span>
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
              <DropdownItem onClick={() =>{ setdetail(true);setinformationForShow({title:row.categoryName,google:row.googleTitle,googleDesc:row.googleDescribe,id:row.id,insertDate:row.insertDate})}} >
                <FileText size={14} className='me-50' />
                <span className='align-middle' > مشخصات دسته بندی </span>
              </DropdownItem>
              <DropdownItem
                 onClick={() =>{ setShow(true);setinformation({title:row.categoryName,google:row.googleTitle,googleDesc:row.googleDescribe,id:row.id})}}
                 className='w-100'>
                <Edit2 size={14} className='me-50 text-info' />
                <span className='align-middle text-info' > ویرایش دسته بندی </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]
  
  const dataToRender = () => {
    const reversedNewsList = [...NewsList].reverse()
    const start = (PageNumber - 1) * RowsOfPage
    const end = start + RowsOfPage
    return isLoading ? [] : reversedNewsList.slice(start, end)
  }
  
  
  const CustomPagination = () => {
    const count = Number(NewsList.length / RowsOfPage)

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

  return (
    <Fragment>
      {show && <AddCard showValue={show} setshowValue={setShow} isEdit={true} information={information} refetch={refetch}/>}
      {detail && <Show showValue={detail} setshowValue={setdetail} information={informationForShow}/>}
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
            <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            progressPending={isLoading}
            progressComponent={<Spinner className='my-5' />}
            paginationComponent={CustomPagination}
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            data={dataToRender()}
            noDataComponent={<div style={{padding: '20px'}}>دسته بندی موجود نمی باشد </div>}
            subHeaderComponent={
              <CustomHeader
              refetch={refetch}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UsersList
