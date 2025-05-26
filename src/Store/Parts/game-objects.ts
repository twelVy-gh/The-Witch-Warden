import { createSlice } from '@reduxjs/toolkit'
import EnemyObject from '../../GameObjects/EnemyObject/enemy-object'
import BombObject from '../../GameObjects/BombObject/bomb-object'
import ExplosionObject from '../../GameObjects/ExplosionObject/explosion-object'


type GameObjects = {
	gameObjectsList: EnemyObject[],
	gameBombList: BombObject[],
	gameExplosionList: ExplosionObject[],
	score: number, 
	health: number
}

const initialState: GameObjects = {
    gameObjectsList: [],
	gameBombList: [],
	gameExplosionList: [],
	score: 0,
	health: 100
	
}

const gameObjectSlice = createSlice({
	name: 'game-objects',
	initialState,
	reducers: {
		addEnemy(state, action) {
			state.gameObjectsList = [...state.gameObjectsList, action.payload]
		},
		deleteEnemy(state, action){
			state.gameObjectsList = state.gameObjectsList.filter( obj => {return obj.uuid !== action.payload.uuid})
		},
		addBomb(state, action) {
			// const bomb = state.gameBombList.filter( obj => {return obj.uuid !== action.payload.uuid});
			// if(bomb.length === 0)
			     state.gameBombList = [...state.gameBombList, action.payload]
		},
		deleteBomb(state, action){
			state.gameBombList = state.gameBombList.filter( obj => {return obj.uuid !== action.payload.uuid})
		},
		woundEnemy(state, action){
			const bomb:BombObject = action.payload.bomb;
			const enemy:EnemyObject = action.payload.enemy;
            state.score += action.payload.award
			bomb.injured.push(enemy.uuid)
			if (bomb.type!="wave") state.gameBombList = state.gameBombList.filter( obj => {return obj.uuid !== bomb.uuid})
			if(enemy.life === 0){
				state.gameObjectsList = state.gameObjectsList.filter( obj => {return obj.uuid !== enemy.uuid})
			}		
		},
		addExplosion(state, action) {
			state.gameExplosionList = [...state.gameExplosionList, action.payload]
		},
		deleteExplosion(state, action){
			state.gameExplosionList = state.gameExplosionList.filter( obj => {return obj.uuid !== action.payload.uuid})
			
		},
		damageCastle(state,action){
			state.health-=action.payload.damage
			state.gameBombList = state.gameBombList.filter( obj => {return obj.uuid !== action.payload.uuid})
		},
		restart(state,action){
			state.health=100;
			state.score =0;
			state.gameBombList = [];
			state.gameObjectsList=[];
			state.gameExplosionList =[]
		}
	}
})

export const selectGameObjects = (state: any) => state.game_objects.gameObjectsList
export const selectBombObjects = (state: any) => state.game_objects.gameBombList
export const selectExplosionObjects = (state: any) => state.game_objects.gameExplosionList
export const countEnemies = (state: any) => state.game_objects.gameObjectsList.length
export const getScore = (state: any) => state.game_objects.score
export const getHealth = (state:any)=> state.game_objects.health

export const { addEnemy, 
	           deleteEnemy, 
			   addBomb, 
			   deleteBomb, 
			   woundEnemy, 
			   addExplosion, 
			   deleteExplosion,
			   damageCastle,
			   restart
			} = gameObjectSlice.actions

export default gameObjectSlice.reducer