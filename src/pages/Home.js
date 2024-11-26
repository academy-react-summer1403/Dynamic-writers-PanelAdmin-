// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col, Spinner } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import Earnings from '@src/pages/ui-elements/cards/analytics/Earnings'
import CardCong from '@src/pages/ui-elements/cards/advance/CardCongratulations'
import CardMeetup from '@src/pages/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/pages/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/pages/ui-elements/cards/analytics/GoalOverview'
import CardTransactions from '@src/pages/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/pages/ui-elements/cards/advance/CardBrowserState'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import CardEmployeesTasks from './ui-elements/cards/advance/CardEmployeesTask'
import CardProfile from './ui-elements/cards/advance/CardProfile'
import { useQuery } from '@tanstack/react-query'
import { GetTotalCount } from '../core/Services/api/User/GetTotalCount'
import Customers from './ui-elements/cards/analytics/Customers'
import ProductOrders from './ui-elements/cards/analytics/ProductOrders'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  const {data, isLoading} = useQuery({queryKey: ['GetUserList', GetTotalCount]})

  // ** vars
  const trackBgColor = '#e9ecef'

  return (
    // isLoading ? <div className='d-flex justify-content-center my-200'> <Spinner size={18} /> </div> : 
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardCong />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='12' xs='12'>
          <ProductOrders
            primary={colors.primary.main}
            warning={colors.warning.main}
            danger={colors.danger.main}
          />
        </Col>
        <Col lg='6' md='12'>
          <Row className='match-height'>
            <Col lg='12' md='12' xs='12'>
              <Earnings success={colors.success.main} />
            </Col>
          </Row>
          <Col lg='12' md='12' xs='12'>
          <CardEmployeesTasks colors={colors} trackBgColor={trackBgColor} />
          </Col>
        </Col>
        <Col lg='6' md='12' xs='12'>
          <CardTransactions />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
