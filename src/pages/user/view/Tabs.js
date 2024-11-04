// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import Notifications from './Notifications'

const UserTabs = ({ user }) => {
  return (
    <Fragment>
        <TabPane tabId='4'>
          <Notifications user={user} />
        </TabPane>
    </Fragment>
  )
}
export default UserTabs
