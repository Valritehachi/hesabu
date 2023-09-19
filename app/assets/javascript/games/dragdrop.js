(function (HelloGame,window,undefined){

    class Example extends Phaser.Scene
    {
        preload ()
        {
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.image('sky', 'assets/skies/space3.png');
            this.load.image('number4', 'assets/hesabu/no4.JPG');
            this.load.image('red', 'assets/particles/red.png');
        }

        create ()
        {
            //this.add.image(400, 300, 'sky');

            var particles = this.add.particles('red');

            var emitter = particles.createEmitter({
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD'
            });

            var number4 = this.physics.add.image(400, 100, 'number4');

            number4.setVelocity(100, 200);
            number4.setBounce(1, 1);
            number4.setCollideWorldBounds(true);

            emitter.startFollow(number4);
        }
    }

    HelloGame = function() {
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
  
  
    HelloGame.prototype.InitInterface = function()
    {
        // this gets called when the entire page is loaded
    
        var canvas = document.getElementById('hello_game');
        window.HelloGame.config.canvas = canvas;
        var game = new Phaser.Game(window.HelloGame.config);
    };
  
    HelloGame.prototype.preload = function()
    {
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('number4', 'assets/images/hesabu/number4.PNG');
        this.load.image('red', 'assets/particles/red.png');
    }

    HelloGame.prototype.create = function()
    {
        this.add.image(400, 300, 'sky');

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var number4 = this.physics.add.image(400, 100, 'number4');

        number4.setVelocity(100, 200);
        number4.setBounce(1, 1);
        number4.setCollideWorldBounds(true);

        emitter.startFollow(number4);
    }
  
    window.HelloGame = new HelloGame();
  
    window.addEventListener("load", function load(event){
      window.removeEventListener("load", load, false); //remove listener, no longer needed
      console.log("HelloGame MODULE LOADED");
      window.HelloGame.InitInterface();
    },false);
  
  })(window.HelloGame=window.HelloGame||{},window);