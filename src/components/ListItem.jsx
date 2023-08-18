import React from "react";
import Item from "./Item";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

export default function ListItem({ notes, isHome }) {
  const { locale } = React.useContext(LocaleContext);

  if (!notes.length) {
    return (
      <>
        {isHome ? (
          <>
            <div className="add-item" style={{ margin: "40px 50px" }}>
              <Link to={"/add"}>
                <FiPlus />
                <span>{locale === "en" ? "New Note" : "Buat Baru"}</span>
              </Link>
            </div>
            <p className="not-found">
              {locale === "en" ? "Notes is Empty 🤔" : "Catatan Kosong 🤔"}
            </p>
          </>
        ) : (
          <p className="not-found">
            {locale === "en" ? "Notes is Empty 🤔" : "Catatan Kosong 🤔"}
          </p>
        )}
      </>
    );
  }

  return (
    <div className="list">
      {isHome && (
        <div className="add-item">
          <Link to={"/add"}>
            <FiPlus />
            <span>{locale === "en" ? "New Note" : "Buat Baru"}</span>
          </Link>
        </div>
      )}
      {notes.map((note) => {
        return (
          <Link to={`/detail-page/${note.id}`} key={note.id}>
            <Item {...note} />
          </Link>
        );
      })}
    </div>
  );
}

ListItem.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  isHome: PropTypes.bool,
};
