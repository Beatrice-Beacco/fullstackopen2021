import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const text = message[0]
    const color = message[1]

    const messageStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div className="error" style={messageStyle}>
            {text}
        </div>
    )
}

export default Notification