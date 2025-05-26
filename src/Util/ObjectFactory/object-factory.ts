import EnemyObject from "../../GameObjects/EnemyObject/enemy-object";
import BombObject from "../../GameObjects/BombObject/bomb-object";
import ExplosionObject from "../../GameObjects/ExplosionObject/explosion-object";
import { throttle } from "lodash";

class ObjectFactory {

    // enemyBomb1Creator: (type: number, yPos: number)=> BombObject | null | undefined;
    
    // constructor() {
    //     this.enemyBomb1Creator = (type: number, yPos: number) => {
    //           return this.produceBomb(type, yPos, true)
    //     }
        
    // }
    
    produceEnemy(): EnemyObject {
        const yPos: number = Math.floor(Math.random() * 20)*8
        const type =  Math.random()
        if( type < 0.33)
           return new EnemyObject("golem", yPos);
        else
         if( type < 0.66)
          return new EnemyObject("skeleton", yPos);
         else
           return new EnemyObject("plant", yPos);
    }


    produceBomb(type: number, yPos: number, enemy:boolean): BombObject | null {
      switch (type) {
        case 2 :  return new BombObject("fireball", yPos,enemy); break;
        case 3 :  return new BombObject("boulder", yPos,enemy); break;
        case 4 :  return new BombObject("wave", yPos,enemy); break;
        case 5 :  return new BombObject("leaves", yPos,enemy); break;
        case 6 :  return new BombObject("skull", yPos,enemy); break;
      }
      return null;
 }


     
     produceExplosion(xPos:number, yPos: number): ExplosionObject  {
      return new ExplosionObject(xPos, yPos);
   }
  }


  export default ObjectFactory;

  let factory: ObjectFactory | null = null
  export const getOrCreateObjectFactory = () => {

    if (!factory) 
      factory = new ObjectFactory();
    return factory;
  }
