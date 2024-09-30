import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { setComments, setLoading, setError } from '../store/commentSlice'
import { fetchComments } from '../utils/api'

import { CircularProgress } from '@mui/material'
import styles from '../styles/CommentList.module.scss'
import CommentItem from './CommentItem'
import toast from 'react-hot-toast'

const CommentList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const { comments, loading, error } = useSelector(
		(state: RootState) => state.comments
	)

	useEffect(() => {
		const loadComments = async () => {
			dispatch(setLoading(true))
			try {
				const fetchedComments = await fetchComments()
				dispatch(setComments(fetchedComments))
			} catch (err) {
				dispatch(setError('Failed to load comments'))
			} finally {
				dispatch(setLoading(false))
			}
		}

		if (comments.length === 0) {
			loadComments()
		}
	}, [dispatch, comments.length])

	if (loading) {
		return (
			<div className={styles.loader}>
				<CircularProgress />
			</div>
		)
	}

	if (error) {
		toast.error(error)
	}

	return (
		<div className={styles.commentList}>
			{comments.map(comment => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</div>
	)
}

export default CommentList
