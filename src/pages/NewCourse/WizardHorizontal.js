// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'مرحله 1',
      subtitle: 'مشخصات دوره',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'مرحله 2',
      subtitle: 'انواع مشخصات دوره ',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: 'مرحله 3',
      subtitle: 'جزِیات دوره',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: ' مرحله 4 ',
      subtitle: 'مشخصات آخر دوره',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
