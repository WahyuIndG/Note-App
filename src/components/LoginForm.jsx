import React from "react";
import useInput from "../Hooks/useInput";
import { PropTypes } from "prop-types";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import LocaleContext from "../contexts/LocaleContext";

export default function LoginForm({ onSubmitHandler }) {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const { locale } = React.useContext(LocaleContext);

  return (
    <form onSubmit={(e) => onSubmitHandler(e, { email, password })}>
      <label htmlFor="email">
        <i>
          <HiOutlineMail />
        </i>
        <input
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          placeholder={
            locale === "en" ? "sarah@example.com" : "jokowi@.sampel.com"
          }
        />
      </label>
      <label htmlFor="password">
        <i>
          <HiOutlineLockClosed />
        </i>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder={
            locale === "en" ? "At least 6 characters" : "Minimal 6 karakter"
          }
        />
      </label>
      <button>{locale === "en" ? "Login" : "Masuk"}</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
