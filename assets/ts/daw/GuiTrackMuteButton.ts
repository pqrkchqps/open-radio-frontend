export { GuiTrackMuteButton };

class GuiTrackMuteButton {
  private x;
  private y;
  private width;
  private height;
  private guiSongData;
  private guiTrack;
  private muteImage;
  private unmuteImage;

  constructor(guiSongData, guiTrack) {
    this.x = 0;
    this.width = guiTrack.getTRACK_CONTROL_BTNS_WIDTH();
    this.height = 60;
    this.muteImage = new Image();
    this.muteImage.src = "/assets/images/mute_icon.jpg";
    this.unmuteImage = new Image();
    this.unmuteImage.src = "/assets/images/unmute_icon.jpg";
    this.guiSongData = guiSongData;
    this.guiTrack = guiTrack;
  }
  setY() {
    console.log(this.guiTrack.getYTrackPosition());
    this.y = this.guiTrack.getYTrackPosition() + 60;
  }
  draw() {
    this.setY();
    if (this.guiTrack.getIsMute()) {
      this.guiSongData
        .getCanvasCtx()
        .drawImage(this.unmuteImage, this.x, this.y, this.width, this.height);
    } else {
      this.guiSongData
        .getCanvasCtx()
        .drawImage(this.muteImage, this.x, this.y, this.width, this.height);
    }
  }
  mouseWasClicked(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      this.guiTrack.setIsMute(!this.guiTrack.getIsMute());
      this.draw();
    }
  }
}
