/* eslint-disable indent */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RxArchive } from "react-icons/rx";
import { FiTrash2 } from "react-icons/fi";
import { getNote, archiveNote, deleteNote, unarchiveNote } from "../utils/api";
import { getRandomColor, getLetter } from "../utils/local-data";
import Button from "../components/Button";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import LoadingScreen from "../components/LoadingScreen";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  return <DetailPage id={id} navigate={navigate} locale={locale} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      letter: "",
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  componentDidMount() {
    getNote(this.props.id).then(({ data }) => {
      this.setState(() => {
        console.log(data);
        return {
          note: data,
          letter: getLetter(data.title),
        };
      });
    });
  }

  async onArchiveHandler() {
    await archiveNote(this.state.note.id);
    this.props.navigate("/");
  }

  async onUnarchiveHandler() {
    await unarchiveNote(this.state.note.id);
    this.props.navigate("/");
  }

  async onDeleteHandler() {
    await deleteNote(this.state.note.id);
    this.props.navigate("/");
  }

  render() {
    const color = getRandomColor();

    return (
      <main>
        {this.state.note === null ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="detail-container">
              <div className="input-group" style={{ backgroundColor: color }}>
                <span style={{ color }} className="mini-box">
                  {this.state.letter}
                </span>
                <h1>{this.state.note.title}</h1>
              </div>
              <div className="input-group">
                <p style={{ minHeight: "10rem" }}>{this.state.note.body}</p>
              </div>
              <div className="button-group">
                <Button
                  id={this.state.note.id}
                  onSubmitHandler={
                    this.state.note.archived
                      ? this.onUnarchiveHandler
                      : this.onArchiveHandler
                  }
                  Icon={RxArchive}
                >
                  {this.props.locale === "en"
                    ? this.state.note.archived
                      ? "Unarchive It"
                      : "Archive It"
                    : this.state.note.archived
                    ? "Batal Arsip"
                    : "Arsipkan"}
                </Button>
                <Button
                  id={this.state.note.id}
                  onSubmitHandler={this.onDeleteHandler}
                  Icon={FiTrash2}
                >
                  {this.props.locale === "en" ? "Delete !" : "Hapus !"}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    );
  }
}

export default DetailPageWrapper;

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};
