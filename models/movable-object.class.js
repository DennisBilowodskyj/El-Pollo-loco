class MovableObject extends DrawableObject {
  /**
   * These code sections define a series of variables and values:
   */
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  coinBar = 0;
  bottleBar = 0;

  /**
   * The isAboveGround() method returns true if the object is an instantiated object of the ThrowableObject class,
   * otherwise it checks whether the Y coordinate of the object is less than 180.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * The isColliding(mo) method checks whether the current object collides with another object mo by taking into account the positions and dimensions
   *  of both objects as well as their offsets.
   * It returns true if there is a collision, otherwise false.
   * @param {*} mo The other object with which the collision is to be checked.
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * coordinates for collision detection
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * The hit() method reduces the energy of the character by 20
   *  and sets it to 0 if it falls below 0 after the reduction,
   * otherwise it updates the time of the last hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); //zeit wird in zahlen form gespeichert.
    }
  }

  /**
   * The hitEndboss() method reduces the energy of the end boss by 20
   *  and sets it to 0 if it falls below 0 after the reduction,
   * otherwise it updates the time of the last hit.
   */
  hitEndboss() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); //zeit wird in zahlen form gespeichert.
    }
  }

  /**
   *The hitCoin() method increases coinBar by 20, limits the value to a maximum of 100
   */
  hitCoin() {
    this.coinBar += 20;
    if (this.coinBar > 100) {
      this.coinBar = 100;
    }
  }

  /**
   *The hitBottle() method increases bottleBar by 20, limits the value to a maximum of 100
   */
  hitBottle() {
    this.bottleBar += 20;
    if (this.bottleBar > 100) {
      this.bottleBar = 100;
    }
  }

  /**
   * The isHurt() method calculates the time elapsed since the last hit in seconds
   * and returns true if less than one second has elapsed, otherwise it returns false.
   * @returns {boolean}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * if the energy is = 0 returns true.
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * the value of the X coordinate is continuously increased by 0.15 pixels for moving right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * the value of the X coordinate is continuously reduced by 0.15 pixels for moving left.
   */
  moveLeft() {
    this.x -= this.speed; //HIER WIRD DER X ACHSE IMMER 0.15px ABGEZOGEN
  }

  /**
   * The playAnimation function takes a number of images as parameters,
   * selects the next image from a list based on the current image
   * and the modulo operator and then updates the current image of the animation.
   * @param {string[]} images array of image paths
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; //modulo
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * this function set the max jump height.
   */
  jump() {
    this.speedY = 25;
  }
}
