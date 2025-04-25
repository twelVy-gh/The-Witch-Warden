import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    direction: 1
}

const motionSlice = createSlice({
	name: 'motion',
	initialState,
	reducers: {
		changeDirection(state, action) {
			state.direction = action.payload
		},
	}
})



export const selectDirection = (state: any) => state.commands.direction

export const { changeDirection } = motionSlice.actions

export default motionSlice.reducer