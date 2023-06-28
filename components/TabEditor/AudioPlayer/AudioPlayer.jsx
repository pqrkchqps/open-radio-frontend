import React, { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";

const AudioPlayer = ({ audios, scoreId, deleteAudio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState(null);

  console.log(audios);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (selectedAudio) {
      audioElement.src = selectedAudio.src;
      audioElement.load();
    }

    // Update playback speed
    audioElement.playbackRate = playbackSpeed;

    // Set loop section
    audioElement.loop = loopEnd > 0;
    audioElement.loopStart = loopStart;
    audioElement.loopEnd = loopEnd;

    // Start playing audio
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [isPlaying, playbackSpeed, loopStart, loopEnd, selectedAudio]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
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
    const updatedScore = await axios.delete(
      `/scores/${scoreId}/audios/${audioId}`,
      {
        data: {
          publicId,
        },
      }
    );
    deleteAudio(audioId);
    setSelectedAudio(null);
    console.log(updatedScore);
  };

  console.log(selectedAudio);
  return (
    <div className="audio-player-container">
      <audio ref={audioRef} />
      <div className="audio-selector">
        <select value={selectedAudio || ""} onChange={handleAudioSelection}>
          <option value="">Select an audio</option>
          {audios.map((audio, index) => (
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
          <h3>Selected Audio:</h3>
          <p>{selectedAudio.title}</p>
        </div>
      )}
      <Button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</Button>{" "}
      <Button onClick={handleDelete}>Delete</Button>
      <div>
        <label>
          Speed:
          <input
            type="number"
            max="2"
            step="0.5"
            value={playbackSpeed}
            onChange={handleSpeedChange}
          />
        </label>
        <label>
          Loop Start:
          <input
            type="number"
            step="0.1"
            value={loopStart}
            onChange={handleLoopStartChange}
          />
        </label>
        <label>
          Loop End:
          <input
            type="number"
            step="0.1"
            value={loopEnd}
            onChange={handleLoopEndChange}
          />
        </label>
      </div>
    </div>
  );
};

export default AudioPlayer;
