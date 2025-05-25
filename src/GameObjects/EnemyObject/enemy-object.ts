import { Mesh, Box3, Vector3 } from "three";
import { EnemyType } from "../Types/enemy-type";
import { v4 as uuidv4 } from 'uuid';
import { getOrCreateObjectFactory } from "../../Util/ObjectFactory/object-factory";
import { useThree } from "@react-three/fiber";
import BombObject from "../BombObject/bomb-object";

class EnemyObject {
    type: EnemyType;
    yPos: number;
    life: number;
    lifeMax: number;
    speed: number;
    uuid: string;
    box: Box3;
    center: Vector3;
    shooter: boolean;
    lastshot: number;
    freq: number;
    refMesh: React.RefObject<Mesh>|null;
    constructor(type: EnemyType, yPos: number) {
          this.type = type;
          this.yPos = yPos;
          switch(type){
            case "golem": this.lifeMax=100; this.speed = 0.5;this.freq=5; break;
            case "skeleton": this.lifeMax=50; this.speed = 3;this.freq = 0; break;
            case "plant": this.lifeMax= 80; this.speed = 1;this.freq = 3; break;
            default: this.lifeMax=70; this.speed = 1;this.freq = 0; break;
          }
          this.life=this.lifeMax;
          this.uuid = uuidv4();
          this.refMesh = null;
          this.box = new Box3()
          this.center = new Vector3()
          this.shooter =true;
          this.lastshot = 0;
      }

    canShoot(clock:number): boolean{
        if(this.lastshot === 0){
            this.lastshot = clock;
            return true;
        } else {
            if(clock-this.lastshot>this.freq){
                this.lastshot=clock
                return true;
            }else{
                return false;
            }
        }

       
        
    }

    injury(bomb: BombObject): number {
        let damage: number = 0
        let award: number = 0
        switch(bomb.type+" "+this.type){
            case "fireball skeleton": damage = 20; break;
            case "fireball golem": damage = 20; break;
            case "fireball plant": damage = 60; break;
            case "boulder skeleton": damage = 50; break;
            case "boulder golem": damage =(this.life+20<this.lifeMax)? -20: -this.lifeMax+this.life; break;
            case "boulder plant": damage = 50; break;
            case "wave skeleton": damage = 20; this.speed=-3; setTimeout(()=>this.speed = 3,1000);break;
            case "wave golem": damage = 50; break;
            case "wave plant": damage = 20; this.speed=-0.5;setTimeout(()=>this.speed = 1,500);break;
        }
        this.life -= damage
        if(this.life <= 0){
            this.life = 0;
            award +=100;
        }
        return award;
    }
}

export default EnemyObject;