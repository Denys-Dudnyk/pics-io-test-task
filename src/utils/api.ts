import axios from 'axios'
import { Comment } from '../types'

const API_URL = 'https://dummyjson.com/comments'

export const fetchComments = async (): Promise<Comment[]> => {
	const response = await axios.get(API_URL)
	return response.data.comments
}

interface NewCommentData {
	body: string
	postId: number
	user: {
		username: string
		fullName: string
	}
}

export const addComment = async (
	commentData: NewCommentData
): Promise<Comment> => {
	await new Promise(resolve => setTimeout(resolve, 500))

	const newComment: Comment = {
		id: Date.now(),
		body: commentData.body,
		postId: commentData.postId,
		likes: 0,
		user: {
			id: Date.now() + 1,
			username: commentData.user.username,
			fullName: commentData.user.fullName,
		},
	}

	return newComment
}

export const deleteComment = async (id: number): Promise<void> => {
	await new Promise(resolve => setTimeout(resolve, 500))
}
