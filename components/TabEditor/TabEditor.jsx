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
import { setTimeout } from "timers";

const TabEditorWithRouter = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return <TabEditor {...props} router={router} dispatch={dispatch} />;
};

class TabEditor extends Component {
  state = {
    // Basic information of this song
    headerForm: {
      song: "Untitled",
      singer: "Unknown",
      composer: "Unknown",
      isEmbedChord: false,
    },
    // Editor content
    editorForm: {
      content: defaultValues.content,
    },
    // State of helper
    isShowHelper: false,
  };

  componentDidMount() {
    if (this.props.scoreId) {
      const scorePromise = axios.get(`/scores/${this.props.scoreId}`);
      scorePromise.then((res) => {
        console.log(res);
        if (!res.data.msg) {
          this.setState({
            ...this.state,
            editorForm: {
              ...this.state.editorForm,
              ...JSON.parse(res.data.editorForm),
            },
            headerForm: {
              ...this.state.headerForm,
              ...JSON.parse(res.data.headerForm),
            },
          });
        } else {
          this.props.dispatch(
            openAlert({ type: AlertTypes.Error, message: res.data.msg })
          );

          setTimeout(() => {
            this.props.dispatch(
              openAlert({ type: AlertTypes.Info, message: "redirecting back" })
            );
          }, 1000);

          setTimeout(() => {
            this.props.router.back();
          }, 2000);
        }
      });
    }
  }

  // Header form onChange Handler
  handleHeaderForm = (headerForm) => {
    this.setState({ headerForm });
  };

  // Editor form onChange handler
  handleEditorForm = (content) => {
    this.setState({
      editorForm: {
        ...this.state.editorForm,
        content,
      },
    });
  };

  // Get the previewer DOM
  getPreviewerRef = (previewer) => {
    this.previewer = previewer;
  };

  // Toggle helper
  toggleHelper = () => {
    this.setState({
      isShowHelper: !this.state.isShowHelper,
    });
  };

  // Preview the result
  preview = () => {
    this.props.router.push({
      pathname: "/scores/previewer/" + this.props.scoreId,
    });
  };

  save = () => {
    const scorePromise = axios.post("/scores", {
      headerForm: JSON.stringify(this.state.headerForm),
      editorForm: JSON.stringify(this.state.editorForm),
    });
    scorePromise.then((response) => {
      console.log(response);
      this.props.router.push(`/scores/${response.data._id}`);
    });
  };

  update = () => {
    const scorePromise = axios.patch("/scores", {
      headerForm: JSON.stringify(this.state.headerForm),
      editorForm: JSON.stringify(this.state.editorForm),
      _id: this.props.scoreId,
    });
    scorePromise.then((response) => {
      console.log(response);
      //this.props.router.push(`/scores/${response.data._id}`);
    });
  };

  render() {
    const { headerForm, editorForm, isShowHelper } = this.state;
    return (
      <div className="ge-home">
        {/*Header form*/}
        <header>
          <HeaderForm
            form={headerForm}
            onChange={this.handleHeaderForm}
            preview={this.preview}
            tips={this.toggleHelper}
            save={this.save}
            update={this.update}
            isSaved={!!this.props.scoreId}
            scoreId={this.props.scoreId}
          ></HeaderForm>
        </header>

        {/*Editor*/}
        <div className="ge-edit-container">
          <Editor form={editorForm} onChange={this.handleEditorForm}></Editor>

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
          <Helper toggleHelper={this.toggleHelper} />
        </div>
      </div>
    );
  }
}

export default TabEditorWithRouter;
