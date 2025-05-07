import EnemyObject from "../../GameObjects/EnemyObject/enemy-object";
import BombObject from "../../GameObjects/BombObject/bomb-object";
import ExplosionObject from "../../GameObjects/ExplosionObject/explosion-object";

class ObjectFactory {
    produceEnemy(): EnemyObject {
         const yPos: number = Math.floor(Math.random() * 10)*10
        const type =  Math.random()
        if( type < 0.33)
           return new EnemyObject("golem", yPos);
        else
         if( type < 0.66)
          return new EnemyObject("skeleton", yPos);
         else
           return new EnemyObject("plant", yPos);
    }


    produceBomb(type: number, yPos: number): BombObject | null {
      switch (type) {
        case 2 :  return new BombObject("fireball", yPos); break;
        case 3 :  return new BombObject("boulder", yPos); break;
        case 4 :  return new BombObject("wave", yPos); break;
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
