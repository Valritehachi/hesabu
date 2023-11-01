class Button {

    button = null;

    constructor(x, y, label, scene, callback) {
        this.button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
    }
    destroy() {
        this.button.destroy();
    }

    hide() {
        this.button.setVisible(false);
    }

    show() {
        this.button.setVisible(true);
    }
}
// Then later in one of your scenes, create a new button:


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
        this.load.image('game_over', 'assets/images/game_over.png');
        this.load.audio('wrong_answer', 'assets/audio/wrong_answer_song.wav');
        this.load.audio('right_answer', 'assets/audio/right_answer_sound.wav');
        this.load.audio('level_complete', 'assets/audio/level_complete.wav');
    }
   
    getRandomSum(level) {
        // Generate a random number between 0 and 18 (inclusive)
        const min = (level == 2) ? 10:1;
        const max = (level == 2) ? 17:9;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log(randomNum); 
        return (randomNum);
    }

    create() {
        const game = this;
        this.scaleRatio = window.devicePixelRatio / 3;
        this.math_problem = {
                'addend1': null,
                'addend2': null,
                'sum':null,
                'status': null,
                'counter': 0,
                'level': 1

        };
        this.groundGroup = this.physics.add.staticGroup();
        this.ground = this.groundGroup.create(500, (600 - 45 / 2), 'ground').refreshBody();
        //this.ground.setScale(this.scaleRatio);
        this.add.text(16, 16, 'Drag the Sprite').setFontSize(24).setShadow(1, 1);
       
        this.platforms = this.physics.add.staticGroup();
        const rect = this.add.rectangle(180, 430, 130, 20, 0xff66ff);
        //rect.setScale(this.scaleRatio);
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
        const r1 = this.add.polygon(330, 430, data, 0x6666ff);
        r1.setScale(.75);
        r1.setStrokeStyle(4, 0xbcffff);
       
        this.platforms.add(r1);
        
        const rect1 = this.add.rectangle(480, 430, 130, 20, 0xff66ff);
        this.platforms.add(rect1);
        rect1.setData('name', 'addend2');
        //rect1.setScale(this.scaleRatio);
        // the equal sign 
        const rect2 = this.add.rectangle(630, 420, 75, 15, 0x6666ff);
        rect2.setStrokeStyle(2, 0xefc53f); 
        //rect2.setScale(this.scaleRatio);
        const rect3 = this.add.rectangle(630, 440, 75, 15, 0x6666ff);
        rect3.setStrokeStyle(2, 0xefc53f); 
        //rect3.setScale(this.scaleRatio);

        const rect4 = this.add.rectangle(800, 430, 200, 20, 0xff66ff);
        this.platforms.add(rect4);
        //rect4.setScale(this.scaleRatio);
     // Enable Arcade Physics for the text object

        const randomSum = this.getRandomSum(this.math_problem['level']);
        const tens = Math.floor(randomSum / 10);
        const ones = randomSum % 10;
        const tensDigit = "digit_" + tens;
        const onesDigit = "digit_" + ones;
        this.sum = this.physics.add.staticGroup();
        const scaleFactor = 0.5;
        this.tensSprite = this.sum.create(760, 360, tensDigit);
        this.tensSprite.setScale(scaleFactor);
        this.onesSprite = this.sum.create(860, 360, onesDigit );
        this.onesSprite.setScale(scaleFactor);
       
        this.math_problem['sum'] = randomSum;
        this.math_problem['status'] = 'active';
        console.log('generating math problem', this.math_problem);
        // Create a static text object
        this.staticText = this.add.text(170, 500, 
            'pick any two numbers that add up to ' + randomSum, {
            fontFamily: 'Arial Black',
            fontSize: '30px',
            color: '#000000',
            align: 'center'

        });
        //this.staticText.setScale(this.scaleRatio);


        this.generateNewProblem = () => {
        
            const randomSum = this.getRandomSum(this.math_problem['level']);
            const tens = Math.floor(randomSum / 10);
            const ones = randomSum % 10;
            const tensDigit = "digit_" + tens;
            const onesDigit = "digit_" + ones;
            const scaleFactor = 0.5;
            this.sum.remove(this.tensSprite, true, true);
            this.sum.remove(this.onesSprite, true, true);
            this.tensSprite = this.sum.create(760, 360, tensDigit);
            this.tensSprite.setScale(scaleFactor);
            this.onesSprite = this.sum.create(860, 360, onesDigit );
            this.onesSprite.setScale(scaleFactor);
            this.math_problem['sum'] = randomSum;
            this.math_problem['status'] = 'active';

            // Display the new problem text
            const newProblemText = 'Pick any two numbers that add up to ' + randomSum;
            this.staticText.setText(newProblemText);  
           
        };



            // Define a reset function to shuffle the digitSprites
        this.resetDigits = () => {
            // Shuffle the indices
            //Phaser.Utils.Array.Shuffle(digitIndices);
        
            digitSprites.forEach((digitSprite, index) => {
                const newIndex = digitIndices[index];
    
            
                // Calculate the new x-position for the digitSprite based on index
                const newX = index * slotWidth + slotWidth/2;
            
                // Set the new x-position for the digitSprite
                digitSprite.x = newX;
                digitSprite.y = digitSprite.body.height/2;
                digitSprite.setInteractive({draggable: true});
                digitSprite.setGravityY(-350);
            });
        };
        
        this.level_complete_music = this.sound.add('level_complete');

        this.nextLevelButton = new Button(630, 515, 'Next Level', this, function () {
            console.log('clicked on level button');
            game.math_problem['counter'] = 0;
            game.math_problem['level']++;
            game.nextLevelButton.hide();
            game.generateNewProblem();
            
            
            //game.level_complete_music.play();
            //game.gameOver.setVisible(true); 
            // Hide the button by setting its visibility to false
            //this.nextLevelButton.setVisible(false);
        });
        this.gameOverGroup = this.physics.add.staticGroup();
        this.gameOver = this.gameOverGroup.create(
            window.DragDropGame.config.width/2, 
            window.DragDropGame.config.height/2,
            'game_over');
            
        this.gameOver.setVisible(false);
        this.gameOver.setDepth(9999);


        this.showNextProblem = () => {
            setTimeout(() => {
                if (this.math_problem['counter'] < 2) {
                    this.generateNewProblem();
                    this.resetDigits();

                } else if
                    (this.math_problem['counter'] === 4) {
                    game.level_complete_music.play();
                    game.gameOver.setVisible(true); 
               
                } else {
                    this.resetDigits();
                    console.log('Level Complete');
                    // Display the new problem text
                   
                    const newProblemText = 'Level Completed';
                    this.staticText.setText(newProblemText);
                    this.math_problem['level_complete'] = true;
                    game.nextLevelButton.show()
                }
            }, 3500); 
        };

         this.wrong_answer_music = this.sound.add('wrong_answer');

         this.wrong_answer_music_complete = function() {
            console.log('music completed');
            game.resetDigits();
            game.math_problem['addend1'] = null; 
            game.math_problem['addend2'] = null;
            game.math_problem['status'] = 'active';
        };

         this.right_answer_music = this.sound.add('right_answer');
         this.level_complete_music = this.sound.add('level_complete');

         
        this.sumOnPlatform = () => {
            const addend1 = this.math_problem['addend1'];
            const addend2 = this.math_problem['addend2'];
            if (addend1 === null || addend2 === null) {
                return;
            }
            this.math_problem['status'] = 'summing';

            const sum = this.math_problem['addend1'] + this.math_problem['addend2'];
    
            if (sum === this.math_problem['sum']) {
               
                console.log('Good Job!');
                this.math_problem['status'] = 'completed';
                this.math_problem['counter']++;

               
                const tensDigit = this.math_problem['addend1_digit'];
                //tensDigit.body.y = tensDigit.body.y - 20;
                const onesDigit = this.math_problem['addend2_digit'];
                this.right_answer_music.play();
                   
                onesDigit.body.y = rect1.y - onesDigit.body.height/2 - 20
                tensDigit.body.y = rect1.y - tensDigit.body.height/2 - 20;

                setTimeout(() => {
                    onesDigit.setInteractive({draggable: true});
                    tensDigit.setInteractive({draggable: true});
                    tensDigit.setGravityY(-350);
                    onesDigit.setGravityY(-350);
                    this.showNextProblem();
                }, 2000);
               
                this.math_problem['addend1'] = null; 
                this.math_problem['addend2'] = null;

            
               
                // Generate a new addition problem after a brief delay
                // if the counter is less than 2 generate a new problem else end the level 

            } else {
                console.log('Try again!');
                this.wrong_answer_music.play();
                setTimeout(this.wrong_answer_music_complete, 2000);
            }
        };
        const digitIndices = Phaser.Utils.Array.NumberArray(0, 9);

        // Shuffle the array to randomize the order of digit indices
        Phaser.Utils.Array.Shuffle(digitIndices);

        const digitSprites = [];
        const spriteX = [];
        const slotWidth = window.DragDropGame.config.width/10;
        for(let i=0;i<10;i++){
            spriteX[i] = i * slotWidth;
        }
        console.log('spriteX', spriteX);
        /*this.platformGroup.children.each(function(platform) {
            platform.setSize();
            }, this);
        */    
        // Define a function to add a digit
       
        const gameObjectGroup = this.physics.add.group();
        const addDigit = (x, digitIndex) => {
           const digitSprite = game.physics.add.sprite( spriteX[digitIndex], 0, 'digit_' + digitIndices[digitIndex]); // Use shuffled index
     //const digitSprite = gameObjectGroup.add.sprite( spriteX[digitIndex], 0, 'digit_' + digitIndices[digitIndex]); // Use shuffled index
            digitSprite.setScale(slotWidth/digitSprite.width);
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
            if (this.math_problem['status'] == 'completed') return;
        

            const value = digit.getData('value'); 
            if (value == undefined) return;

            const name = platform.getData('name' );
            if (name == undefined) return;

            // Attach the digit to the platform when they collide
            if (digit.body.gravity.y != -200) {
                digit.body.stop();
                digit.body.setVelocity(0); 
                digit.setGravityY(-200); 
                digit.setInteractive({draggable: false});
                
                console.log('collision', value, name,  [digit.body.x, digit.body.y], [platform.x,platform.y],digit.height, platform.y - platform.height/2 - digit.body.height/2);
                console.log('gravity', digit.body.gravity);
                digit.setPosition(platform.x, platform.y - platform.height - digit.body.height/2);
                this.math_problem[name] = value;
                this.math_problem[name + '_digit'] = digit;
                console.log('math problem', this.math_problem);
            }
        });   
        //game.physics.add.collider(gameObjectGroup, game.ground);
    }



    
   
    update(){
        if (this.math_problem['status'] == 'active') {
            const addend1 = this.math_problem['addend1'];
            const addend2 = this.math_problem['addend2'];
            if (addend1 !== null && addend2 !== null) {
                this.sumOnPlatform();
            }
        }
        if (this.math_problem['status'] == 'completed' &&
            this.math_problem['level_complete'] == true &&
            this.nextLevelButton.visible == false) {
                
            console.log('button', this.nextLevelButton);
            
            this.nextLevelButton.setVisible(false);
            this.nextLevelButton.y = this.staticText.y;
            this.nextLevelButton.x = this.staticText.x + this.staticText.width;
        }

    }
}
  DragDropGame = function() {
        this.config = {
          type: Phaser.AUTO,
          width: 1100,
          height: 620,
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
      this.game = new Phaser.Game(window.DragDropGame.config);
  };

  window.DragDropGame = new DragDropGame();
  
  window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); 
    console.log("DragDropGame MODULE LOADED");
    window.DragDropGame.InitInterface();
  },false);
  
  (window.DragDropGame=window.DragDropGame||{},window);

