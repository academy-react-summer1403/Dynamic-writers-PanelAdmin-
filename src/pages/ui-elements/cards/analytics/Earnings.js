// ** Third Party Components
import { useQuery } from '@tanstack/react-query'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'
import { GetCourseTotal } from '../../../../core/Services/api/Course/GetCourseTotal'
import { GetTotalActiveCourse } from '../../../../core/Services/api/Course/ActiveCoursesTotal'

const Earnings = ({ success }) => {
  const {data: courseTotal} = useQuery({queryKey: ['GetTotalCourse'], queryFn: GetCourseTotal})
  const {data: Actives} = useQuery({queryKey: ['GetActiveTotal'], queryFn: GetTotalActiveCourse})

  const ActiveS = courseTotal?.totalCount && Actives?.totalCount
  ? ((Actives.totalCount / courseTotal.totalCount) * 100).toFixed(0)
  : 0;

const RemoveS = courseTotal?.totalCount && Actives?.totalCount
  ? (((courseTotal.totalCount - Actives.totalCount) / courseTotal.totalCount) * 100).toFixed(0)
  : 0;

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [2, -3],
    stroke: { width: 0 },
    labels: ['فعال', 'غیرفعال'],
    colors: ['#3498db', '#ff9999'],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: ' فعال ',
              formatter() {
                return parseFloat(ActiveS) + ' %'
              }
            }
          }
        }
      }
    },
    responsive: [
  {
    breakpoint: 992,
    options: {
      chart: {
        height: 120
      }
    }
  }
]

  }

  return (
    <Card className='earnings-card'>
      <CardBody>
        <Row>
          <Col xs='6' className='d-flex justify-content-between' style={{flexDirection: 'column'}}>
            <CardTitle className='mb-1 font-bold'> وضعیت دوره ها </CardTitle>
            <div className='d-flex' style={{flexDirection: 'column'}}>
              <div className='font-small-1'>  تعداد دوره های ساخته شده توسط استاد ها <strong>  {courseTotal?.totalCount} دوره  </strong> است </div>
              <div className='font-small-1'> که تعداد دوره های فعال<strong> %{ActiveS} </strong>  است و <strong> %{RemoveS} </strong> آن غیر فعال است </div>
            </div>
          </Col>
          <Col xs='6'>
            <Chart options={options} series={[parseFloat(ActiveS), parseFloat(RemoveS)]} className='iranSans' type='donut' height={120} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Earnings
