class StatusBarBottle extends DrawableObject {
  /**
   * The images represent different states of the coin level,
   * from 0% to 100% in 20% increments. Here are the paths:
   */
  STATUSBAR_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.STATUSBAR_BOTTLE);
    this.x = 20;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * sets the energy level and updates the image displayed based on the energy percentage.
   * @param {number} energy
   */ setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.STATUSBAR_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  
  /**
   * This function determines the index of the image to be displayed based on the current percentage level (this.percentage).
   * @returns Depending on the value of this.percentage,
   * it returns an index corresponding to different percentage levels to select the appropriate image from the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 0) {
      return 0;
    } else if (this.percentage == 20) {
      return 1;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 80) {
      return 4;
    } else {
      return 5;
    }
  }
}
