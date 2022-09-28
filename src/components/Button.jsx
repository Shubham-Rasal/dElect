import React from 'react'

const Button = (props) => {
    return (
        <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            hover:ring-slate-900 ring-2
            ">
            {props.name}
        </button>
    )
}

export default Button