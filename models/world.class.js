class World {
  /**
   * These code sections define a series of variables and values:
   */
  character = new Character();
  chicken = new Chicken();
  chickenSmall = new ChickenSmall();
  endboss = new Endboss();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  statusBarEndboss = new StatusBarEndboss();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  throwableObjects = [];
  coin_sound = new Audio("audio/coin.mp3");
  hit = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * The setWorld method sets the reference to the world object (this) in the character object so that the character object can access the properties and methods of the world.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * checks the collisions for the character with an interval.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsEndboss();
      this.checkCollisionsCoin();
      this.checkCollisionsBottle();
      this.checkThrowObjects();
    }, 40);
  }

  lastThrowTime = 0;
  bottleCooldown = 500;

  /**
   * function to throw a bottle after a cooldown phase.
   */
  checkThrowObjects() {
    const currentTime = Date.now();
    if (
      this.keyboard.D &&
      this.character.bottleBar >= 20 &&
      currentTime - this.lastThrowTime >= this.bottleCooldown
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 20,
        this.character.y + 50
      );
      this.throwableObjects.push(bottle);
      this.character.bottleBar -= 20;
      this.statusBarBottle.setPercentage(this.character.bottleBar);
      this.lastThrowTime = currentTime;
    }
  }

  /**
   * check collision between enemy and character.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (this.character.isColliding(enemy)) {
          if (this.character.isAboveGround(enemy) && !this.character.isHurt()) {
            enemy.energy = 0;
          } else {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        }
      }
      for (const throwableObject of this.throwableObjects) {
        if (throwableObject.isColliding(enemy)) {
          enemy.energy = 0;
          break;
        }
      }
    });
  }

  /**
   * check collision between endboss and throwableobject.
   */
  checkCollisionsEndboss() {
    for (const throwableObject of this.throwableObjects) {
      if (!throwableObject.hit && this.endboss.isColliding(throwableObject)) {
        throwableObject.hit = true;
        this.endboss.hitEndboss();
        this.statusBarEndboss.setPercentage(this.endboss.energy);
        break;
      }
    }
    if (this.endboss.isColliding(this.character)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
   
  }

  /**
   * check collision width coin.
   */
  checkCollisionsCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        if (!mute) {
          if (this.character.coinBar < 100) {
            coin_sound.play();
          }
        }
        this.character.hitCoin();
        this.statusBarCoin.setPercentage(this.character.coinBar);
        if (this.character.coinBar < 120) {
          this.level.coins.splice(index, 1);
        } else {
        }
      }
    });
  }

  bottle_sound = new Audio("audio/bottle.mp3");

  /**
   * check collision width bottle.
   */
  checkCollisionsBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (mute) {
          this.bottle_sound.pause();
        } else {
          this.bottle_sound.play();
        }
        this.character.hitBottle();
        this.statusBarBottle.setPercentage(this.character.bottleBar);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * show endscreen if the character loses.
   */
  showEndScreen() {
    document.getElementById("endScreen").style.display = "block";
    document.getElementById("canvas").classList.add("d-none");
    theme_sound.pause();
    document.getElementById("endScreen").style.backgroundImage =
      "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
    document.getElementById("symbols").classList.add("d-none");
    document.getElementById("widescreen").classList.add("d-none");
    document.getElementById("symbols").classList.add("d-none");
  }

  /**
   * show endscreen if the endboss loses.
   */
  showEndScreenEndboss() {
    document.getElementById("endScreen").style.display = "block";
    document.getElementById("canvas").classList.add("d-none");
    theme_sound.pause();
    document.getElementById("endScreen").style.backgroundImage =
      "url('img/9_intro_outro_screens/game_over/game over!.png')";
    document.getElementById("widescreen").classList.add("d-none");
    document.getElementById("symbols").classList.add("d-none");
  }

  /**
   * this function is rendering a visual presentations of all objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    // ------------space for fixed objects--------------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.endboss.world = this;
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;

    requestAnimationFrame(function () {
      self.draw();
    });
  }
  /**
   * add all objects to map.
   * @param {list of objects} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * draw a movable object and check if this is the direction it has to go.
   * @param {object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   *  flips an image of a moving object horizontally.
   * @param {object} mo
   */
  flipImage(mo) {
    this.ctx.save(); //und wenn ja dann speichern wir die aktuellen eintsellungen von unserem context.
    this.ctx.translate(mo.width, 0); //wir verändern die methode wie wir die bilder einfügen
    this.ctx.scale(-1, 1); // dann drehen wir das bild um an der y achse ,es wird gespiegelt
    mo.x = mo.x * -1; //die x koordinate wird umgedreht
  }

  /**
   * this function reverses the changes made by flipImage by reversing the x-coordinate of the object and restoring the previously saved settings of the graphics context.
   * @param {object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
