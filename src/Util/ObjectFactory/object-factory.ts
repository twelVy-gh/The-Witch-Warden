import EnemyObject from "../../Components/GameObjects/EnemyObject/enemy-object";

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
  }


  export default ObjectFactory;