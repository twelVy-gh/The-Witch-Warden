import EnemyObject from "../../GameObjects/EnemyObject/enemy-object";
import BombObject from "../../GameObjects/BombObject/bomb-object";
import ExplosionObject from "../../GameObjects/ExplosionObject/explosion-object";

class ObjectFactory {
    produceEnemy(): EnemyObject {
         const yPos: number = Math.floor(Math.random() * 100)
        const type =  Math.random()
        if( type < 0.3)
           return new EnemyObject("enemy1", yPos);
        else
         if( type < 0.6)
          return new EnemyObject("enemy2", yPos);
         else
           return new EnemyObject("enemy3", yPos);
    }


    produceBomb(type: number, yPos: number): BombObject | null {
      switch (type) {
        case 1 :  return new BombObject("bullet1", yPos); break;
        case 2 :  return new BombObject("bullet2", yPos); break;
        case 3 :  return new BombObject("bullet3", yPos); break;
      }
      return null;
 }
     produceExplosion(xPos:number, yPos: number): ExplosionObject  {
      return new ExplosionObject(xPos, yPos);
   }
  }


  export default ObjectFactory;

  let factory: ObjectFactory | null = null
  export const getOrCreateObjectFactory = () => factory ? factory: new ObjectFactory()
