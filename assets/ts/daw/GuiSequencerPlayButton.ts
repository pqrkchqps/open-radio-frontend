import { playSongService } from "./PlaySongService";
import { stopSongService } from "./StopSongService";

export { GuiSequencerPlayButton };

class GuiSequencerPlayButton {
  private x;
  private y;
  private width;
  private height;
  private guiSongData;
  private audioSongData;
  private audioTracks;
  private playImage;
  private stopImage;

  constructor(guiSongData, audioSongData, audioTracks) {
    this.x = 0;
    this.y = 0;
    this.width = 90;
    this.height = 90;
    this.guiSongData = guiSongData;
    this.audioSongData = audioSongData;
    this.audioTracks = audioTracks;
    this.playImage = new Image();
    this.playImage.src = "/assets/images/play_icon.jpg";
    this.stopImage = new Image();
    this.stopImage.src = "/assets/images/stop_icon.jpg";
  }

  draw() {
    if (this.guiSongData.getIsPlaying()) {
      this.guiSongData
        .getCanvasCtx()
        .drawImage(this.stopImage, this.x, this.y, this.width, this.height);
    } else {
      this.guiSongData
        .getCanvasCtx()
        .drawImage(this.playImage, this.x, this.y, this.width, this.height);
    }
  }
  mouseWasClicked(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      if (this.guiSongData.getIsPlaying()) {
        this.guiSongData.setIsPlaying(false);
        console.log("stop");
        stopSongService(this.audioTracks);
        this.draw();
      } else {
        this.guiSongData.setIsPlaying(true);
        console.log("playing");
        playSongService(this.audioSongData, this.audioTracks);
        this.draw();
      }
    }
  }
}
