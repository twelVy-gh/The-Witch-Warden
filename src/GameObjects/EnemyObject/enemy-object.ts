import { Mesh, Box3, Vector3 } from "three";
import { EnemyType } from "../Types/enemy-type";
import { v4 as uuidv4 } from 'uuid';
import BombObject from "../BombObject/bomb-object";

class EnemyObject {
    type: EnemyType;
    yPos: number;
    life: number;
    lifeMax: number;
    speed: number;
    size: number;
    uuid: string;
    box: Box3;
    center: Vector3;
    refMesh: React.RefObject<Mesh>|null;
    constructor(type: EnemyType, yPos: number) {
          this.type = type;
          this.yPos = yPos;
          switch(type){
            case "golem": this.lifeMax=100; this.speed = 0.5;this.size = 50; break;
            case "skeleton": this.lifeMax=50; this.speed = 3;this.size = 30; break;
            case "plant": this.lifeMax= 80; this.speed = 1;this.size = 30; break;
            default: this.lifeMax=70; this.speed = 1;this.size = 40; break;
          }
          this.life=this.lifeMax;
          this.uuid = uuidv4();
          this.refMesh = null;
          this.box = new Box3()
          this.center = new Vector3()
      }

    injury(bomb: BombObject): number {
        let damage: number = 0
        let award: number = 0
        switch(bomb.type){
            case "fireball": damage = 20; break;
            case "boulder": damage = 50; break;
            case "wave": damage = 20; break;
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