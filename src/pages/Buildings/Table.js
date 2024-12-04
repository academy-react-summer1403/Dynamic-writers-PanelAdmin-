import { Fragment, useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Check, ChevronDown, Edit, FileText, MoreVertical, X } from 'react-feather'
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
import jMoment, { now } from 'jalali-moment'
import DetailModal from './DetailModal'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import AddOrEdit from './AddOrEdit'
import { ActiveBuilding } from './../../core/Services/api/Buildings/ActiveBuilding';

const CustomHeader = ({refetch}) => {
  const [Add, setAdd] = useState(false)
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        
        <Col
          xl='6'
          className='w-100 d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' onClick={()=>setAdd(true)}>
              اضافه کردن ساختمان جدید
              {Add && <AddOrEdit showValue={Add} setshowValue={setAdd} isEdit={false} refetch={refetch} information={{name:"",floor:"",latitude:null,longitude:null,workDate:Date.now()}}/>}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = ({ Buildings,refetchL,isLoading}) => {
  // ** States
  const [PageNumber, setPageNumber] = useState(1)
  const [Edit, setEdit] = useState(false)
  const RowsOfPage = 5
  const [detail, setdetail] = useState(null)

  const CustomPagination = () => {
    const count = Number(Buildings.length / 5)

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

  const DeActiveOrActive=async(id,bool)=>{
    await ActiveBuilding({"active":bool,"id":id})
    refetchL()

  }
  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  }

  const columns = [
    {
      name: 'نام ساختمان',
      sortable: true,
      minWidth: '300px',
      sortField: 'fullName',
      selector: row => row.buildingName,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center' style={{overflow: 'hidden'}}>
          <div className='d-flex flex-column'>
            <div
              className='user_name text-truncate text-body cursor-pointer'
            >
              {Edit==row.id && <AddOrEdit showValue={Edit} setshowValue={setEdit} isEdit={true} refetch={refetchL} information={row}/>}
              <span className='fw-bolder' onClick={()=>setEdit(row.id)}> {row.buildingName ? (row.buildingName) : 'نامشخص'} </span>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'تاریخ افزودن',
      sortable: true,
      minWidth: '172px',
      sortField: 'insertDate',
      selector: row => row.workDate,
      cell: row => <span className='text-capitalize'> {jMoment(row.workDate).locale('fa').format('jD jMMMM jYYYY')} </span>
    },
    {
      name: 'طبقه',
      minWidth: '230px',
      sortable: true,
      sortField: 'billing',
      selector: row => row.floor,
      cell: row => <span className='text-capitalize'> {row.floor} </span>
    },
    {
      name: 'وضعیت',
      minWidth: '138px',
      sortable: true,
      sortField: 'status',
      selector: row => row.active,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.active ? 'active' : 'pending']} pill>
          {row.active ? 'فعال' : 'غیر فعال'}
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
                className='w-100'
                onClick={()=>setdetail(row.id)}
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'> مشخصات مقاله </span>
                {row.id==detail && <DetailModal showValue={detail} setshowValue={setdetail} information={row}/>}

              </DropdownItem>
              {row.active==false ?  <DropdownItem
                className='w-100'
                onClick={()=>DeActiveOrActive(row.id,true)}
              >
                <Check size={14} className='me-50 text-success' />
                <span className='align-middle text-success'>  فعال کردن </span>
              </DropdownItem>: <DropdownItem
                className='w-100'
                onClick={()=>DeActiveOrActive(row.id,false)}
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
    const reversedBuildings = [...Buildings].reverse()
    const start = (PageNumber - 1) * RowsOfPage
    const end = start + RowsOfPage
    return isLoading ? [] : reversedBuildings.slice(start, end)
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
            progressPending={isLoading}
            progressComponent={<Spinner className='my-5' />}
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<div style={{padding: '20px'}}>ساختمان ای موجود نمی باشد </div>}
            subHeaderComponent={
              <CustomHeader
              refetch={refetchL}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UsersList
