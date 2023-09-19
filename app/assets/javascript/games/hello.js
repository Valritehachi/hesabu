(function (HelloGame,window,undefined){

    HelloGame = function() {
          this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            canvas: null,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
            scene: {
                preload: window.HelloGame.preload,
                create: window.HelloGame.create
            }
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
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
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

        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
    }
  
    window.HelloGame = new HelloGame();
  
    window.addEventListener("load", function load(event){
      window.removeEventListener("load", load, false); //remove listener, no longer needed
      console.log("HelloGame MODULE LOADED");
      window.HelloGame.InitInterface();
    },false);
  
  })(window.HelloGame=window.HelloGame||{},window);