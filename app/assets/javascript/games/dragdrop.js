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
       // this.ground = this.physics.add.staticGroup();
        //this.ground.create(500, (600-45/2), 'ground').refreshBody();
        //this.ground.body.immovable = true;
         //this.add.text(16, 16, 'Drag the Sprite').setFontSize(24).setShadow(1, 1);
     
         //this.sprite = this.physics.add.sprite(180, 240, 'digit_0',);
         
         //this.sprite.body.setGravity(300);
         //this.sprite.setBounce(0.2);
          //  this.sprite.setCollideWorldBounds(true);
         //this.sprite.setInteractive({ draggable: true });

         //this.sprite = this.physics.add.sprite(280, 440, 'digit_1',);
         
         //this.sprite.body.setGravity(300);
         //this.sprite.setBounce(0.2);
           // this.sprite.setCollideWorldBounds(true);
         //this.sprite.setInteractive({ draggable: true });
     

        //  this.time.addEvent({
        //      delay: 10, // Adjust the delay as needed for the desired falling speed
        //      callback: () => {
        //          this.sprite.setPosition(this.sprite.x, this.sprite.y + 1); // Adjust the Y coordinate to control the falling speed
        //      },
        //      loop: true
        // });
 
        //const targetZone = this.add.zone(500, 300, 200, 200).setRectangleDropZone(200, 200);
         
        
         //this.physics.add.collider(this.sprite, this.ground,(sprite, ground) => {
           //console.log('colliding','sprite',sprite.body.velocity,'ground',ground.body.velocity);
         //}); 


    
        this.ground = this.physics.add.staticGroup();
        this.ground.create(500, (600 - 45 / 2), 'ground').refreshBody();
        this.add.text(16, 16, 'Drag the Sprite').setFontSize(24).setShadow(1, 1);

        // Create an array to hold the digit sprites
        const digitSprites = [];

        // Define a function to add a digit
        const addDigit = (x, digitIndex) => {
            const digitSprite = this.physics.add.sprite(x, 240, 'digit_' + digitIndex);
            digitSprite.setBounce(0.2);
            digitSprite.setCollideWorldBounds(true);
            digitSprite.setInteractive({ draggable: true });

            // Handle collisions between the digit and the ground
            this.physics.add.collider(digitSprite, this.ground);

            digitSprites.push(digitSprite);

            // Check if there are more digits to add
            if (digitIndex < 9) {
                // Emit an event to add the next digit after a delay
                this.time.delayedCall(1000, () => {
                    addDigit(Phaser.Math.Between(100, 900), digitIndex + 1);
                });
            }
        };
    
            // Start adding digits with the first digit
            addDigit(Phaser.Math.Between(100, 900), 0);
        }

        // Start adding digits with a delay
        //addDigitWithDelay(0);

        // Handle collisions between digits and ground
        //this.physics.add.collider(digitSprites, this.ground, (digitSprite) => {
            // Handle collisions here if needed
       // });
    //}
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
                  debug: true
              }
          },
          scene: Example
          
          
      };
  };
  
  
  DragDropGame.prototype.InitInterface = function()
  {
      // this gets called when the entire page is loaded
  
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

