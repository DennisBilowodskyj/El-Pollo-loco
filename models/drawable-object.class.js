class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 285;
  height = 150;
  width = 100;

  //loadImage('img/test.png');
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
/**
 * The draw function draws an image (this.img) onto the canvas context ctx at the position (this.x, this.y) with the specified width and height (this.width, this.height).
 * @param {*} ctx 
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.rect(this.x, this.y, this.width, this.height);

    if (this instanceof CollectableObject) {
      ctx.rect(this.x, 350, 90, 100);
    }
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image1.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
