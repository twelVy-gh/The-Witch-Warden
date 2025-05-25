import { BombType } from "../Types/bomp-type";
import { v4 as uuidv4 } from 'uuid';
import { Mesh,Box3,Vector3 } from "three";
import EnemyObject from "../EnemyObject/enemy-object";

class BombObject {
    type: BombType;
    speed: number;
    size: number;
    enemy: boolean;
    yPos: number;
    uuid: string;
    box: Box3;
    center: Vector3;
    injured: Array<string>;
    refMesh: React.RefObject<Mesh>|null;
    constructor(type: BombType, yPos: number,enemy:boolean) {
          this.type = type;
          this.enemy = enemy;
          switch(type){
            case "boulder": this.speed = 6;this.size = 10;break
            case "fireball": this.speed = 24;this.size = 7;break
            case "wave": this.speed = 12;this.size = 13;break
            case "leaves":this.speed = 12;this.size=8;break
            case "skull":this.speed=4;this.size=7;break;
          }
          this.injured=[];
          this.yPos = yPos;
          this.uuid = uuidv4()
          this.refMesh = null;
          this.box = new Box3();
          this.center = new Vector3();
      }
}

export default BombObject;