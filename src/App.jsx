import React, { useContext, useState } from "react"
import Landing from "./components/Landing"
import { ethers } from "ethers"
import abi from './artifacts/abi.json'
import { GlobalContext } from "./GlobalContext"
const App = () => {

  const [isConnected, setIsConnected] = useContext(GlobalContext);
  const [isVoter, setIsVoter] = useState(false);
  const state = window.ethereum._state
  console.log("Connecton Status:", state.isConnected)
  const { accounts } = window.ethereum._state;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contractABI = abi
  const contractAddress = "0xF9963A9269C9330dd221ac1375Ee60280502Fb39"
  const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner())



  async function checkVoter() {
    const voter = await contract.voters("0xeb7e64ec981a178a70eba05a37b3ee5e440df041");
    console.log(voter.name)

  }

  if (isConnected) {

    checkVoter()







    return (
      <>
        {/* <h1 className="bg-amber-500">Connected as : {state.accounts[0]}</h1> */}
        <div className="flex flex-col w-screen h-screen  items-start  bg-slate-600 overflow-x-hidden">
          <div className="flex w-full  justify-end bg-slate-500 overflow-x-hidden">

            {/* <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
              VOTE
            </button> */}
            <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            hover:ring-slate-900 ring-2
            ">
              Create
            </button>
            <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-700
            hover:ring-amber-200 ring
            ">
              Apply
            </button>

          </div>
          <div className="flex flex-col w-75">
            <h1>Active Elections to vote for</h1>
            <div className="flex h-50 bg-slate-500">
              <div className="w-screen bg-slate-200 h-9"> 
              this is the description of the Election
              </div>

            </div>

          </div>

        </div>
      </>

    )

  }
  else {
    console.log(isConnected)
    return (
      <Landing />
    )
  }
}
export default App

