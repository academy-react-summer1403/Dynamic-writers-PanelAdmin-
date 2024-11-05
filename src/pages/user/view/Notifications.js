// ** Reactstrap Imports
import { useState } from 'react'
import { Card, CardTitle, CardBody, Table, Input, Button } from 'reactstrap'
import { AddRole } from '../../../core/Services/api/User/AddRole'
import toast from 'react-hot-toast'

const Notifications = ({ user }) => {

  const typesArr = [
    {
      title: 'دسترسی ها :',
      defaultChecked: [user.roles.map(role => role.roleName).includes('Student') ? 'Student' : '', user.roles.map(role => role.roleName).includes('Teacher') ? 'Teacher' : '', user.roles.map(role => role.roleName).includes('Administrator') ? 'Administrator' : '']
    },
  ]

  const changeRoles = async (status, roleId) => {
    const response = await AddRole(roleId, user.id, status)
    if(!response){
      toast.error(' دسترسی ویرایش نشد ')      
    }
    else if(response.success == true){
      toast.success(' دسترسی با موفقیت ویرایش شد ')
    }
  }

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
                    <Input type='checkbox' defaultChecked={type.defaultChecked.includes('Student')} onInput={(e) => {
                      if(e.target.checked == true){
                        changeRoles(true, 5)
                      }
                      else{
                        changeRoles(false, 5)
                      }
                    }} />
                  </div>
                </td>
                <td>
                  <div className='d-flex form-check justify-content-center'>
                    <Input type='checkbox' defaultChecked={type.defaultChecked.includes('Teacher')} onInput={(e) => {
                      if(e.target.checked == true){
                        changeRoles(true, 2)
                      }
                      else{
                        changeRoles(false, 2)
                      }
                    }} />
                  </div>
                </td>
                <td>
                  <div className='d-flex form-check justify-content-center'>
                    <Input type='checkbox' defaultChecked={type.defaultChecked.includes('Administrator')} onInput={(e) => {
                      if(e.target.checked == true){
                        changeRoles(true, 1)
                      }
                      else{
                        changeRoles(false, 1)
                      }
                    }} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Card>
  )
}

export default Notifications
