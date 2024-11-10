// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

import Notifications from './Notifications'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab, user, refetch, isLoading }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'> دوره ها </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'> دسترسی ها </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList user={user} />
          {/* <UserTimeline /> */}
        </TabPane>
        <TabPane tabId='2'>
          <Notifications isLoading={isLoading} refetch={refetch} user={user} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
