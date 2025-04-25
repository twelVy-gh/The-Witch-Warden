import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { useSelector } from 'react-redux'
import {selectDirection} from "../../Store/Parts/motion"
import { Vector3 } from "three";
import { TextureLoader } from 'three'

type StaticObjectProps = {
    position: Vector3;
    texture: string
  };

function StaticObject({position, texture}:StaticObjectProps) {
    const [pos, setPos] = useState(100)
    const  direction  = useSelector(selectDirection)
    const myMesh = useRef<Mesh>(null!);
    const colorMap = useLoader(TextureLoader, '/public/textures/'+texture )
  
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      setPos(pos => { return pos > 300?  0 : pos < 0 ? 300: pos + direction})
      myMesh.current.position.x = pos;
    });
  
    return (
        <mesh ref={myMesh} position={position}>
           <boxGeometry args={[100, 100]}/>
           <meshBasicMaterial map={colorMap}/>
        </mesh>

    );
  }

  export default StaticObject;