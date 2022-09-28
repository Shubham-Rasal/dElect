import React, { useContext, useState } from "react"
import Landing from "./components/Landing"
import { ethers } from "ethers"
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import abi from './artifacts/abi.json'
import { GlobalContext } from "./GlobalContext"
import { toUtf8String } from "ethers/lib/utils";
import Modal from "./components/Modal";
import { Link } from "react-router-dom";
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
  let voter = {
    name: "",
    id: uuidv4(),
    description: "",
    country: "INDIA",
    voterAddress: ""
  }



  async function checkVoter() {
    const userAddress = await provider.listAccounts();
    console.log(userAddress[0])
    const voter = await contract.voters(userAddress[0]);

    console.log(voter);
    return voter.name != ''

  }


  const modal = document.getElementsByClassName('modal');
  async function openRegisterModal() {
    console.log(modal[0])
    modal[0].classList.remove('invisible')
    modal[0].classList.remove('opacity-0')



  }



  if (isConnected) {

    checkVoter()


    return (
      <>
        {/* modal */}
        <Modal />
        {/* <h1 className="bg-amber-500">Connected as : {state.accounts[0]}</h1> */}
        <div className="flex flex-col w-screen h-screen  items-start  bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-x-hidden">
          <div className="flex w-full h-fit fixed z-50 justify-end items-center bg-fuchsia-900 overflow-x-hidden">
            {!checkVoter() &&
              <div onClick={() => openRegisterModal()} className="register text-amber-400 text-center h-full hover:bg-slate-500 cursor-pointer p-2 m-2">
                Register as voter !
              </div>
            }

            <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            hover:ring-slate-900 ring-2
            ">
              Create
            </button>
            <Link to='/dElect/candidate'>
              <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-700
            hover:ring-amber-200 ring
            ">
                Apply
              </button>
            </Link>

          </div>
          <div className="flex flex-col w-75 justify-center translate-y-20 items-center w-screen ">
            <h1 className="text-lg font-bold bg-slate-100 m-2 p-2">Active Elections to vote for</h1>
            <div className="flex flex-col sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
              <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">MID-TERM GENERAL ELECTION</div>
              <div className=" bg-slate-200 m-2 p-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Velit delectus sed temporibus asperiores molestiae nihil ex
                iste debitis voluptas architecto. Quas, culpa dicta tempora
                possimus expedita ipsam. Maxime, sapiente illo!
              </div>
              <div className="criteria p-2">
                <i><b>Criteria</b></i>
                <li className="hover:bg-amber-300 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-400 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-500 text-xl font-semibold">Should be matic token holder</li>

              </div>
              <div className="vote">
                <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
                  VOTE
                </button>
              </div>

            </div>
            <div className="flex flex-col sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
              <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">MID-TERM GENERAL ELECTION</div>
              <div className=" bg-slate-200 m-2 p-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Velit delectus sed temporibus asperiores molestiae nihil ex
                iste debitis voluptas architecto. Quas, culpa dicta tempora
                possimus expedita ipsam. Maxime, sapiente illo!
              </div>
              <div className="criteria p-2">
                <i><b>Criteria</b></i>
                <li className="hover:bg-amber-300 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-400 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-500 text-xl font-semibold">Should be matic token holder</li>

              </div>
              <div className="vote">
                <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
                  VOTE
                </button>
              </div>

            </div>
            <div className="flex flex-col  sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
              <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">MID-TERM GENERAL ELECTION</div>
              <div className=" bg-slate-200 m-2 p-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Velit delectus sed temporibus asperiores molestiae nihil ex
                iste debitis voluptas architecto. Quas, culpa dicta tempora
                possimus expedita ipsam. Maxime, sapiente illo!
              </div>
              <div className="criteria p-2">
                <i><b>Criteria</b></i>
                <li className="hover:bg-amber-300 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-400 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-500 text-xl font-semibold">Should be matic token holder</li>

              </div>
              <div className="vote">
                <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
                  VOTE
                </button>
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

