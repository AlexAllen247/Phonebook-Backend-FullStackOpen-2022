const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else if (message.includes("Information")) {
        const errorStyle = {
            color: "red",
            backgroundColor: "lightgray",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    } else {
        const successStyle = {
            color: "green",
            backgroundColor: "lightgray",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    }
}

export default Notification