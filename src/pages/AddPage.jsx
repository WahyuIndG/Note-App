import React from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";
import { addNote } from "../utils/api";
import { LuSend } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function AddPageWrapper() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  return <AddPage navigate={navigate} locale={locale} />;
}

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  async onSubmitHandler(e) {
    e.preventDefault();
    await addNote(this.state);
    this.props.navigate("/");
  }

  render() {
    return (
      <main>
        <form className="form">
          <div className="input-group">
            <label htmlFor="title">
              {this.props.locale === "en" ? "Title" : "Judul"}
            </label>
            <input
              type="text"
              placeholder={
                this.props.locale === "en"
                  ? "Take Care of Cute Shiba . . ."
                  : "Menjaga Shiba Yang Lucu . . . "
              }
              onChange={this.onTitleChangeHandler}
              value={this.state.title}
            />
          </div>
          <div className="input-group">
            <label htmlFor="desc">
              {this.props.locale === "en" ? "Description" : "Deskripsi"}
            </label>
            <textarea
              name="desc"
              cols="30"
              rows="10"
              placeholder={
                this.props.locale === "en"
                  ? "Something About Your Beloved Shiba . . ."
                  : "Hal Apa pun Tentang Shiba Tercinta . . ."
              }
              onChange={this.onBodyChangeHandler}
              value={this.state.body}
            ></textarea>
          </div>
          <div className="button-group">
            <Button onSubmitHandler={this.onSubmitHandler} Icon={LuSend}>
              Add It !
            </Button>
          </div>
        </form>
      </main>
    );
  }
}

export default AddPageWrapper;

AddPage.propTypes = {
  navigate: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};
