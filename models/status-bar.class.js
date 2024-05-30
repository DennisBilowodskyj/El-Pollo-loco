class Statusbar extends DrawableObject {
  /**
   * list of statusbar images.
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * set energy to 100.
   */
  energy = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * sets the energy level and updates the image displayed based on the energy percentage.
   * @param {number} energy
   */
  setPercentage(energy) {
    this.energy = energy;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * This function determines the index of the image to be displayed based on the current energy level (this.energy).
   * @returns Depending on the value of this.energy,
   *  it returns an index corresponding to different energy levels to select the appropriate image from the IMAGES array.
   */
  resolveImageIndex() {
    "this.percentage:", this.percentage, "this.energy:", this.energy;

    if (this.energy == 100) {
      return 5;
    } else if (this.energy >= 80) {
      return 4;
    } else if (this.energy >= 60) {
      return 3;
    } else if (this.energy >= 40) {
      return 2;
    } else if (this.energy >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
