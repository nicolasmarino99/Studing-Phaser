import logo from "../assets/logo.png";
import { Align } from "../util/align";
import { AlignGrid } from "../util/alignGrid";
import robotJSON from "../assets/imgs/robot.json";
import robotImg from "../assets/imgs/robot.png";
import starImg from "../assets/star.png";
import skyLogo from '../assets/sky.png';
import baseGroundLogo from'../assets/Ground&Stone/Ground/baseground.png'
import cornerGroundLogo from'../assets/Ground&Stone/Ground/groundr.png'


let cursors
let robot
let platforms
let camera
let keyZ;
let keyS;
let keyD;
let keyW;
const infinite = -1

export class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain')
    }
    preload() {
        this.load.atlas('robot',robotImg,robotJSON)
        this.load.image('sky', skyLogo)
        this.load.image('baseGroundLogo', baseGroundLogo)
        this.load.image('cornerGroundLogo', cornerGroundLogo)
        
    }

    
    
    create () {
        
        let agrid = new AlignGrid({scene:this, rows:11, cols:11})
        

        let skyImage = this.add.image(0,0,'sky')
        Align.center(skyImage)
        Align.scaleToGameW(skyImage,4)

        platforms = this.physics.add.staticGroup()

        for (let index = 0; index < 118; index++) {
            
            platforms.create(128*index,640,'baseGroundLogo').refreshBody()
            
        }
        
        //agrid.placeAtIndex(67,a)

        for (let i = 0; i < 4; i++) {
            
            platforms.create(128*5, 120*i,'baseGroundLogo')
            
        }

        platforms.create(128*7,513,'cornerGroundLogo')
        platforms.create(128*6,253,'cornerGroundLogo')

        for (let i = 0; i < 6; i++) {
            
            platforms.create(128*8, 120*i,'baseGroundLogo')
            
        }

        for (let index = 8; index < 18; index++) {
            
            platforms.create(128*index,0,'baseGroundLogo')
            
        }



        for (let i = 0; i < 6; i++) {
            
            platforms.create(128*8, 120*i,'baseGroundLogo')
            
        }

        for (let i = 0; i > -6; i--) {
            
            platforms.create(128*18, 120*i,'baseGroundLogo')
            
        }


        

        agrid.showNumbers()
        

        

        

        
        // Create Robot
        robot = this.physics.add.sprite(200,200,'robot')
        window.robot = robot
        window.scene = this
        // set collider with world
        robot.setBounce(0.1)
        //robot.setCollideWorldBounds(true)

        


        // shows Robotframes
        let frameNames = this.textures.get('robot').getFrameNames()
        console.log(frameNames)
        //Animate Robot frames
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNames('robot', {start: 0, end: 2, zeroPad: 1, prefix: 'character_robot_attack', suffix: '.png'}), 
            frameRate: 16,
            repeat: 1
        })

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('robot', {start: 0, end: 2, zeroPad: 1, prefix: 'character_robot_run', suffix: '.png'}),
            frameRate: 13, 
            repeat: infinite
        })

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('robot', {start: 0, end: 7, zeroPad: 1, prefix: 'character_robot_walk', suffix: '.png'}),
            frameRate: 13, 
            repeat: infinite
        })
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'robot', frame: "character_robot_jump.png"}],
            frameRate: 8, 
        })
        
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'robot', frame: "character_robot_idle.png"}],
            frameRate: 8, 
           
        })
        this.anims.create({
            key: 'slide',
            frames: [{ key: 'robot', frame: "character_robot_slide.png"}],
            frameRate: 8, 
        })

        this.physics.add.collider(robot,platforms)

        

        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        cursors = this.input.keyboard.createCursorKeys();
        //this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S });
        //this.input.keyboard.addKeys('W,S,A,D');
        //cursors.addKeys('W,S,A,D')
        //cursor = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S });

        
        //SETTING FOLLOWING CAMARA
        camera = this.cameras.main;
        camera.startFollow(robot);
        camera.setFollowOffset(-300, 225);
        


    }

    update () {
        if (keyZ.isDown) {
            robot.anims.play("attack", true)
        
        }  else if (cursors.right.isDown ) {
            robot.setVelocityX(100)
            if (cursors.shift.isDown) {
                robot.setVelocityX(170)
                
                robot.anims.play("run",true) 
                //robot.anims.play("walk",false)
            } else if(cursors.down.isDown) {
                robot.anims.play("slide",true) 

            } else {
                robot.anims.play("walk",true)
            }
            
        
            
             
        } else if (cursors.left.isDown) { 
            
            robot.setVelocityX(-120)
            robot.anims.play("walk",true)
          
        }
        else {
            
            robot.setVelocityX(0);
            
            robot.play("turn")
        }
        if (cursors.up.isDown && robot.body.touching.down) {
            robot.setVelocityY(-400)
            robot.anims.play("jump",true)
        }
    }
}