import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import WizardHorizontal from './WizardHorizontal'

const Wizard = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <WizardHorizontal />;
        </Col>
      </Row>
    </Fragment>
  )
}
export default Wizard
