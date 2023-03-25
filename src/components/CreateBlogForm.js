import { useState } from 'react'
const CreateBlogForm = ({ handleCreateBlog }) => {

	const [title ,setTitle] =useState('')
	const [author,setAuthor]=useState('')
	const [url,setUrl] = useState('')
	const createBlog =(event) => {
		event.preventDefault()
		const newBlog = {
			title,author,url
		}
		handleCreateBlog(newBlog)
		setTitle('')
		setAuthor('')
		setUrl('')
	}
	return (
		<>
			<h2>Create new</h2>
			<form onSubmit={createBlog}>
            title :<input id="title" type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
            author :<input id="author" type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
            url :<input id="url" type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
				<button type="submit" id='create-button'>create</button>
			</form>
		</>
	)
}

export default CreateBlogForm