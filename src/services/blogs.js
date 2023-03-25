import axios from 'axios'
const baseUrl = '/api/blogs'

let token =null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}
const create = async ({ title,author,url }) => {
	const config = {
		headers: { Authorization: token },
	}
	const newBlog = { title,author,url }
	try{
		const request =await axios.post(baseUrl,newBlog,config)
		return request.data
	}catch (error) {
		throw error.response.data.error
	}
}
const update =async (newBlog,id) => {
	const config = {
		headers: { Authorization: token },
	}
	try{
		const request =await axios.put(baseUrl+'/'+id,newBlog,config)
		return request.data
	}catch (error) {
		throw error.response.data.error
	}
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	}
	try{
		const request =await axios.delete(baseUrl+'/'+id,config)
		return request.data
	}catch (error) {
		throw error.response.data.error
	}
}

export default { getAll ,setToken ,create ,update,remove }