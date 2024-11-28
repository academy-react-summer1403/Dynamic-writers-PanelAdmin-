import React from 'react'
import { Col, Row } from 'reactstrap'
import { AddRole } from '../../../core/Services/api/User/AddRole'
import toast from 'react-hot-toast'
import { Aperture, AtSign, Book, Briefcase, Clock, Command, Cpu, Edit, GitBranch, User } from 'react-feather'
import '@styles/base/pages/page-blog.scss'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { useQuery } from '@tanstack/react-query'
import { GetTotalCount } from '../../../core/Services/api/User/GetTotalCount'

const Notifications = ({ user, refetch }) => {

  const {data, refetch: refetchData} = useQuery({queryKey: ['GetUserList'], queryFn: GetTotalCount})

  const roleIcons = [
    <Aperture />,
    <Book/>,
    <Command/>,
    <Edit/>,
    <User/>,
    <GitBranch/>,
    <Clock/>,
    <Briefcase/>,
    <Cpu/>,
    <AtSign/>
  ]

  const addRole = async (status, roleId) => {
    const response = await AddRole(roleId, user.id, status)
    if(response.success == true) {
      toast.success(' عملیات با موفقیت انجام شد ')
      refetch()
      refetchData()
    }
  }

  return (
    <>
      <Row className='d-flex'>
        {data?.roles.map((role, index) => {
          return <Col className='cursor-pointer w-50' key={index} onClick={() => user.roles.map(role => role.id).includes(role.id) ? addRole(false, role.id) : addRole(true, role.id) }>
              <StatsHorizontal
                color={user.roles.map(role => role.id).includes(role.id) ? 'success' : 'danger'}
                statTitle={role.roleName}
                icon={roleIcons[role.id - 1]}
              />
            </Col>
        })}
      </Row>
    </>
  )
}

export default Notifications
