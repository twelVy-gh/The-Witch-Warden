import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    gameObjectsList: [
	{
		type: "sprite-animations",
		position: [100, 10, -0],
		textureImageURL:'/animations/spritesheet.png',
		textureDataURL:'/animations/spritesheet.json'
	},
	{
		type: "static-animations",
		position: [100, -50, -0],
		texture: "eagle.jpg"
	}
]
	
}

const gameObjectSlice = createSlice({
	name: 'game-objects',
	initialState,
	reducers: {
		
	}
})



export const selectGameObjects = (state: any) => state.game_objects.gameObjectsList

export default gameObjectSlice.reducer