import React from 'react'

const Button = (props) => {
    return (
        <button className=" bg-white text-slate-900 font-bold py-2 px-4 rounded-full
        hover:bg-slate-900 hover:text-white border border-slate-500 hover:border-transparent
          transition duration-300 ease-in-out m-1 " >
          {props.name}
        </button>
    )
}

export default Button