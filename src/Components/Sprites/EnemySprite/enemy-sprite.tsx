import React, { useCallback, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {SpriteAnimator} from "@react-three/drei"
import { useSelector } from 'react-redux'
import EnemyObject from "../../../GameObjects/EnemyObject/enemy-object";
import { useThree } from "@react-three/fiber";
import { useDispatch } from 'react-redux'
import { deleteEnemy } from "../../../Store/Parts/game-objects";
import { selectBombObjects, woundEnemy } from "../../../Store/Parts/game-objects";
import BombObject from "../../../GameObjects/BombObject/bomb-object";
import { getOrCreateObjectFactory } from "../../../Util/ObjectFactory/object-factory";
import ExplosionObject from "../../../GameObjects/ExplosionObject/explosion-object";
import { addExplosion, addBomb } from "../../../Store/Parts/game-objects";
import { indexOf } from "lodash";
import { throttle } from "../../../Util/Functions/functions";

type SpriteObjectProps = {
    obj: EnemyObject;
  };
  


function EnemySpriteObject({obj}:SpriteObjectProps) {
  let {size} =  useThree();
  const [pos, setPos] = useState(size.width/2)
    const enemyMesh = useRef<Mesh>(null!);
    obj.refMesh = enemyMesh;
    const dispatch = useDispatch()
    const killEnemy = (enemy: EnemyObject) => dispatch(deleteEnemy(enemy)) 
    const addNewBomb = (bomb: BombObject) => dispatch(addBomb(bomb)) 
    const injuryEnemy = (enemy: EnemyObject, bomb: BombObject, award: number) => dispatch(woundEnemy({"enemy": enemy, "bomb":bomb, "award": award})) 
    const makeExplosion = (explosion: ExplosionObject) => dispatch(addExplosion(explosion));
    const bullets = useSelector(selectBombObjects)
   
    useFrame(({ clock }) => {
      findIntersection(obj, bullets)
      setPos(pos => { return pos - obj.speed})
      if(pos < -size.width/4+240){
        obj.speed=0;
      }
      if (obj.speed === 0&&obj.canShoot(clock.elapsedTime)){
        let type:number = 0
        switch (obj.type){
          case "golem": type = 3; break;
          case "skeleton": type = 6; break;
          case "plant": type = 5; break;
        }
        const bomb = getOrCreateObjectFactory().produceBomb(type, size.height/2 - obj.yPos / 100 * size.height,true)
        if (bomb) addNewBomb(bomb);
        if (obj.type=="skeleton") killEnemy(obj);
      }
      enemyMesh.current.position.x = pos;
    });

    const findIntersection = (enemy: EnemyObject, bullets: BombObject[]) => {
      const enemyMesh: Mesh|undefined = enemy.refMesh?.current
      
     
      if(enemyMesh){
        enemy.box.setFromObject(enemyMesh);
        bullets.forEach((bullet: BombObject) => {
          if (!bullet.enemy&&indexOf(bullet.injured,enemy.uuid)===-1){
            const bulletMesh: Mesh|undefined = bullet.refMesh?.current
            if( bulletMesh && enemy.box){
              bullet.box.setFromObject(bulletMesh);
              enemy.box.getCenter(enemy.center);
              bullet.box.getCenter(bullet.center); 
              if(bullet.center.distanceTo(enemy.center)<((bullet.size*bullet.size)/2+30)){
                  const award = enemy.injury(bullet)
                  if(enemy.life === 0) {
                    const objFactory = getOrCreateObjectFactory();
                    
                    const explosion:ExplosionObject = objFactory.produceExplosion(enemy.center.x, enemy.center.y);
                    
                    makeExplosion(explosion)
                  }
                  injuryEnemy(enemy, bullet, award)
                }
            }
          }
        })
      }
    } 


  const textureImageURL = `/animations/enemies/${obj.type}/texture.png`
  const textureDataURL = `/animations/enemies/${obj.type}/meta.json`
    return (
        <mesh ref={enemyMesh} position={[pos, size.height/2 - obj.yPos / 100 * size.height , 0]}>
        <mesh position={[0, 30, 0]}>
           <boxGeometry args={[(obj.lifeMax/2)+4, 10, 1]} />
           <meshBasicMaterial color="#010203"/>
        </mesh>
        <mesh position={[(obj.lifeMax-obj.life)/4, 30, 0]}>
           <boxGeometry args={[obj.life/2, 6, 1]} />
           <meshBasicMaterial color="#00ff00"/>
        </mesh>
        <SpriteAnimator 
            visible={true}
            scale={[8, 8, 8]}
            position={[0, 0   , 0]}
            autoPlay={true}
            loop={true}
            startFrame={0}
            fps={10}
            asSprite={false}
            rotation={[0, 0, 0]}
            alphaTest={0.001}
            textureImageURL={textureImageURL}
            textureDataURL={ textureDataURL}
    />
      </mesh>

    );
  }

  export default EnemySpriteObject;