class Cloud extends MovableObject {
  /**
   * stats for the clouds.
   */
  y = 20;
  width = 500;
  height = 250;

  CLOUDS = ["img/5_background/layers/4_clouds/2.png"];

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.loadImage(this.CLOUDS);
    this.x = Math.floor(Math.random() * 2500);

    this.animate();
  }

  /**
   * this function set the animation for moving left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
