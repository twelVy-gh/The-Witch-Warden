import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useSelector } from 'react-redux'
import {selectDirection} from "../../Store/Parts/command"
import { Vector3 } from "three";

type SpriteObjectProps = {
    position: Vector3;
    textureImageURL: string;
    textureDataURL: string;
  };

function SpriteObject({position, textureImageURL, textureDataURL}:SpriteObjectProps) {
    const [pos, setPos] = useState(100)
    const  direction  = useSelector(selectDirection)
    const myMesh = useRef<Mesh>(null!);
  
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      setPos(pos => { return pos > 300?  0 : pos < 0 ? 300: pos + direction})
      myMesh.current.position.y = pos;
    });
  
    return (
        <mesh ref={myMesh} position={position}>
        <SpriteAnimator 
            visible={true}
            scale={[30, 30, 30]}
            position={position}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={direction===0? 0: 12}
            asSprite={false}
            flipX={direction===-1}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            textureImageURL={textureImageURL}
            textureDataURL={ textureDataURL}
    />
      </mesh>

    );
  }

  export default SpriteObject;