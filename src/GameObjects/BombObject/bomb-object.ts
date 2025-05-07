import { BombType } from "../Types/bomp-type";
import { v4 as uuidv4 } from 'uuid';
import { Mesh,Box3,Vector3 } from "three";
import EnemyObject from "../EnemyObject/enemy-object";

class BombObject {
    type: BombType;
    speed: number;
    size: number;
    yPos: number;
    uuid: string;
    box: Box3;
    center: Vector3;
    injured: Array<string>;
    refMesh: React.RefObject<Mesh>|null;
    constructor(type: BombType, yPos: number) {
          this.type = type;
          switch(type){
            case "boulder": this.speed = 6;this.size = 2;break
            case "fireball": this.speed = 24;this.size = 1;break
            case "wave": this.speed = 12;this.size = 3;break
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