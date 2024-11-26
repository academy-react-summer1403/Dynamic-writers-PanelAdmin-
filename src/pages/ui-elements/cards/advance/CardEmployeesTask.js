// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Avatar Imports
import avatar1 from '@src/assets/images/portrait/small/avatar-s-1.jpg'
import avatar9 from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import avatar13 from '@src/assets/images/portrait/small/avatar-s-13.jpg'
import avatar20 from '@src/assets/images/portrait/small/avatar-s-20.jpg'
import avatar16 from '@src/assets/images/portrait/small/avatar-s-16.jpg'
import { useQuery } from 'react-query'
import { GetTotalCount } from '../../../../core/Services/api/User/GetTotalCount'
import { user } from '@nextui-org/react'
import jMoment from 'jalali-moment'
import { useNavigate } from 'react-router-dom'

const CardEmployeesTasks = ({ colors, trackBgColor }) => {
  const {data: users} = useQuery({queryKey: ['GetUsersList'], queryFn: GetTotalCount})

  const employeesTasks = users?.listUser.map(user => ({
    id: user.id,
    avatar: user.pictureAddress !== 'Not-set' && user.pictureAddress !== null ? user.pictureAddress : '',
    title: user.fname === null || user.lname === null ? ' نامشخص ' : (user.fname + ' ' + user.lname),
    subtitle: user.phoneNumber,
    time: jMoment(user.insertDate).locale('fa').format('jD jMMMM jYYYY'),
    chart: {
      type: 'radialBar',
      series: [user.profileCompletionPercentage],
      height: 30,
      width: 30,
      options: {
        grid: {
          show: false,
          padding: {
            left: -15,
            right: -15,
            top: -12,
            bottom: -15
          }
        },
        colors: [colors.primary.main],
        plotOptions: {
          radialBar: {
            hollow: {
              size: '22%'
            },
            track: {
              background: trackBgColor
            },
            dataLabels: {
              showOn: 'always',
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        stroke: {
          lineCap: 'round'
        }
      }
    }
  }))

  const navigate = useNavigate() 

  const renderTasks = () => {
    return employeesTasks?.map(task => {
      return (
        <div key={task.title} className='employee-task d-flex justify-content-between align-items-center'>
          <div className='d-flex cursor-pointer' onClick={() => navigate(`/user/view/${task.id}`)}>
            <Avatar className='me-75' img={task.avatar} alt='' imgHeight='42' imgWidth='42' />
            <div className='my-auto'>
              <h6 className='mb-0'>{task.title}</h6>
              <small>{task.subtitle}</small>
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <small className='text-muted me-75'>{task.time}</small>
            <Chart
              options={task.chart.options}
              series={task.chart.series}
              type={task.chart.type}
              height={task.chart.height}
              width={task.chart.width}
            />
          </div>
        </div>
      )
    })
  }

  return (
    <Card className='card-employee-task'>
      <CardHeader>
        <CardTitle tag='h4'> قدیمی ترین کاربران </CardTitle>
      </CardHeader>
      <CardBody>{renderTasks()}</CardBody>
    </Card>
  )
}

export default CardEmployeesTasks
