// Commenting out the AudioContext creation
//const audioContext = new (window.AudioContext || window.webkitAudioContext)();




(function (DragDropGame,window,undefined){

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
        }
      
        create() {
         // this.add.image(400, 300, 'bg');
      
          this.add.text(16, 16, 'Drag the Sprite').setFontSize(24).setShadow(1, 1);
      
          const sprite = this.add.sprite(180, 240, 'digit_0');
      
          sprite.setInteractive({ draggable: true });
      
          sprite.on('drag', (pointer, dragX, dragY) => sprite.setPosition(dragX, dragY));
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
                    gravity: { y: 200 }
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
  
  })(window.DragDropGame=window.DragDropGame||{},window);