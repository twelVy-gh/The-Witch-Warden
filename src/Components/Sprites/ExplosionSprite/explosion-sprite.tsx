import React, { useRef, useEffect } from "react";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useDispatch } from 'react-redux'
import { deleteExplosion } from "../../../Store/Parts/game-objects";
import ExplosionObject from "../../../GameObjects/ExplosionObject/explosion-object";
import explosionSound from "../../../../public/sounds/explosion.mp3";
import { playSound } from "../../../helpers/SoundHelper/sound-helper";


type SpriteObjectProps = {
    obj: ExplosionObject;
   
  };

type AnimationEventData = {
    currentFrameName: string;
    currentFrame: number;
  };
  

function ExplosionSpriteObject({obj}:SpriteObjectProps) {
   const explosionMesh = useRef<Mesh>(null!);
   const dispatch = useDispatch()

   const clearExplosion = (explosion: ExplosionObject) => dispatch(deleteExplosion(explosion)) 

   const endAnimation = (data: AnimationEventData) => {
      clearExplosion(obj)
  }

//   const [play] = useSound(explosionSound);
//   play();
   playSound("explosion")

   const textureImageURL = `/animations/explosion/texture.png`
   const textureDataURL = `/animations/explosion/meta.json`
    return (
        <mesh ref={explosionMesh} position={[obj.xPos,  obj.yPos , 0.1]}>
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
            onLoopEnd={ endAnimation }
            textureImageURL={textureImageURL}
            textureDataURL={ textureDataURL}
    />
      </mesh>

    );
  }

  export default ExplosionSpriteObject;