export { AudioSongData };

class AudioSongData {
  private audioCtx;
  private micStream;
  constructor() {
    this.audioCtx = new AudioContext();
    this.micStream = null;
  }
  getAudioCtx() {
    return this.audioCtx;
  }
  setMicStream(micStream) {
    this.micStream = micStream;
  }
}
