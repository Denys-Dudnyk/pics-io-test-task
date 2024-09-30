import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import CommentForm from '../CommentForm'
import commentReducer from '../../store/commentSlice'
import { addComment as apiAddComment } from '../../utils/api'
import toast from 'react-hot-toast'

jest.mock('react-hot-toast', () => ({
	success: jest.fn(),
	error: jest.fn(),
}))

jest.mock('../../utils/api', () => ({
	addComment: jest.fn(),
}))

const store = configureStore({
	reducer: {
		comments: commentReducer,
	},
})

describe('CommentForm', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly', () => {
		render(
			<Provider store={store}>
				<CommentForm />
			</Provider>
		)

		expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument()
		expect(screen.getByText('Add Comment')).toBeInTheDocument()
	})

	it('submits form with valid data and shows success toast', async () => {
		const mockComment = {
			id: 1,
			body: 'Test comment',
			postId: 1,
			likes: 0,
			isLiked: false,
			user: {
				id: 1,
				username: 'testuser',
				fullName: 'Test User',
			},
		}

		;(apiAddComment as jest.Mock).mockResolvedValue(mockComment)

		render(
			<Provider store={store}>
				<CommentForm />
			</Provider>
		)

		fireEvent.change(screen.getByPlaceholderText('Username'), {
			target: { value: 'testuser' },
		})
		fireEvent.change(screen.getByPlaceholderText('Full Name'), {
			target: { value: 'Test User' },
		})
		fireEvent.change(screen.getByPlaceholderText('Add a comment...'), {
			target: { value: 'Test comment' },
		})

		fireEvent.click(screen.getByText('Add Comment'))

		await screen.findByText('Add Comment')

		expect(apiAddComment).toHaveBeenCalledWith({
			body: 'Test comment',
			postId: 1,
			user: {
				username: 'testuser',
				fullName: 'Test User',
			},
		})

		expect(toast.success).toHaveBeenCalledWith('The comment was created!')

		const state = store.getState()
		expect(state.comments.comments).toHaveLength(1)
		expect(state.comments.comments[0]).toEqual(mockComment)
	})
})
