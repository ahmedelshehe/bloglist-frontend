import { useState, useEffect ,useRef } from 'react'
import Blog from './components/Blog.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import Togglable from './components/Togglable.js'
import CreateBlogForm from './components/CreateBlogForm.js'
const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username,setUsername]=useState('')
	const [password,setPassword]=useState('')
	const [notificationMessage,setNotificationMessage] =useState(null)
	const [user,setUser] =useState(null)
	const blogFormRef =useRef()
	useEffect(() => {
		blogService.getAll().then(blogs => {
			const sortedBlogs =blogs.sort((a,b) => a.likes < b.likes ? 1 :-1 )
			setBlogs(sortedBlogs)
		})
	}, [])
	useEffect(() => {
		const loggedInUser =window.localStorage.getItem('loggedInUser')
		if(loggedInUser){
			const user = JSON.parse(loggedInUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	},[])
	const handleUsernameChange =({ target }) => setUsername(target.value)
	const handlePasswordChange =({ target }) => setPassword(target.value)

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username,password })
			setUser(user)
			window.localStorage.setItem(
				'loggedInUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUsername('')
			setPassword('')
		} catch (exception) {
			console.log(exception)
			setNotificationMessage({ type : 'error',message:exception })
			setTimeout(() => {
				setNotificationMessage(null)
			},5000)
		}
	}
	const handleLogout = () => {
		window.localStorage.clear()
		setUser(null)
	}
	const handleCreateBlog =async ({ title,author,url }) => {
		try {
			blogFormRef.current.toggleVisibility()
			const blog = await blogService.create({ title,author,url })
			setBlogs(blogs.concat({ ...blog ,user :{
				username :user.username,
				name :user.name
			} }))
			setNotificationMessage({ type : 'success',message:`a new blog  ${blog.title} by ${user.name} is added` })
			setTimeout(() => {
				setNotificationMessage(null)
			},5000)
		} catch (error) {
			setNotificationMessage({ type : 'error',message:error })
			setTimeout(() => {
				setNotificationMessage(null)
			},5000)
		}
	}
	const handleDelete = (id) => {
		const newBlogs = blogs.filter(b => b.id !== id)
		setBlogs(newBlogs)
	}
	const blogsView = () =>
		(
			<div>

				<h2>blogs</h2>
				<p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
				<Togglable viewButtonLabel="Add New Blog" ref={blogFormRef}>
					<CreateBlogForm handleCreateBlog={handleCreateBlog}/>
				</Togglable>

				{
					blogs.map(blog => {
						return <Blog key={blog.id} blog={blog} onDelete={handleDelete} owner={blog.user.username === user.username}/>
					}

					)}
			</div>
		)

	return  <>
		<Notification notificationMessage={notificationMessage} />
		{user ? blogsView() :
			<>
				<Togglable viewButtonLabel="Login" defaultVisibility={true}>
					<LoginForm
						handleLogin={handleLogin}
						handleUsernameChange={handleUsernameChange}
						handlePasswordChange ={handlePasswordChange}
						username={username} password={password}/>
				</Togglable>
			</>
		}
	</>
}

export default App