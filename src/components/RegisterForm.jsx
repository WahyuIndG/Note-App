import React from "react";
import useInput from "../Hooks/useInput";
import { PropTypes } from "prop-types";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePencil,
} from "react-icons/hi";

import LocaleContext from "../contexts/LocaleContext";

export default function RegisterForm({ onSubmitHandler }) {
  const [name, setName] = useInput();
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const { locale } = React.useContext(LocaleContext);

  return (
    <form onSubmit={(e) => onSubmitHandler(e, { name, email, password })}>
      <label htmlFor="name">
        <i>
          <HiOutlinePencil />
        </i>
        <input
          type="text"
          id="name"
          value={name}
          onChange={setName}
          placeholder={locale === "en" ? "Sarah Cute" : "Jokowi Dodo"}
        />
      </label>
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
      <button>{locale === "en" ? "Register" : "Daftar"}</button>
    </form>
  );
}

RegisterForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
