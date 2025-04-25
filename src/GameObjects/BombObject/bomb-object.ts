import { BombType } from "../Types/bomp-type";
import { v4 as uuidv4 } from 'uuid';
import { Mesh } from "three";

class BombObject {
    type: BombType;
    yPos: number;
    uuid: string;
    refMesh: React.RefObject<Mesh>|null;
    constructor(type: BombType, yPos: number) {
          this.type = type;
          this.yPos = yPos;
          this.uuid = uuidv4()
          this.refMesh = null;
      }
}

export default BombObject;