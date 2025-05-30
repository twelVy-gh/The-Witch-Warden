import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {  selectUserAction,  changeUserAction, isNowFire, endFire } from "../../../Store/Parts/command";
import { useThree } from "@react-three/fiber";
import { getOrCreateObjectFactory } from "../../../Util/ObjectFactory/object-factory";
import BombObject from "../../../GameObjects/BombObject/bomb-object";
import { addBomb } from "../../../Store/Parts/game-objects";
import { throttle } from "../../../Util/Functions/functions";
import { playSound } from "../../../helpers/SoundHelper/sound-helper";


type AnimationEventData = {
  currentFrameName: string;
  currentFrame: number;
};

const selectAnimation = (userAction: number):string=>{
    switch(userAction){
      case 0: return "witch";
      case 1: return "witch-run";
      case -1: return "witch-run";
      default: return "fire";
    }
}



function WitchSpriteObject() {
  const speed: number = 6;
  let {size} =  useThree();
  const [pos, setPos] = useState(0)
  //const [fps, setFPS] = useState(10)
  // const  direction  = useSelector(selectDirection)
  const  userAction  = useSelector(selectUserAction)
  const [curAnim, setCurAnim] = useState("witch")
  const myMesh = useRef<Mesh>(null!);
  const dispatch = useDispatch()
   const changeAction = (actionCode: number) => dispatch(changeUserAction(actionCode)) 
   const addNewBomb = (bomb: BombObject) => dispatch(addBomb(bomb)) 
   const cancelFire = () => dispatch(endFire()) 
   const endAnimation = (data: AnimationEventData) => {
    cancelFire()
  }
  const  isFire  = useSelector(isNowFire)
 
 
  let  createFire = useCallback(throttle((action: number, p:number, bombCreator: any) => {
      const objFactory = getOrCreateObjectFactory()
      const bomb: BombObject|null = objFactory.produceBomb(action, p,false);
      if(bomb)
        bombCreator(bomb)
        }, 500
      ), []);

  let  createBoulder = useCallback(throttle((action: number, p:number, bombCreator: any) => {
      const objFactory = getOrCreateObjectFactory()
      const bomb: BombObject|null = objFactory.produceBomb(action, p,false);
      if(bomb)
        bombCreator(bomb)
        }, 1000
      ), []);

  let  createWave = useCallback(throttle((action: number, p:number, bombCreator: any) => {
      const objFactory = getOrCreateObjectFactory()
      const bomb: BombObject|null = objFactory.produceBomb(action, p,false);
      if(bomb)
        bombCreator(bomb)
        }, 5000
      ), []);

  useEffect(()=>{
    const anim: string = selectAnimation(userAction)
    setCurAnim(anim)  
    //let fps:number = 10
    // switch(userAction){
    //   case 3: fps = 8; break
    //   case 4: fps = 6; break
    // }
    // setFPS(fps)

  }, [userAction])    
  
  useFrame(({ clock }) => {
    if(pos < -size.height/2)
      setPos(size.height/2)
    if(pos > size.height/2)
      setPos(-  size.height/2)
    const direction = userAction == -1 || userAction == 1 ? userAction : 0
    setPos(pos => { return pos + direction*speed})
    myMesh.current.position.y = pos;
  });


  if(isFire && createFire != undefined&&createWave != undefined&&createBoulder != undefined){
    playSound("shot");
    switch (userAction){
      case 2: createFire(userAction,pos,addNewBomb); break
      case 3: createBoulder(userAction,pos,addNewBomb); break
      case 4: createWave(userAction,pos,addNewBomb); break
    }
  }
  return (
        <mesh ref={myMesh}  position={[-size.width/2+120, pos  , 0]}>

        <SpriteAnimator 
            visible={true}
            scale={[10, 10, 10]}
            position={[0, 0  , 0]}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={10}
            asSprite={false}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            onLoopEnd={isFire ? endAnimation : undefined}
            textureImageURL={`/animations/witch/${curAnim}.png`}
            textureDataURL={`/animations/witch/${curAnim}.json`}
    />
      </mesh>

    );
}

export default WitchSpriteObject