// MainComponentWithTabs.js
import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import GroupListCourse from './GroupListCourse';
import CourseUserList from './CourseUserList';

const Tabs = ({ id, Course }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTab('1')}
          >
            گروه ها
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggleTab('2')}
          >
            کاربران
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <GroupListCourse Course={Course} />
        </TabPane>
        <TabPane tabId="2">
          <CourseUserList id={id} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
