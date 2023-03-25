const Notification = ({ notificationMessage }) => {
	if (notificationMessage === null) {
		return null
	}

	return (
		<div className={notificationMessage.type}>
			{notificationMessage.message}
		</div>
	)
}
export default Notification