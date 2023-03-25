import { useState ,forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line react/display-name
const Togglable = forwardRef(({ viewButtonLabel,hideButtonLabel,defaultVisibility,children },refs) => {
	const [visible, setVisible] = useState(defaultVisibility ? defaultVisibility : false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button id='viewToggle' onClick={toggleVisibility}>{viewButtonLabel}</button>
			</div>
			<div style={showWhenVisible} className="togglableContent">
				{children}
				<button id='hideToggle'  onClick={toggleVisibility}>{hideButtonLabel ? hideButtonLabel :'cancel'}</button>
			</div>
		</div>
	)
})
Togglable.propTypes = {
	viewButtonLabel : PropTypes.string.isRequired
}
export default Togglable