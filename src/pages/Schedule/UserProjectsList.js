import { Button, Card, CardHeader } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import jMoment from 'jalali-moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useState } from 'react'
import AddModalFileSession from './AddModalFileSession'

const UserProjectsList = ({ data, refetch }) => {

  const [show, setShow] = useState(false) 
  const [selectedItem, setSelectedItem] = useState(null) 

  const columns = [
    {
      sortable: true,
      maxWidth: '400px',
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

  return (
    <>
    <Card>
        <CardHeader className='d-flex justify-content-between' style={{justifyItems: 'center'}}> 
          <h4> فایل های جلسه:  </h4>
          <Button color='primary' style={{height: '40px'}} onClick={() => {setShow(true), setSelectedItem(data)}}> ساخت فایل جدید </Button>
        </CardHeader>

      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.sessionFileDtos}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{padding: '20px'}}> فایلی موجود نمی باشد </div>}
        />
      </div>
    </Card>
    {show && <AddModalFileSession refetch={refetch} selectedItem={selectedItem} setShow={setShow} show={show} />}
    </>
  )
}

export default UserProjectsList
