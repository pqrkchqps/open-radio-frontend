import { stopSongService } from "./StopSongService";

export { GuiSequencerStopButton };

class GuiSequencerStopButton {
  private x;
  private y;
  private width;
  private height;
  private guiSongData;
  private audioTracks;
  private image;

  constructor(guiSongData, audioTracks) {
    this.x = 0;
    this.y = 0;
    this.width = 90;
    this.height = 90;
    this.guiSongData = guiSongData;
    this.audioTracks = audioTracks;
    this.image = new Image();
    this.image.src = "/assets/images/stop_icon.jpg";
  }

  draw() {
    this.guiSongData
      .getCanvasCtx()
      .drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  mouseWasClicked(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      stopSongService(this.audioTracks);
      this.guiSongData.setIsPlaying(false);
    }
  }
}
