import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../store/commentSlice'
import { addComment as apiAddComment } from '../utils/api'
import styles from '../styles/CommentForm.module.scss'
import { CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'

const CommentForm: React.FC = () => {
	const [body, setBody] = useState('')
	const [username, setUsername] = useState('')
	const [fullName, setFullName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const dispatch = useDispatch()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (body.trim() && username.trim() && fullName.trim()) {
			setIsSubmitting(true)
			try {
				const newComment = await apiAddComment({
					body,
					postId: 1,
					user: {
						username: username.trim(),
						fullName: fullName.trim(),
					},
				})

				dispatch(addComment(newComment))
				setBody('')
				setUsername('')
				setFullName('')
			} catch (err) {
				toast.error((err as Error).message)
			} finally {
				setIsSubmitting(false)
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.commentForm}>
			<input
				type='text'
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder='Username'
				className={styles.inputField}
				disabled={isSubmitting}
			/>
			<input
				type='text'
				value={fullName}
				onChange={e => setFullName(e.target.value)}
				placeholder='Full Name'
				className={styles.inputField}
				disabled={isSubmitting}
			/>
			<textarea
				value={body}
				onChange={e => setBody(e.target.value)}
				placeholder='Add a comment...'
				className={styles.inputField}
				rows={4}
				disabled={isSubmitting}
			/>
			<button
				type='submit'
				className={styles.submitButton}
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<div className={styles.submitButton__disabled}>
						<CircularProgress size={15} className={styles.loader} />
						Adding...
					</div>
				) : (
					'Add Comment'
				)}
			</button>
		</form>
	)
}

export default CommentForm
