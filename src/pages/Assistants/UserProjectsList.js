import { Badge, Button, Card, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, Progress, UncontrolledDropdown } from 'reactstrap'
import { Check, ChevronDown, MoreVertical } from 'react-feather'
import DataTable from 'react-data-table-component'
import jMoment from 'jalali-moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { GetDetailAssistants } from '../../core/Services/api/Assistants/GetDetailAssistant'
import ModalAddWorkAssistant from '../WorkAssistants/ModalAddWorkAssistant'

const UserProjectsList = () => {
  const {id} = useParams()

  const {data, refetch} = useQuery({queryKey: ['GetDetailAssistant', id], queryFn: () => GetDetailAssistants(id)})

  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const columns = [
    {
      sortable: true,
      maxWidth: '200px',
      name: 'نام فعالیت',
      selector: row => row.title,
      cell: row => {
        return (
          <div className='d-flex justify-content-left cursor-pointer align-items-center' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{row.worktitle}</span>
              <small className='text-muted' style={{height: '20px', overflow: 'hidden'}}>{row.workDescribe}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'نام دوره',
      selector: row => row.courseName
    },
    {
      name: 'تاریخ فعالیت',
      selector: row => jMoment(row.workDate).locale('fa').format('jD jMMMM jYYYY')
    }
  ]

  return (
    <>
    <Card>
        <CardHeader className='d-flex justify-content-between' style={{justifyItems: 'center'}}> 
          <h4> فعالیت های کاربر:  </h4>
          <Button color='primary' style={{height: '40px'}} onClick={() => setShow(true)}> ساخت فعالیت جدید </Button>
        </CardHeader>

      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.assistanceWorkDtos}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{padding: '20px'}}> فعالیتی موجود نمی باشد </div>}
        />
      </div>
    </Card>
    {show && <ModalAddWorkAssistant show={show} setShow={setShow} selectedAssistant={data.courseAssistanceDto} refetch={refetch} />}
    </>
  )
}

export default UserProjectsList
