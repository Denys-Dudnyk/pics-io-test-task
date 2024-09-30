import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from '../types'
import toast from 'react-hot-toast'

interface CommentState {
	comments: Comment[]
	loading: boolean
	error: string | null
}

const initialState: CommentState = {
	comments: [],
	loading: false,
	error: null,
}

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		setComments: (state, action: PayloadAction<Comment[]>) => {
			state.comments = action.payload
		},
		addComment: (state, action: PayloadAction<Comment>) => {
			state.comments.unshift(action.payload)
			toast.success('The comment was created!')
		},
		removeComment: (state, action: PayloadAction<number>) => {
			state.comments = state.comments.filter(
				comment => comment.id !== action.payload
			)
			toast.success('The comment was deleted!')
		},
		likeComment: (state, action: PayloadAction<number>) => {
			const comment = state.comments.find(c => c.id === action.payload)
			if (comment) {
				comment.isLiked ? (comment.likes -= 1) : (comment.likes += 1)
				comment.isLiked = !comment.isLiked
			}
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload
			toast.error(state.error)
		},
	},
})

export const {
	setComments,
	addComment,
	removeComment,
	likeComment,
	setLoading,
	setError,
} = commentSlice.actions
export default commentSlice.reducer
