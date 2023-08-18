import React, { Children } from "react";
import PropTypes from "prop-types";

export default function Button({ Icon, onSubmitHandler, children, title }) {
  console.log(children);
  if (Icon === null) {
    return (
      <button className="button" onClick={onSubmitHandler} title={title}>
        {children}
      </button>
    );
  } else if (children === null) {
    return (
      <button className="button" onClick={onSubmitHandler} title={title}>
        <Icon />
      </button>
    );
  } else {
    return (
      <button className="button" onClick={onSubmitHandler} title={title}>
        <Icon /> <span>{children}</span>
      </button>
    );
  }
}

Button.propTypes = {
  Icon: PropTypes.func, // fungsi dr Icon bukan Elemen alias Object
  children: PropTypes.string,
  title: PropTypes.string,
  onSubmitHandler: PropTypes.func.isRequired,
};
