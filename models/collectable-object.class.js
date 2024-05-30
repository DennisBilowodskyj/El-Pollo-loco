class CollectableObject extends MovableObject {
  y = 330;

  COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.COINS);
    this.animate();
    this.x = Math.floor(Math.random() * 2000);
    this.y = Math.floor(Math.random() * 130 + 200); 
  }
  
/**
 * animate the Coins
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.COINS);
    }, 200);
  }
}
