import React from "react";
import { Route, Routes } from "react-router-dom";

import HeaderWrapper from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";

import DetailPageWrapper from "./pages/DetailPage";
import AddPageWrapper from "./pages/AddPage";
import ArchivePageWrapper from "./pages/ArchivePage";
import HomePageWrapper from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import { putAccessToken, getUserLogged } from "./utils/api";

import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./Contexts/ThemeContext";

function App() {
  const [auth, setAuth] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  // Make state for localContextValue
  const [locale, setLocale] = React.useState(
    localStorage.getItem("locale") || "en"
  );
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  // Make toggle for localContextValue
  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "en" ? "id" : "en";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Seting up localContextValue using useMemo
  const localContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);
  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  async function loginSuccessHandler(accessToken) {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();

    if (!error) {
      setAuth(data);
    }
  }

  function logout() {
    setAuth(null);
    putAccessToken("");
  }

  // kondisi refresh page / pertama kali dirender / setelah dimount
  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuth(data);
      setInitializing(false);
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (initializing) {
    return <LoadingScreen />;
  }

  if (auth === null) {
    return (
      <>
        <ThemeContext.Provider value={themeContextValue}>
          <LocaleContext.Provider value={localContextValue}>
            <Routes>
              <Route
                path="/*"
                element={
                  <LoginPage loginSuccessHandler={loginSuccessHandler} />
                }
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      </>
    );
  }

  return (
    <>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localContextValue}>
          <HeaderWrapper onLogout={logout} />
          <Routes>
            <Route path="/" element={<HomePageWrapper />} />
            <Route path="/archive" element={<ArchivePageWrapper />} />
            <Route path="/detail-page/:id" element={<DetailPageWrapper />} />
            <Route path="/add" element={<AddPageWrapper />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
