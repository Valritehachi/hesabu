(function (HelloGame, window, undefined) {
    class Example extends Phaser.Scene {
        preload() {
            this.load.setBaseURL('https://labs.phaser.io');
            //this.load.image('sky', 'assets/skies/space3.png');
            this.load.image('red', 'assets/particles/red.png');
        }

        create() {
            // Create a background image
            this.add.image(400, 300, 'sky');

            // Create a physics group for the numbers (text objects)
            const numbersGroup = this.physics.add.group();

            // Create and add numbers to the group
            for (let i = 0; i < 10; i++) {
                const numberText = this.add.text(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550), i.toString(), { fontSize: '32px', fill: '#fff' });

                // Enable physics for text objects
                this.physics.world.enable(numberText);

                // Set physics properties for bouncing
                numberText.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
                numberText.setBounce(1, 1);
                numberText.setCollideWorldBounds(true);

                // Add text objects to the group
                numbersGroup.add(numberText);
            }
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

    HelloGame.prototype.preload = function () {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    window.HelloGame = new HelloGame();

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false); // Remove the listener, no longer needed
        console.log("HelloGame MODULE LOADED");
        window.HelloGame.InitInterface();
    }, false);
})(window.HelloGame = window.HelloGame || {}, window);