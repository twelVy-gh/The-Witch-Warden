import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useSelector } from 'react-redux'
import { selectDirection } from "../../../Store/Parts/command";
import { useThree } from "@react-three/fiber";


function WitchSpriteObject() {
  let {size} =  useThree();
  const [pos, setPos] = useState(0)
  const  direction  = useSelector(selectDirection)
  const myMesh = useRef<Mesh>(null!);
  useFrame(({ clock }) => {
    // const a = clock.getElapsedTime();
    if(pos < -size.height/2)
      setPos(size.height/2)
    if(pos > size.height/2)
      setPos(-  size.height/2)
    setPos(pos => { return pos + direction})
    myMesh.current.position.y = pos;
  });
  return (
        <mesh ref={myMesh}  position={[-size.width/2 + 200, pos  , 0]}>

        <SpriteAnimator 
            visible={true}
            scale={[10, 10, 10]}
            position={[0, 0   , 0]}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={direction===0?0:12}
            asSprite={false}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            textureImageURL={direction===0?"/animations/witch/witch.png":"/animations/witch/witch-run.png"}
            textureDataURL={direction===0?"/animations/witch/witch.json":"/animations/witch/witch-run.json"}
    />
      </mesh>

    );
}

export default WitchSpriteObject