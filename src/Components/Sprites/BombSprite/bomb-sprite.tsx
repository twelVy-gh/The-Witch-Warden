import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useThree } from "@react-three/fiber";
import { useDispatch } from 'react-redux'
import { damageCastle, deleteBomb,addExplosion } from "../../../Store/Parts/game-objects";
import BombObject from "../../../GameObjects/BombObject/bomb-object";
import ExplosionObject from "../../../GameObjects/ExplosionObject/explosion-object";
import { getOrCreateObjectFactory } from "../../../Util/ObjectFactory/object-factory";

type SpriteObjectProps = {
    obj: BombObject;
   
  };

function BombSpriteObject({obj}:SpriteObjectProps) {
  let {size} =  useThree();
  const [pos, setPos] = useState(obj.enemy?-size.width/4+200:-size.width/2 + 140)
    const Mesh = useRef<Mesh>(null!);
    obj.refMesh = Mesh;
    const dispatch = useDispatch()
    const destroy = (bomb: BombObject) => dispatch(deleteBomb(bomb)) 
    const damage = (damage:number, uuid:any)=>dispatch(damageCastle({"damage":damage, "uuid":uuid}))
    const makeExplosion = (explosion: ExplosionObject) => dispatch(addExplosion(explosion));
    useFrame(({ clock }) => {
      if((!obj.enemy&&pos > size.width/2)||(obj.enemy&&pos<-size.width/2+220)){
        if (obj.enemy){
          let dmg:number=0;
          switch(obj.type){
            case "boulder": dmg=10;break;
            case "leaves": dmg=1;break;
            case "skull":  dmg=3;break;
          }
          const bombMesh: Mesh|undefined = obj.refMesh?.current
          if (bombMesh) obj.box.setFromObject(bombMesh);
          obj.box.getCenter(obj.center); 
          const objFactory = getOrCreateObjectFactory();
          const explosion:ExplosionObject = objFactory.produceExplosion(obj.center.x, obj.center.y);          
          makeExplosion(explosion)
          damage(dmg, obj.uuid)
        }
        else{
          destroy(obj)
        }
      }
      setPos(pos => { return pos + (obj.enemy?-obj.speed:obj.speed)})
      Mesh.current.position.x = pos;
    });

  useEffect(()=>{
    
  },[])
  const textureImageURL = `/animations/bullets/${obj.type}/texture.png`
  const textureDataURL = `/animations/bullets/${obj.type}/meta.json`
    return (
        <mesh ref={Mesh} position={[pos,  obj.yPos , 0.1]}>
        <SpriteAnimator 
            visible={true}
            scale={[obj.size, obj.size, obj.size]}
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