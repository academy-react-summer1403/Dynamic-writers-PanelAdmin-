// ** Reactstrap Imports
import { Badge, Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Label Images
import xdLabel from '@src/assets/images/icons/brands/xd-label.png'
import vueLabel from '@src/assets/images/icons/brands/vue-label.png'
import htmlLabel from '@src/assets/images/icons/brands/html-label.png'
import reactLabel from '@src/assets/images/icons/brands/react-label.png'
import sketchLabel from '@src/assets/images/icons/brands/sketch-label.png'

import jMoment from 'jalali-moment'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import { useParams } from 'react-router-dom'

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'نام دوره',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
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

export const columnsReserve = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'نام دوره',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
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
    selector: row => jMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY')
  },
  {
    name: 'وضعیت دوره',
    selector: row => row,
    cell: row => {
      return (
        <Badge color={row.accept ? 'light-success' : 'light-warning'}> {row.accept ? 'تایید شده' : 'در حال انتظار'} </Badge>
      )
    }
  }
]

const UserProjectsList = () => {
  const {id} = useParams()
  
  const {data} = useQuery({queryKey: ['GetDetailUser'], queryFn: () => GetDetailUser(id)})

  return (
    <>
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
    </>
  )
}

export default UserProjectsList
