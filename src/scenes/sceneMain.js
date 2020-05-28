import logo from "../assets/logo.png";
import { Align } from "../util/align";
import { AlignGrid } from "../util/alignGrid";
import robotJSON from "../assets/imgs/robot.json";
import robotImg from "../assets/imgs/robot.png";
import starImg from "../assets/star.png";
import skyLogo from '../assets/sky.png';
import baseGroundLogo from'../assets/Ground&Stone/Ground/baseground.png'


let cursors
let robot
let platforms
const infinite = -1

export class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain')
    }
    preload() {
        this.load.atlas('robot',robotImg,robotJSON)
        this.load.image('sky', skyLogo)
        this.load.image('baseGroundLogo', baseGroundLogo)
        
    }

    
    
    create () {
        
        let agrid = new AlignGrid({scene:this, rows:11, cols:11})
        

        let skyImage = this.add.image(0,0,'sky')
        Align.center(skyImage)
        Align.scaleToGameW(skyImage,1)

        platforms = this.physics.add.staticGroup()

        for (let index = 1; index < 111; index++) {
            
            platforms.create(75*index,615,'baseGroundLogo').setScale(1.1).refreshBody()
            
        }
        
        //agrid.placeAtIndex(67,a)
        agrid.showNumbers()
        

        

        

        
        // Create Robot
        robot = this.physics.add.sprite(200,200,'robot')
        // set collider with world
        robot.setBounce(0.1)
        robot.setCollideWorldBounds(true)

        


        // shows Robotframes
        let frameNames = this.textures.get('robot').getFrameNames()
        console.log(frameNames)
        //Animate Robot frames
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNames('robot', {start: 0, end: 2, zeroPad: 1, prefix: 'character_robot_attack', suffix: '.png'}), 
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('robot', {start: 0, end: 7, zeroPad: 1, prefix: 'character_robot_walk', suffix: '.png'}),
            frameRate: 10, 
            repeat: infinite
        })
        
        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'robot',
                frame: "character_robot_idle.png"

            }],

            frameRate: 8, 
           
        })

        this.physics.add.collider(robot,platforms)

        cursors = Phaser.Input.Keyboard.KeyCodes
        //this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S });
        //this.input.keyboard.addKeys('W,S,A,D');
        //cursors.addKeys('W,S,A,D')
        //cursor = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S });
        //this.robot.play("walk")
       
    }

    update () {
        if (cursors.SHIFT.isDown) {
            robot.anims.play("attack", true)
        }  else if (cursors.RIGHT.isDown ) {
            robot.setVelocityX(160)
            robot.anims.play("walk",true)
             
        } else if (cursors.LEFT.isDown) { 
            
            
            //this.robot.anims.play("walk",true)
        } else {
            
      
            robot.play("turn")
        }
    }
}