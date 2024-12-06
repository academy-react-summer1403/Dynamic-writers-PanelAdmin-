import { Button, Card, CardHeader } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import jMoment from 'jalali-moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useState } from 'react'
import AddModalFileSession from './AddModalFileSession'
import { useQuery } from 'react-query'
import { GetHomeWorkSession } from '../../core/Services/api/Session/GetHomeWorkSession'
import AddModalHomeWork from './AddModalHomeWork'

const UserProjectsList = ({ data, refetch }) => {

  const [show, setShow] = useState(false) 
  const [selectedItem, setSelectedItem] = useState(null) 

  const [show2, setShow2] = useState(false) 
  const [selectedItem2, setSelectedItem2] = useState(null) 

  const {data: homeWorks, refetch: refetch2} = useQuery({queryKey: ['GetHomeWorkSession', data.scheduleSessionId], queryFn: () => GetHomeWorkSession(data.scheduleSessionId)})

  const columns = [
    {
      sortable: true,
      width: '500px',
      name: 'فایل',
      selector: row => row.title,
      cell: row => {
        return (
          <div className='d-flex justify-content-left cursor-pointer align-items-center' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{row.fileName}.{row.fileFormat}</span>
              <small className='text-muted' style={{height: '20px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{row.fileAddress}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'تاریخ فایل',
      selector: row => jMoment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')
    },
  ]

  const columns2 = [
    {
      sortable: true,
      width: '500px',
      name: 'تکلیف',
      selector: row => row.title,
      cell: row => {
        return (
          <div className='d-flex justify-content-left cursor-pointer align-items-center' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{row.hwTitle}</span>
              <small className='text-muted' style={{height: '20px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{row.hwDescribe}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'تاریخ تکلیف',
      selector: row => jMoment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')
    },
  ]

  return (
    <>
    <Card>
      <CardHeader className='d-flex justify-content-between' style={{justifyItems: 'center'}}> 
        <h4> تکالیف و فایل ها:  </h4>
        <div className='d-flex gap-1'>
          <Button color='primary' style={{height: '40px'}} onClick={() => {setShow(true), setSelectedItem(data)}}> ساخت فایل جدید </Button>
          <Button color='primary' style={{height: '40px'}} onClick={() => {setShow2(true), setSelectedItem2(data)}}> ساخت تکلیف جدید </Button>
        </div>
      </CardHeader>

      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns2}
          data={homeWorks}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{padding: '20px'}}> فایلی موجود نمی باشد </div>}
        />
      </div>

      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.sessionFileDtos}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{padding: '20px'}}> تکلیفی موجود نمی باشد </div>}
        />
      </div>

    </Card>
    {show && <AddModalFileSession refetch={refetch} selectedItem={selectedItem} setShow={setShow} show={show} />}
    {show2 && <AddModalHomeWork refetch={refetch2} selectedItem={selectedItem2} setShow={setShow2} show={show2} />}
    </>
  )
}

export default UserProjectsList
