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
    getRandomSum() {
        // Generate a random number between 0 and 18 (inclusive)
        const min = 0;
        const max = 18;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log(randomNum); 
        return (randomNum);
    }

    create() {
        this.math_problem = {
                'addend1': null,
                'addend2': null,
                'sum':null,
        };
        this.ground = this.physics.add.staticGroup();
        this.ground.create(500, (600 - 45 / 2), 'ground').refreshBody();
        this.add.text(16, 16, 'Drag the Sprite').setFontSize(24).setShadow(1, 1);
       
        this.platforms = this.physics.add.staticGroup();
        const rect = this.add.rectangle(100, 430, 130, 20, 0xff66ff);
        this.platforms.add(rect);
        rect.setData('name', 'addend1');

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
        const r1 = this.add.polygon(250, 430, data, 0x6666ff);
        r1.setScale(.75);
        r1.setStrokeStyle(4, 0xbcffff);
       
        this.platforms.add(r1);

        
        const rect1 = this.add.rectangle(400, 430, 130, 20, 0xff66ff);
        this.platforms.add(rect1);
        rect1.setData('name', 'addend2');

        // the equal sign 
        const rect2 = this.add.rectangle(550, 420, 75, 15, 0x6666ff);
        rect2.setStrokeStyle(2, 0xefc53f); 
        const rect3 = this.add.rectangle(550, 440, 75, 15, 0x6666ff);
        rect3.setStrokeStyle(2, 0xefc53f); 
        
        const rect4 = this.add.rectangle(725, 430, 200, 20, 0xff66ff);
        this.platforms.add(rect4);

     // Enable Arcade Physics for the text object
        //this.physics.world.enable(staticText);

        // Make the text static (immovable)
        //staticText.body.moves = false;

        const randomSum = this.getRandomSum();
        const tens = Math.floor(randomSum / 10);
        const ones = randomSum % 10;
        const tensDigit = "digit_" + tens;
        const onesDigit = "digit_" + ones;
        this.sum = this.physics.add.staticGroup();
        const scaleFactor = 0.5;
        const tensSprite = this.sum.create(675, 360, tensDigit);
        tensSprite.setScale(scaleFactor);
        const onesSprite = this.sum.create(775, 360, onesDigit );
        onesSprite.setScale(scaleFactor);
       
        this.math_problem['sum'] = randomSum;

        // Create a static text object
        const staticText = this.add.text(0, 500, 
            'pick any two numbers that add upto the number after the equal sign', {
            fontFamily: 'Arial Black',
            fontSize: '30px',
            color: '#000000'
        });

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
            digitSprite.setData('value', digitIndices[digitIndex]);
           // console.log(digitSprite);
            digitSprite.on('drag', (pointer, dragX, dragY) => digitSprite.setPosition(dragX, dragY));
            // Add drag functionality to the digit sprite
            game.input.setDraggable(digitSprite);
            

            digitSprites.push(digitSprite);

            // Enable physics for platforms
        //this.physics.world.enable(this.platforms);
            // Check if there are more digits to add
            if (digitIndex < 9) {
                // Emit an event to add the next digit after a delay
                addDigit(Phaser.Math.Between(100, 900), digitIndex + 1);
            }
        };
        // Start adtding digits with the first digit
        addDigit(0, 0);
        console.log("GameObjectGroup:", gameObjectGroup);
       

           // Add a collider between the digits and the platforms
        this.physics.add.collider(digitSprites, this.platforms, (digit, platform) => {
            //console.log("collide", digit, platform);
            const value = digit.getData('value'); 
            if (value == undefined) return;
            // Attach the digit to the platform when they collide
            digit.body.stop();
            digit.body.setVelocity(0); 
            digit.setGravityY(-200); 
            const name = platform.getData('name' );
            console.log('collision', value, name,  [digit.body.x, digit.body.y], [platform.x,platform.y],digit.height, platform.y - platform.height/2 - digit.body.height/2);
            digit.setPosition(platform.x, platform.y - platform.height - digit.body.height/2);
            this.math_problem[name] = value;
            console.log('math problem', this.math_problem);
                // Check if the sum of the digits on the platform matches the target value 
            //const digitsOnPlatform = digitSprites.filter(sprite => sprite.y === platform.y);
           /* const sumOnPlatform = digitsOnPlatform.reduce((acc, currDigit) => acc + currDigit.getData('value'), 0);

            console.log('sumOnPlatform', sumOnPlatform);

            if (sumOnPlatform === 8) { 
                console.log('Good job!');
            }
    */
        });   
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

