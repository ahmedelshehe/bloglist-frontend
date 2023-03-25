import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
	title: 'Newtitle',
	author : 'John',
	likes :0,
	url :'www.facebook.com',
	user : {
		username : 'John',
		name : 'John Smith'
	}
}
const onDelete = () => console.log('onDelete Blog')
const owner = false
test('should render',async () => {
	const { container } = render(<Blog blog={blog} owner={owner} onDelete={onDelete} />)
	const div = container.querySelector('.blog')
	const detailsDiv =div.querySelector('.details')
	expect(detailsDiv).toHaveStyle('display: none')
	expect(div).toHaveTextContent('John')
})

test('clicking the view button on toggable view the url and likes',async() => {
	const mockHandler = jest.fn()

	const { container } =render(
		<Blog blog={blog} owner={owner} onDelete={onDelete} />
	)
	const user =userEvent.setup()
	const button = screen.getByText('view')
	button.onclick =mockHandler
	const div = container.querySelector('.blog')
	const detailsDiv =div.querySelector('.details')
	expect(detailsDiv).toHaveStyle('display: none')
	await user.click(button)
	expect(mockHandler.mock.calls).toHaveLength(1)
	expect(detailsDiv).not.toHaveStyle('display: none')
})
test('clicking the like button twice will trigger the click event twice',async () => {
	const likeHandler = jest.fn()

	render(
		<Blog blog={blog} owner={owner} onDelete={onDelete} />
	)
	const user =userEvent.setup()
	const button = screen.getByText('like')
	button.onclick =likeHandler
	await user.click(button)
	await user.click(button)
	expect(likeHandler.mock.calls).toHaveLength(2)
})