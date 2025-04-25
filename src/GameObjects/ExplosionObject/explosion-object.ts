import { v4 as uuidv4 } from 'uuid';
import { Mesh } from "three";

class ExplosionObject {
    yPos: number;
    xPos: number;
    uuid: string;
    refMesh: React.RefObject<Mesh>|null;
    constructor(xPos: number, yPos: number) {
          this.xPos = xPos;
          this.yPos = yPos;
          this.uuid = uuidv4()
          this.refMesh = null;
      }
}

export default ExplosionObject;