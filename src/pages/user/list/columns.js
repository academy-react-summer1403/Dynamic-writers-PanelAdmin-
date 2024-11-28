import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { Slack, User, Settings, Edit2, MoreVertical, FileText, Trash2, UserCheck, Command, Sunset } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import jMoment from 'jalali-moment'
import { DeleteUser } from '../../../core/Services/api/User/DeleteUser'
import toast from 'react-hot-toast'

const renderClient = row => {
  if (row.pictureAddress) {
    return <Avatar className='me-1' img={row.pictureAddress != "Not-set" && row.pictureAddress} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.pictureAddress || 'light-primary'}
        content={row.fname || 'John Doe'}
      />
    )
  }
}

const renderRole = row => {
  const roleObj = {
    Student: {
      class: 'text-primary',
      icon: User
    },
    Administrator: {
      class: 'text-danger',
      icon: Slack
    },
    Teacher: {
      class: 'text-warning',
      icon: Settings
    },
    CourseAssistance: {
      class: 'text-success',
      icon: UserCheck
    },
    Support: {
      class: 'text-danger',
      icon: Sunset
    },
    TournamentAdmin: {
      class: 'text-info',
      icon: Command
    }
  }

  const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.userRoles] ? roleObj[row.userRoles].class : ''} me-50`} />
      {row.userRoles}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'نام کاربر',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.fname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/user/view/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'> {row.fname ? row.fname : 'نامشخص'} {row.lname} </span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.gmail}</small>
        </div>
      </div>
    )
  },
  {
    name: 'دسترسی',
    sortable: true,
    minWidth: '172px',
    maxWidth: '200px',
    sortField: 'role',
    selector: row => row.userRoles,
    cell: row => renderRole(row)
  },
  {
    name: 'تاریخ ورود',
    sortable: true,
    sortField: 'insertDate',
    selector: row => row.insertDate,
    cell: row => <span className='text-capitalize'> {jMoment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')} </span>
  },
  {
    name: 'جنیست',
    sortable: true,
    maxWidth: '150px',
    sortField: 'billing',
    selector: row => row.gender,
    cell: row => <span className='text-capitalize'>{row.gender ? 'زن' : 'مرد'}</span>
  },
  {
    name: 'وضعیت',
    sortable: true,
    maxWidth: '150px',
    sortField: 'status',
    selector: row => row.active,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.active ? 'active' : 'pending']} pill>
        {row.active ? 'فعال' : 'حذف شده'}
      </Badge>
    )
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
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/user/view/${row.id}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'> مشخصات کاربر </span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              className='w-100'
              onClick={async (e) => {
                e.preventDefault()
                const response = await DeleteUser(row.id)
                if(!response){
                  toast.error(' فقط ادمین اصلی دسترسی به حذف کاربر را دارد! ')
                }
                else if(response.success === true){
                  toast.success(' حذف انجام شد ')
                }
                else{
                  toast.error(' فقط ادمین اصلی دسترسی به حذف کاربر را دارد! ')
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
