import { useState} from "react";
import {Canvas} from "@react-three/fiber";
import { OrthographicCamera} from "@react-three/drei";
import { useSelector } from 'react-redux'
import {selectGameObjects, selectBombObjects, selectExplosionObjects} from "../../Store/Parts/game-objects"
import { getHealth } from "../../Store/Parts/game-objects";
import EnemySpriteObject from "../Sprites/EnemySprite/enemy-sprite";
import EnemyObject from "../../GameObjects/EnemyObject/enemy-object";
import WitchSpriteObject from "../Sprites/WitchSprite/witch-sprite";
import BombObject from "../../GameObjects/BombObject/bomb-object";
import BombSpriteObject from "../Sprites/BombSprite/bomb-sprite";
import ExplosionObject from "../../GameObjects/ExplosionObject/explosion-object";
import ExplosionSpriteObject from "../Sprites/ExplosionSprite/explosion-sprite";
import CastleHealth from "../CastleHealth";
import GameOverScreen from "../GameOverScreen";
 
// Размеры сцены и квадрата
const sceneSizes = {width: "100%", height: "100%"};

 
const Scene = () => {
  const [color, colorChange] = useState("blue"); // Состояние отвечает за цвет квадрата
   
  // Handler служит для того, чтобы
  const colorChangeHandler = () => {
    // Просто поочерёдно меняем цвет с серого на синий и с синего на белый
    colorChange((prevColor) => (prevColor === "white" ? "blue" : "white"));
  };
  const health = useSelector(getHealth)
  const objects = useSelector(selectGameObjects)
  const bullets = useSelector(selectBombObjects)
  const explosions = useSelector(selectExplosionObjects)

 
   
  return (
    <div className="main-scene">
      <Canvas className="container"  >
        <OrthographicCamera makeDefault position={[0, 0, 1]} />
        <WitchSpriteObject/>
        <CastleHealth/>

        {     
      objects.map( (obj: EnemyObject) => {
            return <EnemySpriteObject key = {obj.uuid} obj={obj} />
      })  
      }

     {     
      bullets.map( (b: BombObject) => {
            return <BombSpriteObject key = {b.uuid} obj={b} />
      })  
      }

{     
      explosions.map( (e: ExplosionObject) => {
            return <ExplosionSpriteObject key = {e.uuid} obj={e} />
      })  
      }

   
      </Canvas>
      {health<=0&&<GameOverScreen/>}
    </div>
  );
};
 
export default Scene;