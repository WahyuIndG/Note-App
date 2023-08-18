/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { login } from "../utils/api";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { PropTypes } from "prop-types";

import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../Contexts/ThemeContext";
import Button from "../components/Button";

import { PiMoonStars } from "react-icons/pi";
import { RiSunFill } from "react-icons/ri";

export default function LoginPage({ loginSuccessHandler }) {
  const { locale, toggleLocale } = React.useContext(LocaleContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  async function onSubmitHandler(e, user) {
    e.preventDefault();
    const { error, data } = await login(user);

    if (!error) {
      loginSuccessHandler(data.accessToken);
    }
  }

  return (
    <main className="login-page">
      <header className="login-page__header">
        <Button
          onSubmitHandler={toggleLocale}
          Icon={null}
          title={locale === "en" ? "Languange" : "Bahasa"}
        >
          {locale === "en" ? "ID" : "EN"}
        </Button>
        <Button
          onSubmitHandler={toggleTheme}
          Icon={theme === "light" ? PiMoonStars : RiSunFill}
          title={locale === "en" ? "Theme" : "Tema"}
        >
          {null}
        </Button>
      </header>
      <div className="form-wrapper">
        <h1>{locale === "en" ? "Welcome Back !" : "Selamat Datang Kembali"}</h1>
        <p>
          {locale === "en"
            ? "Knowledge is the prey and taking notes is the way to hold it"
            : "Pengetahuan adalah mangsa dan mencatat adalah cara untuk mempertahankannya"}
        </p>
        <LoginForm onSubmitHandler={onSubmitHandler} />
        <p>
          {locale === "en"
            ? "Don't you have an account?"
            : "Sudahkah kamu memiliki akun?"}{" "}
          <Link to="/register">{locale === "en" ? "Sing Up" : "Daftar"}</Link>
        </p>
      </div>
    </main>
  );
}

LoginPage.propTypes = {
  loginSuccessHandler: PropTypes.func.isRequired,
};
