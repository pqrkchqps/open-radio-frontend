import React, { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { AlertTypes, openAlert } from "../../../store/alert";
import { useDispatch, useSelector } from "react-redux";

const AudioPlayer = ({ audios, scoreId, deleteAudio, author }) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  console.log(authUser);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [shouldLoop, setshouldLoop] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [endTimeout, setEndTimeout] = useState(null);

  console.log(audios);

  useEffect(() => {
    clearTimeout(endTimeout);
    const audioElement = audioRef.current;

    if (selectedAudio) {
      audioElement.src = selectedAudio.src;
      audioElement.load();
    }

    // Update playback speed
    audioElement.playbackRate = playbackSpeed > 0 ? playbackSpeed : 0;

    // Set loop section
    audioElement.currentTime = loopStart > 0 ? loopStart : 0;
    audioElement.loopEnd = loopEnd > 0 ? loopStart : 0;

    // Start playing audio
    if (isPlaying) {
      audioElement.play();
      setPauseAndResetAtEndTimeout();
    } else {
      audioElement.pause();
    }

    function setPauseAndResetAtEndTimeout() {
      const timeout = setTimeout(function () {
        audioElement.currentTime = loopStart;
        if (shouldLoop) {
          audioElement.play();
          setPauseAndResetAtEndTimeout();
        } else {
          audioElement.pause();
          setIsPlaying(false);
        }
      }, (loopEnd - loopStart) * 1000);
      setEndTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playbackSpeed, loopStart, loopEnd, selectedAudio, shouldLoop]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
  };

  const handleLoopOnOff = (e) => {
    if (shouldLoop) {
      setIsPlaying(false);
    }
    setshouldLoop(!shouldLoop);
  };

  const handleLoopStartChange = (e) => {
    const start = parseFloat(e.target.value);
    setLoopStart(start);
  };

  const handleLoopEndChange = (e) => {
    const end = parseFloat(e.target.value);
    setLoopEnd(end);
  };

  const handleAudioSelection = (e) => {
    const values = e.target.value.split(",");
    const title = values[0];
    const src = values[1];
    const audioPublicId = values[2];
    const audioId = values[3];
    console.log(src, title, audioPublicId, audioId);
    setSelectedAudio({ src, title, audioPublicId, audioId });
  };

  const handleDelete = async () => {
    console.log(selectedAudio);
    const audioId = selectedAudio.audioId;
    const publicId = selectedAudio.audioPublicId;
    const updatedScore = await axios
      .delete(`/scores/${scoreId}/audios/${audioId}`, {
        data: {
          publicId,
        },
      })
      .then((response) => {
        if (response.data.msg) {
          dispatch(
            openAlert({ type: AlertTypes.Error, message: response.data.msg })
          );
        } else {
          deleteAudio(audioId);
          setSelectedAudio(null);
          this.props.dispatch(
            openAlert({ type: AlertTypes.Info, message: "Score Deleted" })
          );
        }
      });
    console.log(updatedScore);
  };

  console.log(selectedAudio);
  return (
    <div className="audio-player-container row">
      <div className="col">
        <audio ref={audioRef} />
        <div className="audio-selector">
          <select value={selectedAudio || ""} onChange={handleAudioSelection}>
            <option value="">Select an audio</option>
            {audios?.map((audio, index) => (
              <option
                key={index}
                value={
                  audio.title +
                  "," +
                  audio.audioUrl +
                  "," +
                  audio.audioPublicId +
                  "," +
                  audio._id
                }
              >
                {audio.title}
              </option>
            ))}
          </select>
        </div>
        {selectedAudio && (
          <div className="audio-display">
            <p>{selectedAudio.title}</p>
          </div>
        )}
      </div>
      {selectedAudio && (
        <div className="col">
          <div className="row">
            <label className="margin-side-5">
              Speed
              <input
                className="two-digit-input"
                type="number"
                max="2"
                step="0.5"
                value={playbackSpeed}
                onChange={handleSpeedChange}
              />
            </label>
            <label>
              Start
              <input
                className="four-digit-input"
                type="number"
                step="0.1"
                value={loopStart}
                onChange={handleLoopStartChange}
              />
            </label>
            <label>
              End
              <input
                className="four-digit-input"
                type="number"
                step="0.1"
                value={loopEnd}
                onChange={handleLoopEndChange}
              />
            </label>
            <Button onClick={handleLoopOnOff}>
              {shouldLoop ? "Loop On" : "Loop Off"}
            </Button>{" "}
          </div>
          <div className="row">
            <Button onClick={handlePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </Button>{" "}
            {author === authUser._id && (
              <Button onClick={handleDelete}>Delete</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
