import { useState } from 'react'
import blogService from '../services/blogs.js'
import PropTypes from 'prop-types'

const Blog = ({ blog,onDelete,owner }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const [visible, setVisible] = useState(false)
	const [likes,setLikes] = useState(blog.likes)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	const handleLikeBlog =async () => {
		const newBlog = {
			title :blog.title,
			author :blog.author,
			url :blog.url,
			likes :likes+1,
			user :blog.user.id
		}
		try {
			await blogService.update(newBlog,blog.id)
			setLikes(likes+1)
		} catch (error) {
			console.log(error)
		}
	}
	const handleDelete =async () => {
		try {
			if(window.confirm('Are you sure you want to delete')){
				await blogService.remove(blog.id)
				onDelete(blog.id)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div  style={blogStyle} className='blog'>
			<div>
				<h3>{blog.title}&nbsp; <strong>By</strong>&nbsp; {blog.author} &nbsp;
					<span style={hideWhenVisible}>
						<button className="viewBlog" onClick={toggleVisibility}>{'view'}</button>
					</span>
					<span style={showWhenVisible}>
						<button className="hideBlog" onClick={toggleVisibility}>{'hide'}</button>
					</span>
				</h3>
				<div>
				</div>
				<div style={showWhenVisible} className ="details">
					<h3>{blog.url}</h3>
					<h3>likes:{likes} <button className='likeButton' onClick={handleLikeBlog}>like</button></h3>
					<h3>{blog.user.name}</h3>
					{ owner ?
						<button className='removeButton' onClick={handleDelete}> remove</button>
						: null
					}
				</div>

			</div>
		</div>
	)
}
Blog.prototype ={
	blog :PropTypes.object.isRequired,
	onDelete : PropTypes.func.isRequired,
	owner:PropTypes.bool.isRequired
}
export default Blog