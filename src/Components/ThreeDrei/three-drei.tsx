import {useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Plane, OrthographicCamera} from "@react-three/drei";
import { useSelector } from 'react-redux'
import {selectGameObjects} from "../../Store/Parts/game-objects"
import SpriteObject from "../SpriteAnimatedObject/sprite-animated-object";
import StaticObject from "../StaticAnimatedObject/static-animated-object";
import EnemyObject from "src/GameObjects/EnemyObject/enemy-object.ts";


//import SpriteMetadata from "../../assets/animations/TOLSTYAK/spritesheet.json"
 
// Размеры сцены и квадрата
const sceneSizes = {width: "100%", height: "100%"};

 
const ThreeDrei = () => {
  const [color, colorChange] = useState("blue"); // Состояние отвечает за цвет квадрата
 
  // Handler служит для того, чтобы
  const colorChangeHandler = () => {
    // Просто поочерёдно меняем цвет с серого на синий и с синего на белый
    colorChange((prevColor) => (prevColor === "white" ? "blue" : "white"));
  };
  const objects = useSelector(selectGameObjects)
  
  return (
    <div className="main-scene">
      {/* Здесь задаются параметры, которые отвечают за стилизацию сцены */}
      <Canvas className="container" style={{...sceneSizes}}>
        {/* Камера задаётся по аналогии с нативной three.js, но нужно задать параметр makeDefault, 
        чтобы применить именно её, а не камеру заданную по умолчанию */}
        <OrthographicCamera makeDefault position={[100, 0, 1]} />
      


      {     
      objects.map( (obj: EnemyObject) => {
            return <SpriteObject key = {obj.uuid} obj={obj} />
      })  
      }

   
      </Canvas>
    </div>
  );
};
 
export default ThreeDrei;