import React, { Component } from "react";

import Previewer from "../TabEditor/Previewer/Previewer";
import PinBtn from "../TabEditor/PinBtn/PinBtn";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TabPreviewerWithRouter = (props) => {
  const router = useRouter();
  const authUser = useSelector((state) => state.auth.user);
  return <TabPreviewer {...props} router={router} authUser={authUser} />;
};

class TabPreviewer extends Component {
  backToEditor = () => {
    this.props.setIsPreview(false);
  };

  save = () => {
    window.print();
  };

  render() {
    console.log(this.state);

    const { headerForm, editorForm, isExistData, audios, author } =
      this.props.state;
    const { scoreId, deleteAudio, authUser } = this.props;
    return (
      <div className="ge-result">
        {isExistData ? (
          <div>
            <Previewer
              headerForm={headerForm}
              editorForm={editorForm}
              audios={audios}
              deleteAudio={deleteAudio}
              scoreId={scoreId}
              author={author}
              isExistData={isExistData}
            />
          </div>
        ) : (
          <div className="ge-result-err">No data is to preview.</div>
        )}
        {authUser._id === author && (
          <PinBtn onClick={this.backToEditor} right={30} bottom={30}>
            Editor
          </PinBtn>
        )}
      </div>
    );
  }
}

export default TabPreviewerWithRouter;
