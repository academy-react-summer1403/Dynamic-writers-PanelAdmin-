// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, File } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useQuery } from 'react-query'
import { GetCourseTotal } from '../../../../core/Services/api/Course/GetCourseTotal'
import { GetTotalActiveNews } from '../../../../core/Services/api/New/GetTotalAvtiveNews'
import { GetTotalCount } from '../../../../core/Services/api/User/GetTotalCount'
import { GetCoursePayments } from '../../../../core/Services/api/Payment/GetCoursePayments'
import { Link } from 'react-router-dom'

const StatsCard = ({ cols }) => {
  const {data: CourseTotal} = useQuery({queryKey: ['GetCourseTotal'], queryFn: GetCourseTotal})
  const {data: NewsTotal} = useQuery({queryKey: ['GetNewTotal'], queryFn: GetTotalActiveNews})
  const {data: UsersTotal} = useQuery({queryKey: ['GetUserTotal'], queryFn: GetTotalCount})
  const {data: PaymentsTotal} = useQuery({queryKey: ['GetPaymentTotal'], queryFn: () => GetCoursePayments('0ed74730-9012-ef11-b6c2-f4b229435c5d')})

  const data = [
    {
      title: CourseTotal?.totalCount,
      subtitle: ' دوره ها ',
      color: 'light-primary',
      icon: <File size={24} />,
      path: '/courses/list'
    },
    {
      title: UsersTotal?.totalCount,
      subtitle: ' کاربران ',
      color: 'light-info',
      icon: <User size={24} />,
      path: '/user/list'
    },
    {
      title: NewsTotal?.totalCount,
      subtitle: ' اخبار و مقالات ',
      color: 'light-danger',
      icon: <Box size={24} />,
      path: '/News/list'
    },
    {
      title: PaymentsTotal?.length,
      subtitle: ' پرداختی ها ',
      color: 'light-success',
      icon: <DollarSign size={24} />,
      path: '/payments'
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar tag={Link} to={item.path} color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'> آمار </CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'> آخرین و جدیدترین آمار </CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
