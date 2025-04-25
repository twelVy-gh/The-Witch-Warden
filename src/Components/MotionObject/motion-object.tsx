import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
// import { useAppContext } from "../../hooks/useAppContext";
import { useSelector } from 'react-redux'
import {selectDirection} from "../../Store/Parts/motion"

function MotionObject() {
    const [pos, setPos] = useState(100)
    const  direction  = useSelector(selectDirection)
    const myMesh = useRef<Mesh>(null!);
  
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      setPos(pos => { return pos > 300?  0 : pos < 0 ? 300: pos + direction})
      myMesh.current.position.x = pos;
    });
  
    return (
        <mesh ref={myMesh} position={[100, 100, 0]}>
        <SpriteAnimator 
            visible={true}
            scale={[30, 30, 30]}
            position={[100, 10, -0]}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={direction===0? 0: 12}
            asSprite={false}
            flipX={direction===-1}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            textureImageURL={'/animations/spritesheet.png'}
            textureDataURL={'/animations/spritesheet.json'}
    />
      </mesh>

    );
  }

  export default MotionObject;