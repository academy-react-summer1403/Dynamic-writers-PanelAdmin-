// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { MoreVertical, FileText } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// Jalalli
import jMoment from 'jalali-moment'

// ** Renders Client Columns
const renderClient = row => {
  if (row.tumbImageAddress) {
    return <Avatar className='me-1' img={row.tumbImageAddress != null && row.tumbImageAddress} width='32' height='32' />
  } else {
    return (
      <Avatar
        style={{overflow: 'hidden'}}
        initials
        className='me-1'
        color={row.tumbImageAddress || 'light-primary'}
        content={row.title || 'دوره'}
      />
    )
  }
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'نام دوره',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.title,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center' style={{overflow: 'hidden'}}>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/courses/view/${row.courseId}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'> {row.title ? (row.title) : 'نامشخص'} </span>
          </Link>
          <small className='text-truncate text-muted mb-0' style={{height: '20px', overflow: 'hidden', width: '200px'}} >{row.describe}</small>
        </div>
      </div>
    )
  },
  {
    name: 'تاریخ بروزنسانی',
    sortable: true,
    minWidth: '172px',
    sortField: 'insertDate',
    selector: row => row.lastUpdate,
    cell: row => <span className='text-capitalize'> {jMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY')} </span>
  },
  {
    name: 'نوع دوره',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.typeName,
    cell: row => <span className='text-capitalize'> {row.typeName} </span>
  },
  {
    name: 'قیمت دوره',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.cost,
    cell: row => <span className='text-capitalize'> {(parseInt(row.cost).toLocaleString('en-US'))} تومان </span>
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
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/courses/view/${row.courseId}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'> مشخصات دوره </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
