import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useThree } from "@react-three/fiber";
import { useDispatch } from 'react-redux'
import { deleteBomb } from "../../../Store/Parts/game-objects";
import BombObject from "../../../GameObjects/BombObject/bomb-object";


type SpriteObjectProps = {
    obj: BombObject;
   
  };

function BombSpriteObject({obj}:SpriteObjectProps) {
  let {size} =  useThree();
  const [pos, setPos] = useState(-size.width/2 + 70)
    const bombMesh = useRef<Mesh>(null!);
    obj.refMesh = bombMesh;
    const dispatch = useDispatch()
    const destroy = (bomb: BombObject) => dispatch(deleteBomb(bomb)) 
    useFrame(({ clock }) => {
      if(pos > size.width/2)
        destroy(obj)
      setPos(pos => { return pos + 6})
      bombMesh.current.position.x = pos;
    });

  useEffect(()=>{
    
  },[])
  const textureImageURL = `/animations/bullets/${obj.type}/texture.png`
  const textureDataURL = `/animations/bullets/${obj.type}/meta.json`
    return (
        <mesh ref={bombMesh} position={[pos,  obj.yPos , 0.1]}>
        <SpriteAnimator 
            visible={true}
            scale={[5, 5, 5]}
            position={[0, 0   , 0]}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={12}
            asSprite={false}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            textureImageURL={textureImageURL}
            textureDataURL={ textureDataURL}
    />
      </mesh>

    );
  }

  export default BombSpriteObject;