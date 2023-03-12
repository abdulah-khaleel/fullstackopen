const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="notification-success">{message}</div>
}

export default Notification
