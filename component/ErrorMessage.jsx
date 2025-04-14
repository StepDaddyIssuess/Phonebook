const ErrorMessage = ({message}) => {
    return (
        <p className={message ? "error" : ""}>
            {
                message
                    ? message
                    : ""
            }
        </p>
    )
}

export default ErrorMessage