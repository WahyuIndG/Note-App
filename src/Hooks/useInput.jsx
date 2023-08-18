import React from "react";

export default function useInput(defaultValue = "") {
  const [value, setValue] = React.useState(defaultValue);

  function onValueChangeHandler(event) {
    setValue(event.target.value);
  }

  return [value, onValueChangeHandler];
}
