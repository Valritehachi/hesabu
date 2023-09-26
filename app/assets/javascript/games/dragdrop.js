class Example extends Phaser.Scene {
    constructor() {
      super();
    }
  
    preload() {
        this.load.setBaseURL('https://hesabu.s3.amazonaws.com/');
    
        this.load.image('digit_0', 'assets/images/bubble_digit_0.png');
        this.load.image('digit_1', 'assets/images/bubble_digit_1.png');
        this.load.image('digit_2', 'assets/images/bubble_digit_2.png');
        this.load.image('digit_3', 'assets/images/bubble_digit_3.png');
        this.load.image('digit_4', 'assets/images/bubble_digit_4.png');
        this.load.image('digit_5', 'assets/images/bubble_digit_5.png');
        this.load.image('digit_6', 'assets/images/bubble_digit_6.png');
        this.load.image('digit_7', 'assets/images/bubble_digit_7.png');
        this.load.image('digit_8', 'assets/images/bubble_digit_8.png');
        this.load.image('digit_9', 'assets/images/bubble_digit_9.png');

        this.load.image('ground', 'assets/images/ground_1920x45.png');
        this.load.image('bucket', 'assets/images/purple_bucket.png');

    }
    
    create() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(500, (600 - 45 / 2), 'ground').refreshBody();
        this.add.text(16, 16, 'Drag the Sprite').setFontSize(24).setShadow(1, 1);
    
        this.platforms = this.physics.add.staticGroup();
        // ... Other platform-related code ...
    
        // Create a group to manage the digits
        const digitsGroup = this.physics.add.group();
    
        // Function to add a digit with wavy movement
        const addDigitWithWavyMovement = (x, digitIndex) => {
            const digitSprite = this.physics.add.sprite(x, 0, 'digit_' + digitIndices[digitIndex]);
            digitSprite.setScale(0.1); // Adjust the scale as needed
            digitSprite.setCollideWorldBounds(true);
            digitSprite.setBounce(Phaser.Math.FloatBetween(0.2, 0.5));
            digitSprite.setGravityY(-Phaser.Math.Between(100, 300)); // Adjust the gravity as needed
    
            // Enable dragging for the digit
            digitSprite.setInteractive();
            this.input.setDraggable(digitSprite);
    
            // Custom logic to add wavy movement
            const amplitude = 20; // Adjust the amplitude of the wave
            const frequency = 0.02; // Adjust the frequency of the wave
            this.time.addEvent({
                loop: true,
                callback: () => {
                    const yOffset = amplitude * Math.sin(frequency * this.time.now);
                    digitSprite.y += yOffset;
                },
            });
    
            // Handle collisions between the digit and the ground
            this.physics.add.collider(digitSprite, this.ground);
    
            // Add the digit to the group
            digitsGroup.add(digitSprite);
    
            // Check if there are more digits to add
            if (digitIndex < 9) {
                // Emit an event to add the next digit after a delay
                this.time.delayedCall(Phaser.Math.Between(1000, 2000), () => {
                    addDigitWithWavyMovement(Phaser.Math.Between(100, 900), digitIndex + 1);
                });
            }
        };
    
        // Start adding digits with wavy movement
        addDigitWithWavyMovement(Phaser.Math.Between(100, 900), 0);
    }
    update(){
        
    }
}
  DragDropGame = function() {
        this.config = {
          type: Phaser.CANVAS,
          width: 1000,
          height: 600,
          canvas: null,
          transparent: true,
          physics: {
              default: 'arcade',
              arcade: {
                  gravity: { y: 200 },
                  debug: false
              }
          },
          scene: Example 
      };
  };
  
  DragDropGame.prototype.InitInterface = function()
  {
      var canvas = document.getElementById('hello_game');
      window.DragDropGame.config.canvas = canvas;
      var game = new Phaser.Game(window.DragDropGame.config);
  };
  
  
  window.DragDropGame = new DragDropGame();
  
  window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    console.log("DragDropGame MODULE LOADED");
    window.DragDropGame.InitInterface();
  },false);
  
  (window.DragDropGame=window.DragDropGame||{},window);

