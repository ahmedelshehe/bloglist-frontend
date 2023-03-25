import PropTypes from 'prop-types'
const LoginForm = ({
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => {

	return (
		<>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<label htmlFor="username">username</label>
				<input id='username' type="text" name="username" value={username} onChange={handleUsernameChange}/><br/>
				<label htmlFor="password">password</label>
				<input id='password' type="password" name="password" value={password} onChange={handlePasswordChange}/><br/>
				<button id="login-button" type="submit">login</button>
			</form>
		</>
	)
}
LoginForm.prototype ={
	handleLogin: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}
export default LoginForm