import { useState, useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import Scene from "./Components/Scene/scene"
import EnemyObject from './GameObjects/EnemyObject/enemy-object';
import { useDispatch } from 'react-redux'
import { addEnemy } from './Store/Parts/game-objects';
import { changeUserAction } from './Store/Parts/command';
import { getOrCreateObjectFactory } from './Util/ObjectFactory/object-factory';


function App() {

  const dispatch = useDispatch()
  const addNewEnemy = (enemy: EnemyObject) => dispatch(addEnemy(enemy)) 
  const changeAction = (actionCode: number) => dispatch(changeUserAction(actionCode)) 

  useEffect(
    () => {
        
        const objFactory = getOrCreateObjectFactory()
        const id = setInterval(()=>{
          const p: number = Math.floor(Math.random() * 100)
          if(p < 20) {
              const enemy:EnemyObject = objFactory.produceEnemy();
              addNewEnemy(enemy)
          }

        //   const b: number = Math.floor(Math.random() * 100)
        //   if(b < 20) {
        //     if(b < 20)
        //       changeAction(1)
        //     else
        //       if(b < 15) 
        //         changeAction(2)
        //       else
        //         changeAction(3)
        // }
        }, 1000);
        return () => clearInterval(id);
    }, [] );
  return (
    <Scene/>
    
  )
}

export default App
