import React, { useContext } from 'react'
import { ethers } from 'ethers';
import { GlobalContext } from '../GlobalContext';
const Landing = () => {

    const [isConnected, setIsConnected] = useContext(GlobalContext)
    async function handleConnect(e) {
        //styling
        e.preventDefault();
        console.log(e.target.parentNode.parentNode)
        e.target.disabled = true;
        e.target.parentNode.parentNode.classList.add('blur-sm')
        //connecting to metamask
        try {
            if (window.ethereum) {
                const { accounts } = window.ethereum._state;
                if (accounts.length !== 0) {
                    setIsConnected(true)
                    return
                }

                const provider = new ethers.providers.Web3Provider(window.ethereum)
                await provider.send("eth_requestAccounts", []);
                setIsConnected(true)
            } else {
                console.log("Ethereum object doesn't exist")
            }

        } catch (error) {
            console.log(error);
            e.target.parentNode.parentNode.classList.remove('blur-sm')
            e.target.disabled = false;
        }

    }


    return (

        <div className="flex flex-col h-screen items-center justify-center w-screen bg-orange-200 p-2">

            <h1 className='p-3 m-3 bg-slate-700 text-white text-3xl rounded-md text-center'>
                Welcome to the Decentralized Election App -<span className='font-semibold'> dElect </span>
            </h1>
            <h3 className='p-3 m-3 text-xl text-center'>Please
                <button className='transform bg-slate-900 p-2 ml-2 mr-2 text-xl text-white  rounded-md
                    hover:bg-white  cursor-pointer transition duration-500 hover:translate-y-1 hover:text-black hover:shadow-md'
                    onClick={handleConnect}
                >
                    connect

                </button>
                your metamask wallet to continue.</h3>
        </div>

    )
}

export default Landing