import React, { useRef, useEffect, useState } from "react";

const AudioPlayer = ({ audioList }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState(null);

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
    console.log(src, title);
    setSelectedAudio({ src, title });
  };

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} />
      <div className="audio-selector">
        <select value={selectedAudio || ""} onChange={handleAudioSelection}>
          <option value="">Select an audio</option>
          {audioList.map((audio, index) => (
            <option key={index} value={audio.title + "," + audio.src}>
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
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={playbackSpeed}
        onChange={handleSpeedChange}
      />
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
  );
};

export default AudioPlayer;
