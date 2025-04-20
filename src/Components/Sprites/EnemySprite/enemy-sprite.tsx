import React, { useRef, useState, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useSelector } from 'react-redux'
import { Vector3 } from "three";
import EnemyObject from "../../GameObjects/EnemyObject/enemy-object";
import { useThree } from "@react-three/fiber";
import { Size } from "@react-three/fiber";
import { useDispatch } from 'react-redux'
import { deleteEnemy } from "../../../Store/Parts/game-objects";


type SpriteObjectProps = {
    obj: EnemyObject;
   
  };

function SpriteObject({obj}:SpriteObjectProps) {
  let {size} =  useThree();
  const [pos, setPos] = useState(size.width/2)
    const myMesh = useRef<Mesh>(null!);
    const dispatch = useDispatch()
    const killEnemy = (enemy: EnemyObject) => dispatch(deleteEnemy(enemy)) 
    useFrame(({ clock }) => {
      // const a = clock.getElapsedTime();
      if(pos < 0)
        killEnemy(obj)
      setPos(pos => { return pos - 0.1})
      myMesh.current.position.x = pos;
    });
  const textureImageURL = `/animations/${obj.type}.png`
  const textureDataURL = `/animations/${obj.type}.json`
    return (
        <mesh ref={myMesh} position={[pos, size.height/2 - obj.yPos / 100 * size.height  , 0]}>
        <mesh position={[2, 15, 0]}>
           <boxGeometry args={[10, 3, 1]} />
           <meshBasicMaterial color="#00ff00"/>
        </mesh>
        <SpriteAnimator 
            visible={true}
            scale={[10, 10, 10]}
            position={[0, 0   , 0]}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={12}
            asSprite={false}
            flipX={true}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            textureImageURL={textureImageURL}
            textureDataURL={ textureDataURL}
    />
      </mesh>

    );
  }

  export default SpriteObject;