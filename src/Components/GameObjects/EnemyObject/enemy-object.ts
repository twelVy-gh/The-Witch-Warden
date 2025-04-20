import { EnemyType } from "../EnemyTypes/enemy-type";
import { v4 as uuidv4 } from 'uuid';

class EnemyObject {
    type: EnemyType;
    yPos: number;
    life: number;
    uuid: string;
    constructor(type: EnemyType, yPos: number) {
          this.type = type;
          this.yPos = yPos;
          this.life = 100;
          this.uuid = uuidv4()
      }
}

export default EnemyObject;