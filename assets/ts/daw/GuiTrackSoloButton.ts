export { GuiTrackSoloButton };

class GuiTrackSoloButton {
  private x;
  private y;
  private width;
  private height;
  private guiSongData;
  private guiTrack;
  private unSoloImage;
  private isSoloImage;

  constructor(guiSongData, guiTrack) {
    this.x = 0;
    this.width = guiTrack.getTRACK_CONTROL_BTNS_WIDTH();
    this.height = 60;
    this.guiSongData = guiSongData;
    this.guiTrack = guiTrack;
    this.unSoloImage = new Image();
    this.unSoloImage.src = "/assets/images/solo_icon.jpg";
    this.isSoloImage = new Image();
    this.isSoloImage.src = "/assets/images/is_solo_icon.jpg";
  }

  setY() {
    this.y = this.guiTrack.getYTrackPosition() + 120;
  }
  draw() {
    this.setY();
    if (this.guiTrack.getIsSolo()) {
      this.guiSongData
        .getCanvasCtx()
        .drawImage(this.unSoloImage, this.x, this.y, this.width, this.height);
    } else {
      this.guiSongData
        .getCanvasCtx()
        .drawImage(this.isSoloImage, this.x, this.y, this.width, this.height);
    }
  }
  mouseWasClicked(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      this.guiTrack.setIsSolo(!this.guiTrack.getIsSolo());
      this.draw();
    }
  }
}
