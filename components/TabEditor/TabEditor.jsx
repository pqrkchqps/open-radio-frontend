import React, { Component } from "react";

// Import custom components
import HeaderForm from "./HeaderForm/HeaderForm";
import Editor from "./Editor/Editor";
import Previewer from "./Previewer/Previewer";
import Helper from "./Helper/Helper";

// Import global css styles
//import "./assets/css/global.module.css";

// Import dataSource value
import defaultValues from "./assets/dataSource/editor";
import axios from "axios";
import { useRouter } from "next/router";
import { AlertTypes, openAlert } from "../../store/alert";
import { useDispatch } from "react-redux";

const TabEditorWithRouter = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return <TabEditor {...props} router={router} dispatch={dispatch} />;
};

class TabEditor extends Component {
  // Get the previewer DOM
  getPreviewerRef = (previewer) => {
    this.previewer = previewer;
  };

  // Preview the result
  preview = () => {
    this.props.setIsPreview(true);
  };

  save = () => {
    const { headerForm, editorForm } = this.props.state;
    const scorePromise = axios.post("/scores", {
      headerForm: JSON.stringify(headerForm),
      editorForm: JSON.stringify(editorForm),
    });
    scorePromise.then((response) => {
      console.log(response);
      if (response.data.msg) {
        this.props.dispatch(
          openAlert({ type: AlertTypes.Error, message: response.data.msg })
        );
      } else {
        this.props.dispatch(
          openAlert({ type: AlertTypes.Info, message: "Score Saved" })
        );
        this.props.router.push(`/scores/${response.data._id}`);
      }
    });
  };

  update = () => {
    const { headerForm, editorForm } = this.props.state;
    const scorePromise = axios.patch("/scores", {
      headerForm: JSON.stringify(headerForm),
      editorForm: JSON.stringify(editorForm),
      _id: this.props.scoreId,
    });
    scorePromise.then((response) => {
      console.log(response);
      if (response.data.msg) {
        this.props.dispatch(
          openAlert({ type: AlertTypes.Error, message: response.data.msg })
        );
      } else {
        this.props.dispatch(
          openAlert({ type: AlertTypes.Info, message: "Score Updated" })
        );
      }
    });
  };

  render() {
    const { headerForm, editorForm, isShowHelper, audios, author } =
      this.props.state;
    const {
      handleEditorForm,
      handleHeaderForm,
      toggleHelper,
      scoreId,
      deleteAudio,
    } = this.props;
    return (
      <div className="ge-home">
        {/*Header form*/}
        <header>
          <HeaderForm
            form={headerForm}
            onChange={handleHeaderForm}
            preview={this.preview}
            tips={toggleHelper}
            save={this.save}
            update={this.update}
            isSaved={!!scoreId}
            scoreId={scoreId}
            audios={audios}
            deleteAudio={deleteAudio}
            author={author}
          ></HeaderForm>
        </header>

        {/*Editor*/}
        <div className="ge-edit-container">
          <Editor form={editorForm} onChange={handleEditorForm}></Editor>

          {/*Previewer*/}
          <Previewer
            isEdit={true}
            previewerRef={this.getPreviewerRef}
            headerForm={headerForm}
            editorForm={editorForm}
          ></Previewer>
        </div>

        {/*Helper*/}
        <div style={{ visibility: isShowHelper ? "visible" : "hidden" }}>
          <Helper toggleHelper={toggleHelper} />
        </div>
      </div>
    );
  }
}

export default TabEditorWithRouter;
