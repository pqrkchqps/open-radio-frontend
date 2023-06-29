import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// Import custom styles
import "./styles.module.css";

// Import Parser
import Parser from "../Body/Parser";
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

export default class Header extends PureComponent {
  render() {
    const {
      headerForm,
      editorForm,
      audios,
      deleteAudio,
      isEdit,
      scoreId,
      author,
    } = this.props;

    // Parse meta data (Need to optimize later...)
    let metaData = Parser.parseMeta(editorForm.content);

    return (
      <div className="ge-previewer-header">
        {/* Name of this song */}
        <div className="ge-song-info">
          <h1>{headerForm.song}</h1>

          {/* Singer */}
          <section>
            <span className="ge-keyword">Performed by: </span>
            {headerForm.singer}
          </section>
          {/* Composer */}
          <section>
            <span className="ge-keyword">Composed by: </span>
            {headerForm.composer}
          </section>
        </div>
        <div className="ge-meta">
          <table>
            <tbody>
              {metaData.map((data, index) => (
                <tr key={index}>
                  <td>{data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isEdit && (
          <AudioPlayer
            audios={audios}
            deleteAudio={deleteAudio}
            scoreId={scoreId}
            author={author}
          />
        )}
      </div>
    );
  }
}

Header.propTypes = {
  headerForm: PropTypes.object,
  editorForm: PropTypes.object,
};

Header.defaultProps = {
  headerForm: {
    song: "",
    singer: "",
    composer: "",
  },
  editorForm: {
    content: "",
  },
};
