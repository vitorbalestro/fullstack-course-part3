
const successfulNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const stylesMap = {
    'success': successfulNotificationStyle,
    'error': errorNotificationStyle
}



const Notification = ({ message,notificationType }) => {
    if(message === null) return null
    return (
        <div className='success' style={stylesMap[notificationType]}>
            {message}
        </div>
    )
}



export default Notification;