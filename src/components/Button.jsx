import React from 'react'

const Button = (props) => {
    return (
        <button className=" bg-green-400 p-2 m-1 rounded-md px-3 text-lg ">
            {props.name}
        </button>
    )
}

export default Button