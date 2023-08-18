import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchBox({ defaultKey, onSearchHandler }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <div className="search-box">
      <BiSearchAlt />
      <input
        type="text"
        placeholder={locale === "en" ? "Search here ..." : "Cari disini ..."}
        value={defaultKey}
        onChange={(e) => onSearchHandler(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;

SearchBox.propTypes = {
  defaultKey: PropTypes.string,
  onSearchHandler: PropTypes.func,
};
