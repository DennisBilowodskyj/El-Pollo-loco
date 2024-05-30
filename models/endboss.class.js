class Endboss extends MovableObject {
  /**
   * stats for the endboss.
   */
  height = 500;
  width = 300;
  y = -45;
  speed = 20;

  /**
   * list of images sorted according to addition.
   */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  world;
  firstContact = false;

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALK);

    this.x = 2550;

    this.animate();
  }
  /**
   * this function set intervals for the endboss and the playanimations.
   */
  animate() {
    let i = 0;

    setInterval(() => {
      if (this.world.character.x > 2100 && !this.firstContact) {
        i = 0;
        this.firstContact = true;
      }
      if (i < 8 && this.firstContact) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.firstContact && !this.isDead()) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALK);
      }

      i++;
    }, 1000 / 10);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.world.showEndScreenEndboss();
        }, "3000");
        stopGame();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
      if (this.isColliding(this.world.character)) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 100);
  }
}
