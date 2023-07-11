import { AudioMessages } from "./AudioMessages";

export { AudioTrack };

class AudioTrack {
  private playAudioMessages;
  private stopAudioNodes;
  private guiSongData;
  private audioBuffer;
  private guiTrack;
  private isMute;
  private isSolo;

  constructor(guiSongData, audioBuffer) {
    this.playAudioMessages = new AudioMessages(guiSongData, this);
    this.stopAudioNodes = [];
    this.guiSongData = guiSongData;
    this.audioBuffer = audioBuffer;
    this.isMute = false;
    this.isSolo = false;
  }

  getIsMute = () => {
    return this.isMute;
  };

  setIsMute = (isMute) => {
    this.isMute = isMute;
  };

  getIsSolo = () => {
    return this.isSolo;
  };

  setIsSolo = (isSolo) => {
    this.isSolo = isSolo;
  };

  getAudioBufferDuration() {
    return this.audioBuffer.duration;
  }
  getAudioBuffer() {
    return this.audioBuffer;
  }
  getPlayAudioMessage(position) {
    return this.playAudioMessages.getAudioMessage(position);
  }
  createPlayAudioMessage(position) {
    this.playAudioMessages.createAudioMessage(position);
  }
  removePlayAudioMessage(position) {
    this.playAudioMessages.removeAudioMessage(position);
  }
  getPlayAudioMessages() {
    return this.playAudioMessages.getAudioMessages();
  }
  createStopAudioNode(audioNode) {
    this.stopAudioNodes.push(audioNode);
  }
  getStopAudioNodes() {
    return this.stopAudioNodes;
  }
  clearStopAudioNodes() {
    this.stopAudioNodes = [];
  }
}
