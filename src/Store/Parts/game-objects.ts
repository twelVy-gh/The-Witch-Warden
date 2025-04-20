import { createSlice } from '@reduxjs/toolkit'
import EnemyObject from '../../Components/GameObjects/EnemyObject/enemy-object'


type GameObjects = {
	gameObjectsList: EnemyObject[]
}

const initialState: GameObjects = {
    gameObjectsList: []
	
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
		}
	}
})



export const selectGameObjects = (state: any) => state.game_objects.gameObjectsList
export const countEnemies = (state: any) => state.game_objects.gameObjectsList.length

export const { addEnemy, deleteEnemy } = gameObjectSlice.actions

export default gameObjectSlice.reducer