class BackgroundObject extends MovableObject {
  /**
   * stats for the backgroundObject.
   */
  width = 720;
  height = 480;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
