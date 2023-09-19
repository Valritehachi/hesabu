(function (HelloGame, window, undefined) {
    class Example extends Phaser.Scene {
        preload() {
            this.load.setBaseURL('https://labs.phaser.io');
            //this.load.image('sky', 'assets/skies/space3.png');
            this.load.image('number4', 'assets/images/hesabu/number4.png');
            this.load.image('red', 'assets/particles/red.png');
        }

        create() {
            // Create a number4 sprite with physics
            const number4 = this.physics.add.image(400, 300, 'number4');

            // Set initial velocity for bouncing
            number4.setVelocity(200, 200);
            number4.setBounce(1, 1);
            number4.setCollideWorldBounds(true);

            // Create particles for visual effect
            const particles = this.add.particles('red');
            const emitter = particles.createEmitter({
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD'
            });

            // Start emitting particles and follow the number4 sprite
            emitter.startFollow(number4);

            // Create a background image
            this.add.image(400, 300, 'sky');
        }
    }

    HelloGame = function () {
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

    HelloGame.prototype.InitInterface = function () {
        // This gets called when the entire page is loaded
        var canvas = document.getElementById('hello_game');
        window.HelloGame.config.canvas = canvas;
        var game = new Phaser.Game(window.HelloGame.config);
    };

    window.HelloGame = new HelloGame();

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false); // Remove the listener, no longer needed
        console.log("HelloGame MODULE LOADED");
        window.HelloGame.InitInterface();
    }, false);
})(window.HelloGame = window.HelloGame || {}, window);