import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    direction: 1,
	userAction: 0

}

const motionSlice = createSlice({
	name: 'command',
	initialState,
	reducers: {
		changeDirection(state, action) {
			state.direction = action.payload
		},
		changeUserAction(state, action){
			if(!(state.userAction > 1 && state.userAction < 5))
			  state.userAction = action.payload
		},
		endFire(state){
			state.userAction = 0
		}
	}
})



export const selectDirection = (state: any) => state.commands.direction;

export const selectUserAction = (state: any) => state.commands.userAction;

export const isNowFire = (state: any) => { 
	return state.commands.userAction > 1 && state.commands.userAction < 5 
}

export const { changeDirection, changeUserAction, endFire } = motionSlice.actions

export default motionSlice.reducer