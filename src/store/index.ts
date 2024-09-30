import { configureStore, combineReducers } from '@reduxjs/toolkit'
import commentReducer from './commentSlice'
import { loadState, saveState } from './localStorage'

const rootReducer = combineReducers({
	comments: commentReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
	reducer: rootReducer,
	preloadedState: loadState() as RootState,
})

store.subscribe(() => {
	saveState(store.getState())
})

export type AppDispatch = typeof store.dispatch

export default store
