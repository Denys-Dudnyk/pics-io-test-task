import React from 'react'
import { useDispatch } from 'react-redux'
import { likeComment, removeComment } from '../store/commentSlice'
import { deleteComment } from '../utils/api'
import { Comment } from '../types'
import styles from '../styles/CommentItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'

interface CommentItemProps {
	comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	const dispatch = useDispatch()

	const handleDelete = async () => {
		try {
			await deleteComment(comment.id)
			dispatch(removeComment(comment.id))
		} catch (err) {
			toast.error((err as Error).message)
			dispatch(removeComment(comment.id))
		}
	}

	const handleLike = async () => {
		try {
			dispatch(likeComment(comment.id))
		} catch (err) {
			toast.error((err as Error).message)
		}
	}

	return (
		<div className={styles.commentItem}>
			<div className={styles.commentHeader}>
				<span className={styles.userInfo}>
					{comment.user.fullName}
					<span className={styles.username}>@{comment.user.username}</span>
				</span>
			</div>
			<p className={styles.commentBody}>{comment.body}</p>
			<div className={styles.commentFooter}>
				<button
					onClick={handleLike}
					className={`${styles.likeButton} ${
						comment.isLiked ? styles.liked : ''
					}`}
				>
					<FontAwesomeIcon icon={faThumbsUp} size='xl' />
					<span>{comment.likes}</span>
				</button>
				<button onClick={handleDelete} className={styles.deleteButton}>
					<FontAwesomeIcon icon={faTrash} size='xl' />
				</button>
			</div>
		</div>
	)
}

export default CommentItem
