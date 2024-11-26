// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'
import { useQuery } from 'react-query'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { GetTotalCount } from '../../../../core/Services/api/User/GetTotalCount'

const CardTransactions = () => {
  const {data: roles} = useQuery({queryKey: ['GetRoles'], queryFn: GetTotalCount})

  const icons = {
    Student: Icon.User,
    Administrator: Icon.Slack,
    Teacher: Icon.Settings,
    CourseAssistance: Icon.UserCheck,
    Support: Icon.Sunset,
    TournamentAdmin: Icon.Command,
    Referee: Icon.RefreshCcw
  }

  const colors = {
    Student: 'light-primary',
    Administrator: 'light-danger',
    Teacher: 'light-success',
    CourseAssistance: 'light-warning',
    Support: 'light-secondary',
    TournamentAdmin: 'light-info',
    Referee: 'light-primary'
  }

  const transactionsArr = roles?.roles.map(role => ({
    title: role.roleName,
    color: colors[`${role.roleName}`] || 'light-warning',
    amount: (Math.floor(Math.random() * 100) + 1),
    Icon: icons[`${role.roleName}`] || Icon.HelpCircle,
    down: Math.random() < 0.5
  }))

  const renderTransactions = () => {
    return transactionsArr?.map(item => {
      return (
        <div key={item.title} className='transaction-item'>
          <div className='d-flex'>
            <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
            <div>
              <h6 className='transaction-title'>{item.title}</h6>
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'> دسترسی ها </CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
