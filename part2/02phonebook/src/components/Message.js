import React from 'react'

//Displays the renders the state with the CSS style if it's not empty
//The element at the index 0 of the state is the message, at index 1 is the color
const Message = ({state}) =>{
    const notificationStyle = {
        color: state[1],
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if(state){
        return(
            <div style={notificationStyle}>
            <em>{state[0]}</em>
            </div>
        )
    } else {
        return null
    }
}

export default Message