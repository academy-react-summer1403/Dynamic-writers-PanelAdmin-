import { Badge, Card, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, Progress, UncontrolledDropdown } from 'reactstrap'
import { Check, ChevronDown, MoreVertical } from 'react-feather'
import DataTable from 'react-data-table-component'
import Avatar from '@components/avatar'
import jMoment from 'jalali-moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import AcceptReserveMod from './AcceptReserveMod'

const UserProjectsList = () => {
  const {id} = useParams()

  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  
  const {data, refetch} = useQuery({queryKey: ['GetDetailUser'], queryFn: () => GetDetailUser(id)})

  const navigate = useNavigate()

  const columns = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'نام دوره',
      selector: row => row.title,
      cell: row => {
        return (
          <div  onClick={() => navigate(`/courses/view/${row.courseId}`)} className='d-flex justify-content-left cursor-pointer align-items-center'>
            <div className='avatar-wrapper'>
              <Avatar className='me-1' img={row.tumbImageAddress} alt={row.title} imgWidth='32' />
            </div>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{row.title}</span>
              <small className='text-muted' style={{height: '20px', overflow: 'hidden'}}>{row.describe}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'تاریخ دوره',
      selector: row => jMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY')
    }
  ]

  const columnsReserve = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'نام دوره',
      selector: row => row.title,
      cell: row => {
        return (
          <div onClick={() => navigate(`/courses/view/${row.courseId}`)} className='d-flex justify-content-left cursor-pointer align-items-center'>
            <div className='avatar-wrapper'>
              <Avatar className='me-1' img={row.tumbImageAddress} alt={row.courseName} imgWidth='32' />
            </div>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{row.courseName}</span>
              <small className='text-muted' style={{height: '20px', overflow: 'hidden'}}>{row.studentName}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'تاریخ دوره',
      selector: row => jMoment(row.reserverDate).locale('fa').format('jD jMMMM jYYYY')
    },
    {
      name: 'وضعیت دوره',
      selector: row => row,
      cell: row => {
        return (
          <Badge color={row.accept ? 'light-success' : 'light-warning'}> {row.accept ? 'تایید شده' : 'در حال انتظار'} </Badge>
        )
      }
    },
    {
      name: 'اکشن ها',
      minWidth: '100px',
      cell: row => (
        <div>
          <UncontrolledDropdown className='position-static'>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              {row.accept === false && <DropdownItem
                className='w-100'
                onClick={() => {
                          setShow(true)
                          setSelectedItem(row)
                }}
              >
                <Check size={14} className='me-50 text-success' />
                <span className='align-middle text-success'> قبول کردن </span>
              </DropdownItem>}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]

  return (
    <>
    <Card>
      <CardHeader tag='h4'> دوره های رزرو شده کاربر: </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columnsReserve}
          data={data.coursesReseves}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{padding: '20px'}}>دوره ای موجود نمی باشد </div>}
        />
      </div>
    </Card>
    <Card>
      <CardHeader tag='h4'> دوره های کاربر: </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.courses}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{padding: '20px'}}>دوره ای موجود نمی باشد </div>}
        />
      </div>
    </Card>
    {show && <AcceptReserveMod show={show} setShow={setShow} refetch={refetch} selectedItem={selectedItem} />}
    </>
  )
}

export default UserProjectsList
