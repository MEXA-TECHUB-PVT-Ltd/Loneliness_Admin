// ** React Imports
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

// ** Reactstrap Imports
import { UncontrolledTooltip } from "reactstrap";

// ** Icons Imports
import { Disc, X, Circle } from "react-feather";
import * as Icon from "react-feather";

// ** Config
import themeConfig from "@configs/themeConfig";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  getBookmarks,
  updateBookmarked,
  handleSearchQuery,
} from "@store/navbar";

// ** Custom Styles
import "./menu-header.css";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Vars
  const user = getUserData();
  const store = useSelector((state) => state.navbar);

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  // ** Loops through Bookmarks Array to return Bookmarks
  const renderBookmarks = () => {
    if (store.bookmarks.length) {
      return store.bookmarks.map((item) => {
        const IconTag = Icon[item.icon];
        return (
          <NavLink
            to={item.link}
            key={item.target}
            className="nav-link-bookmark"
          >
            <IconTag className="ficon" />
            <span className="bookmark-title">{item.title}</span>
          </NavLink>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-column w-100">
        <li className="nav-item me-auto">
          <NavLink
            to={user ? getHomeRouteForLoggedInUser("USER") : "/"}
            className="navbar-brand"
          >
            <span className="brand-logo">
              <img src={themeConfig.app.appLogoImage} alt="logo" />
            </span>
            <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          {/* <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X
              onClick={() => setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div> */}
        </li>
      </ul>
      <ul className="nav navbar-nav flex-column w-100 container-nav-link">
        {renderBookmarks()}
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
