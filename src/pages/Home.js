// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import Earnings from '@src/pages/ui-elements/cards/analytics/Earnings'
import CardCong from '@src/pages/ui-elements/cards/advance/CardCongratulations'
import StatsCard from '@src/pages/ui-elements/cards/statistics/StatsCard'
import CardTransactions from '@src/pages/ui-elements/cards/advance/CardTransactions'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import CardEmployeesTasks from './ui-elements/cards/advance/CardEmployeesTask'
import ProductOrders from './ui-elements/cards/analytics/ProductOrders'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** vars
  const trackBgColor = '#e9ecef'

  return (
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
