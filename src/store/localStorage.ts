import toast from 'react-hot-toast'
import { RootState } from './index'

export const loadState = (): RootState | undefined => {
	try {
		const serializedState = localStorage.getItem('state')
		if (serializedState === null) {
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (err) {
		return undefined
	}
}

export const saveState = (state: RootState) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch (error) {
		toast.error((error as Error).message)
	}
}
