export { GuiSequencerZoomInButton };

class GuiSequencerZoomInButton {
  private width;
  private height;
  private x;
  private y;
  private guiSongData;
  private guiTracks;
  private image;

  constructor(guiSongData, guiTracks) {
    this.width = 45;
    this.height = 45;
    this.x;
    this.y = 0;
    this.guiSongData = guiSongData;
    this.guiTracks = guiTracks;
    this.image = new Image();
    this.image.src = "/assets/images/zoom_in_icon.png";
  }

  setX() {
    this.x = this.guiSongData.getCanvasWidth() - this.width - 90;
  }
  draw() {
    this.setX();
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
      this.guiTracks.decrementZoomLevel();
      this.guiTracks.draw();
    }
  }
}
