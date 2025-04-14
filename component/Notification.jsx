const Notification = ({message}) => {
    return (
        <p className={message ? "message" : ""}>
            {
                message
                    ? message
                    : ""
            }
        </p>
    )
}

export default Notification