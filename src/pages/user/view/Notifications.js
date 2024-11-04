// ** Reactstrap Imports
import { useState } from 'react'
import { Card, CardTitle, CardBody, Table, Input, Button } from 'reactstrap'

const Notifications = ({ user }) => {

  const typesArr = [
    {
      title: 'دسترسی ها :',
      defaultChecked: [user.roles.map(role => role.roleName).includes('Student') ? 'Student' : '', user.roles.map(role => role.roleName).includes('Teacher') ? 'Teacher' : '', user.roles.map(role => role.roleName).includes('Administrator') ? 'Administrator' : '']
    },
  ]

  const [currentRole, setCurrentRole] = useState({id: 0, })

  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-50' tag='h4'>
          دسترسی
        </CardTitle>
        <p className='mb-0'> برای تغییر دسترسی کاربر تیک آبی دسترسی را فعال کنید </p>
      </CardBody>
      <Table className='text-nowrap text-center border-bottom' responsive>
        <thead>
          <tr>
            <th className='text-start'>#</th>
            <th> دانشجو </th>
            <th> استاد </th>
            <th> ادمین </th>
          </tr>
        </thead>
        <tbody>
          {typesArr.map((type, index) => {
            return (
              <tr key={index}>
                <td className='text-start'>{type.title}</td>
                <td>
                  <div className='d-flex form-check justify-content-center'>
                    <Input type='checkbox' defaultChecked={type.defaultChecked.includes('Student')} />
                  </div>
                </td>
                <td>
                  <div className='d-flex form-check justify-content-center'>
                    <Input type='checkbox' defaultChecked={type.defaultChecked.includes('Teacher')} />
                  </div>
                </td>
                <td>
                  <div className='d-flex form-check justify-content-center'>
                    <Input type='checkbox' defaultChecked={type.defaultChecked.includes('Administrator')} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <CardBody>
        <Button className='me-1' color='primary'>
          تایید
        </Button>
      </CardBody>
    </Card>
  )
}

export default Notifications
