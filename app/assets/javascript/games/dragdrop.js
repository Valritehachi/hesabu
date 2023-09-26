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
        const rect = this.add.rectangle(100, 310, 130, 20, 0xff66ff);
        this.platforms.add(rect);

        //x      =====  
        //       =   =
        //       =   =
        //========   ========
        //=        x        =
        //========   ========/
        const data = [ 
            0,50,
            50,50,
            50,0,
            70,0,
            70,50,
            120,50,
            120,70,
            70, 70,
            70, 120,
            50, 120,
            50, 70,
            0,70
        ];
    
        //const data = [50, 0, 0, 100, 100, 100];
        const r1 = this.add.polygon(250, 310, data, 0x6666ff);
        r1.setScale(.75);
        r1.setStrokeStyle(4, 0xbcffff);
        this.platforms.add(r1);
        
        const rect1 = this.add.rectangle(400, 310, 130, 20, 0xff66ff);
        this.platforms.add(rect1);

        // the equal sign 
        const rect2 = this.add.rectangle(550, 300, 75, 15, 0x6666ff);
        rect2.setStrokeStyle(2, 0xefc53f); 
        const rect3 = this.add.rectangle(550, 325, 75, 15, 0x6666ff);
        rect3.setStrokeStyle(2, 0xefc53f); 
        
        const rect4 = this.add.rectangle(725, 310, 180, 20, 0xff66ff);
        this.platforms.add(rect4);
        //Create the bucket
        //this.bucket = this.physics.add.image(900, 400, 'bucket');
        //this.bucket.setCollideWorldBounds(true);
        //this.bucket.setBounce(0.2);

        const digitIndices = Phaser.Utils.Array.NumberArray(0, 9);

        // Shuffle the array to randomize the order of digit indices
        Phaser.Utils.Array.Shuffle(digitIndices);

        const digitSprites = [];
        const spriteX = [];
        const slotWidth = 1000/10;
        for(let i=0;i<10;i++){
            spriteX[i] = i * slotWidth;
        }
        console.log('spriteX', spriteX);
        /*this.platformGroup.children.each(function(platform) {
            platform.setSize();
            }, this);
        */    
        // Define a function to add a digit
        const game = this;
        const gameObjectGroup = this.physics.add.group();
        const addDigit = (x, digitIndex) => {
           const digitSprite = game.physics.add.sprite( spriteX[digitIndex], 0, 'digit_' + digitIndices[digitIndex]); // Use shuffled index

            
            //const digitSprite = gameObjectGroup.add.sprite( spriteX[digitIndex], 0, 'digit_' + digitIndices[digitIndex]); // Use shuffled index
            digitSprite.setScale(90.0/digitSprite.width);
            digitSprite.x += slotWidth/2;
            digitSprite.setBounce(0.4);
            digitSprite.setCollideWorldBounds(true);
            digitSprite.setInteractive();
            digitSprite.setGravityY(-250);

           // console.log(digitSprite);
            digitSprite.on('drag', (pointer, dragX, dragY) => digitSprite.setPosition(dragX, dragY));
            // Add drag functionality to the digit sprite
            game.input.setDraggable(digitSprite);
            

            digitSprites.push(digitSprite);

            // Check if there are more digits to add
            if (digitIndex < 9) {
                // Emit an event to add the next digit after a delay
                addDigit(Phaser.Math.Between(100, 900), digitIndex + 1);
            }
        };
        // Start adding digits with the first digit
        addDigit(0, 0);
        console.log("GameObjectGroup:", gameObjectGroup);
        
        //game.physics.add.collider(gameObjectGroup, game.ground);
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
    window.removeEventListener("load", load, false); 
    console.log("DragDropGame MODULE LOADED");
    window.DragDropGame.InitInterface();
  },false);
  
  (window.DragDropGame=window.DragDropGame||{},window);

