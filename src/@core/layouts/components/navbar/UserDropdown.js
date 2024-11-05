// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Database,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Spinner,
} from "reactstrap";

import { useQuery } from '@tanstack/react-query'

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { GetProfileAdmin } from "../../../../core/Services/api/Navbar/GetProfileAdmin";
import { removeItem } from "../../../../core/Services/common/storage";

const UserDropdown = () => {
  const {data, isLoading} = useQuery({queryKey: ['GetProfileAdmin'], queryFn: GetProfileAdmin})
  
  const navigate = useNavigate()

  const logOut = () => {
    removeItem('token')
    navigate('/login')
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item iranSans">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold iranSans" style={{fontSize: '16px', color: 'dimGray'}}> {data?.fName} {data?.lName} </span>
          <span className="user-status">ادمین</span>
        </div>
        <Avatar
          img={(data?.currentPictureAddress)}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to="/">
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/">
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/">
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/">
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem> */}
        {/* <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/pages/"
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/">
          <User size={14} className="me-75" />
          <span className="align-middle"> پروفایل </span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/">
          <Database size={14} className="me-75" />
          <span className="align-middle"> داشبورد </span>
        </DropdownItem>
        <DropdownItem className="w-100 text-danger" onClick={logOut}>
          <Power size={14} className="me-75" />
          <span className="align-middle"> خروج از حساب کاربری </span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
