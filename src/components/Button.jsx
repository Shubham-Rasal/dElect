import React from 'react'

const Button = (props) => {
    return (
        <button className=" bg-white text-blue-500 font-bold py-2 px-4 rounded-full
        hover:bg-blue-500 hover:text-white border border-blue-500 hover:border-transparent
          transition duration-300 ease-in-out m-1 " >
          {props.name}
        </button>
    )
}

export default Button