import React from "react";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../Contexts/ThemeContext";
import Button from "./Button";

import { RiSunFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { GoStack } from "react-icons/go";
import { RxArchive } from "react-icons/rx";
import { PiMoonStars } from "react-icons/pi";
import { AiOutlineGithub } from "react-icons/ai";

function HeaderWrapper({ onLogout }) {
  const location = useLocation();
  const { locale, toggleLocale } = React.useContext(LocaleContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <header className="header">
      <div className="top">
        <div className="link-container">
          <a href="https://github.com/WahyuIndG" title="Creator Github">
            <AiOutlineGithub />
          </a>
          <Button
            onSubmitHandler={toggleLocale}
            Icon={null}
            title={locale === "en" ? "Languange" : "Bahasa"}
          >
            {locale === "en" ? "ID" : "EN"}
          </Button>
        </div>
        <h1>Notes App</h1>
        <div className="link-container">
          <Button
            onSubmitHandler={toggleTheme}
            Icon={theme === "light" ? PiMoonStars : RiSunFill}
            title={locale === "en" ? "Theme" : "Tema"}
          >
            {null}
          </Button>
          <Button
            onSubmitHandler={onLogout}
            Icon={TbLogout}
            title={locale === "en" ? "Logout" : "Keluar"}
          >
            {null}
          </Button>
        </div>
      </div>
      <ul className="nav">
        <NavLink activeLink={location.pathname} Icon={GoStack} path="/">
          {locale === "en" ? "Your Tasks" : "Catatan Mu"}
        </NavLink>
        <NavLink
          activeLink={location.pathname}
          Icon={RxArchive}
          path="/archive"
        >
          {locale === "en" ? "Archive" : "Arsip"}
        </NavLink>
      </ul>
    </header>
  );
}

export default HeaderWrapper;

HeaderWrapper.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
