import Phaser from "phaser";
import { SceneMain } from "./scenes/sceneMain";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1500,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [SceneMain]
};



export const game = new Phaser.Game(config);


function preload ()
{
    
}


function create ()
{
 
}

function update () {
 


}
