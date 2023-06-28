import React, { Component } from "react";

import Previewer from "../TabEditor/Previewer/Previewer";
import PinBtn from "../TabEditor/PinBtn/PinBtn";
import { useRouter } from "next/router";
import axios from "axios";

const TabPreviewerWithRouter = (props) => {
  const router = useRouter();
  return <TabPreviewer {...props} router={router} />;
};

class TabPreviewer extends Component {
  state = {
    // Basic information of this song
    headerForm: {},
    // Editor content
    editorForm: {},
    audios: [],
    isExistData: false,
  };

  deleteAudio = (audioId) => {
    const updatedAudios = this.state.audios.filter(
      (audio) => audio._id !== audioId
    );
    this.setState({ ...this.state, audios: updatedAudios });
  };

  componentDidMount() {
    const promise = axios.get("/scores/" + this.props.scoreId);
    promise.then((response) => {
      let { headerForm, editorForm, audios } = response.data;
      headerForm = JSON.parse(headerForm);
      editorForm = JSON.parse(editorForm);
      this.setState({
        ...this.state,
        headerForm,
        editorForm,
        audios,
        isExistData: true,
      });
    });
  }

  back = () => {
    this.props.router.back();
  };

  save = () => {
    window.print();
  };

  render() {
    console.log(this.state);
    const { headerForm, editorForm, audios, isExistData } = this.state;

    return (
      <div className="ge-result">
        {isExistData ? (
          <div>
            <Previewer
              headerForm={headerForm}
              editorForm={editorForm}
              audios={audios}
              deleteAudio={this.deleteAudio}
              scoreId={this.props.scoreId}
            />
          </div>
        ) : (
          <div className="ge-result-err">No data is to preview.</div>
        )}
        <PinBtn onClick={this.back} right={30} bottom={30}>
          Back
        </PinBtn>
      </div>
    );
  }
}

export default TabPreviewerWithRouter;
