import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavLink({ activeLink, path, Icon, children }) {
  return (
    <li>
      <Link to={path} className={activeLink === path ? "active" : ""}>
        <Icon /> <span>{children}</span>
      </Link>
    </li>
  );
}

NavLink.propTypes = {
  activeLink: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
