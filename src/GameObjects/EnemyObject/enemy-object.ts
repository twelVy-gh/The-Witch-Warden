import { Mesh } from "three";
import { EnemyType } from "../Types/enemy-type";
import { v4 as uuidv4 } from 'uuid';
import BombObject from "../BombObject/bomb-object";

class EnemyObject {
    type: EnemyType;
    yPos: number;
    life: number;
    uuid: string;
    refMesh: React.RefObject<Mesh>|null;
    constructor(type: EnemyType, yPos: number) {
          this.type = type;
          this.yPos = yPos;
          this.life = 100;
          this.uuid = uuidv4();
          this.refMesh = null;
      }

    injury(bomb: BombObject): number {
        let damage: number = 0
        let award: number = 0
        switch(bomb.type){
            case "bullet1": damage = 20; break;
            case "bullet2": damage = 30; break;
            case "bullet1": damage = 40; break;
        }   
        award = damage;
        this.life -= damage
        if(this.life <= 0){
            this.life = 0;
            award +=50;
        }
        return award;
    }
}

export default EnemyObject;