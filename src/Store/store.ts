import { configureStore } from '@reduxjs/toolkit'
import commandsSlice from "./Parts/command"
import gameObjectSlice from "./Parts/game-objects"


export default configureStore({
	reducer: {
        commands: commandsSlice,
        game_objects: gameObjectSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
}
)