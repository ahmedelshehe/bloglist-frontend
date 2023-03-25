import React from 'react'
import { render , screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
test('<CreateBlogForm /> updates parent state and calls onSubmit' ,async () => {
	const createBlog = jest.fn()
	const user =userEvent.setup()

	const { container } = render(<CreateBlogForm handleCreateBlog={createBlog}/>)
	const inputs = screen.getAllByRole('textbox')
	const createButton =container.querySelector('#create-button')
	await user.type(inputs[0],'test title')
	await user.type(inputs[1],'test author')
	await user.type(inputs[2],'test url')
	await user.click(createButton)
	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('test title')
	expect(createBlog.mock.calls[0][0].author).toBe('test author')
	expect(createBlog.mock.calls[0][0].url).toBe('test url')
})
