import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { AlertTypes, openAlert } from "../../store/alert";
import axios from "axios";
import TabPreviewerWithRouter from "../../components/TabPreviewer/TabPreviewer";
import TabEditorWithRouter from "../../components/TabEditor/TabEditor";
import { setTimeout } from "timers";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Seo";

export default function Score() {
  const router = useRouter();
  const scoreId = router.query.id as string;
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const [state, setState] = useState({
    // Basic information of this song
    headerForm: {
      song: "Song",
      singer: "Singer",
      composer: "Composer",
      isEmbedChord: false,
    },
    // Editor content
    editorForm: {},
    audios: [],
    isExistData: false,
    isShowHelper: false,
    author: null,
  });
  const [isPreview, setIsPreview] = useState(false);

  const deleteAudio = (audioId) => {
    const updatedAudios = state.audios.filter((audio) => audio._id !== audioId);
    setState({ ...state, audios: updatedAudios });
  };

  // Header form onChange Handler
  const handleHeaderForm = (headerForm) => {
    setState({ ...state, headerForm });
  };

  // Editor form onChange handler
  const handleEditorForm = (content) => {
    setState({
      ...state,
      editorForm: {
        ...state.editorForm,
        content,
      },
    });
  };

  // Toggle helper
  const toggleHelper = () => {
    setState({
      ...state,
      isShowHelper: !state.isShowHelper,
    });
  };

  useEffect(() => {
    if (scoreId) {
      const promise = axios.get("/scores/" + scoreId);
      promise.then((response) => {
        if (response.data.msg) {
          dispatch(
            openAlert({ type: AlertTypes.Error, message: response.data.msg })
          );

          setTimeout(() => {
            dispatch(
              openAlert({ type: AlertTypes.Info, message: "redirecting back" })
            );
          }, 1000);

          setTimeout(() => {
            router.back();
          }, 2000);
        } else {
          // eslint-disable-next-line prefer-const
          let { headerForm, editorForm, audios, author } = response.data;
          headerForm = JSON.parse(headerForm);
          editorForm = JSON.parse(editorForm);
          setState({
            ...state,
            headerForm,
            editorForm,
            audios,
            isExistData: true,
            author,
          });
        }
      });
    }
  }, []);

  return (
    <Layout hideRightSidebar hideLeftSidebar containerMaxWidth="md">
      <Seo title="Scores" />
      {authUser._id === state.author && !isPreview ? (
        <TabEditorWithRouter
          scoreId={scoreId}
          deleteAudio={deleteAudio}
          handleHeaderForm={handleHeaderForm}
          handleEditorForm={handleEditorForm}
          toggleHelper={toggleHelper}
          state={state}
          setIsPreview={setIsPreview}
        />
      ) : (
        <TabPreviewerWithRouter
          scoreId={scoreId}
          deleteAudio={deleteAudio}
          state={state}
          setIsPreview={setIsPreview}
        />
      )}
    </Layout>
  );
}
