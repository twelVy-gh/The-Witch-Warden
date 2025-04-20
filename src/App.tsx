import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MPStart from './MPStart'
import Scene from "./Components/Scene/scene"
import ObjectFactory from './Util/ObjectFactory/object-factory';
import EnemyObject from './Components/GameObjects/EnemyObject/enemy-object';
import { useDispatch } from 'react-redux'
import { addEnemy } from './Store/Parts/game-objects';

function App() {

  const dispatch = useDispatch()
  const addNewEnemy = (enemy: EnemyObject) => dispatch(addEnemy(enemy)) 

  useEffect(
    () => {
        const objGenerator = new ObjectFactory()
        const id = setInterval(()=>{
          const p: number = Math.floor(Math.random() * 100)
          if(p < 20) {
              const enemy:EnemyObject = objGenerator.produceEnemy();
              addNewEnemy(enemy)
          }
        }, 1000);
        return () => clearInterval(id);
    }, [] );
  return (
    <Scene/>
    
  )
}

export default App
