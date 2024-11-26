// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardImg, Badge, CardTitle } from 'reactstrap'

// ** Images
import coverImg from '@src/assets/images/banner/banner-12.jpg'
import profileImg from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { useQuery } from 'react-query'
import { GetProfileAdmin } from '../../../../core/Services/api/Navbar/GetProfileAdmin'
import { getItem } from '../../../../core/Services/common/storage'
import jMoment from 'jalali-moment'

const CardProfile = () => {
  const {data} = useQuery({queryKey: ['GetProfileAdmin'], queryFn: GetProfileAdmin})
  const roles = JSON.parse(getItem('roles'))

  return (
    <Card className='card-profile'>
      <CardTitle style={{background: 'rgb(243, 243, 243)', width: '100%', height: '120px',}} top />
      <CardBody>
        <div className='profile-image-wrapper'>
          <div className='profile-image'>
            <Avatar img={data?.currentPictureAddress} />
          </div>
        </div>
        <h3>{data?.fName} {data?.lName}</h3>
        <h6 className='text-muted'> {data?.userAbout} </h6>
        {roles.map(role => <Badge className='profile-badge' style={{marginRight: '2px'}} color='light-primary'>
            {role}
        </Badge>)}
        <hr className='mb-2' />
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h6 className='text-muted fw-bolder'> وضعیت حساب </h6>
            <h4 className='mb-0'> {data?.profileCompletionPercentage}% </h4>
          </div>
          <div>
            <h6 className='text-muted fw-bolder'> جنسیت </h6>
            <h4 className='mb-0'> {data?.gender ? 'زن' : 'مرد'} </h4>
          </div>
          <div>
            <h6 className='text-muted fw-bolder'> سال تولد </h6>
            <h4 className='mb-0'> {jMoment(data?.birthDay).locale('fa').format('jYYYY')} </h4>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardProfile
