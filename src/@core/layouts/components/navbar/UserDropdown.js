// ** React Imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { handleLogout } from "@store/authentication";

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
  Lock,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import defaultImage from "@src/assets/images/avatars/avatar-blank.png";
import ChangePasswordModal from "./ChangePasswordModal";
import { getLocalToken } from "../../../../utility/getLocalToken";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const token = getLocalToken();
  // ** State
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultImage;

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {(userData && userData.user.email) || "John Doe"}
          </span>
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={toggleModal}>
          <Lock size={14} className="me-75" />
          <span className="align-middle">Change Password</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
      <ChangePasswordModal
        isOpen={modalOpen}
        toggle={toggleModal}
        token={token}
      />
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
