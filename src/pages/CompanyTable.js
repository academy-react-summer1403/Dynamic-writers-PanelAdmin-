import Avatar from '@components/avatar'
import { Table, Card } from 'reactstrap'
import { TrendingUp, TrendingDown, Check, X } from 'react-feather'
import { useQuery } from 'react-query'
import { GetCourseTotal } from '../core/Services/api/Course/GetCourseTotal'
import jMoment from 'jalali-moment'
import { useNavigate } from 'react-router-dom'

const CompanyTable = () => {

  const {data: courses} = useQuery({queryKey: ['GetCourseList'], queryFn: GetCourseTotal})

  const data = courses?.courseDtos.map(course => ({
    id: course.courseId,
    img: course.tumbImageAddress,
    title: course.title,
    describe: course.describe,
    color: course.isActive,
    icon: course.isActive ? <Check size={18} /> : <X size={18} />,
    levelName: course.levelName,
    fullName: course.fullName.replace('-', ' '),
    lastUpdate: jMoment(course.lastUpdate).locale('fa').format('jD jMMMM jYYYY'),
    revenue: parseInt(course.cost).toLocaleString('en-US'),
    sales: '97',
    salesUp: true
  }))

  const navigate = useNavigate()

  const renderData = () => {
    return data?.map(col => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className='text-success' />
      ) : (
        <TrendingDown size={15} className='text-danger' />
      )

      return (
        <tr key={col.name}>
          <td onClick={() => navigate(`/courses/view/${col.id}`)} className='cursor-pointer'>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  <img src={col.img} alt={''} style={{minWidth: '40px', minHeight: '40px', borderRadius: '50%', background: 'gray'}} />
                </div>
              </div>
              <div>
                <div className='fw-bolder' style={{maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{col.title}</div>
                <div className='font-small-2 text-muted' style={{maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{col.describe}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <Avatar className='me-1' color={col.color ? 'light-success' : 'light-danger'} icon={col.icon} />
              <span style={{whiteSpace: 'nowrap'}}>{col.color ? ' فعال ' : ' غیر فعال '}</span>
            </div>
          </td>
          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='fw-bolder mb-25' style={{maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{col.fullName}</span>
              <span className='font-small-2 text-muted'>در {col.lastUpdate}</span>
            </div>
          </td>
          <td style={{minWidth: '150px'}}>  {col.revenue} <small className='font-small-1'> تومان </small> </td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive hover>
        <thead>
          <tr>
            <th> عنوان دوره </th>
            <th> وضعیت </th>
            <th> استاد </th>
            <th> قیمت </th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
