import React, { useContext, useState } from "react"
import Landing from "./components/Landing"
import { ethers } from "ethers"
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import abi from './artifacts/abi.json'
import { GlobalContext } from "./GlobalContext"
import Modal from "./components/Modal";
import { Link } from "react-router-dom";
import Election from "./components/Election";
import Button from "./components/Button";
const App = () => {

  const {connect} = useContext(GlobalContext);
  console.log(connect)
  const [isConnected,setIsConnected] = connect;
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

            <Button name='Create'/>
            <Link to='/dElect/candidate'>
            <Button name='Apply'/>
            </Link>

          </div>
          <div className="flex flex-col w-75 justify-center translate-y-20 items-center w-screen ">
            <h1 className="text-lg font-bold bg-slate-100 m-2 p-2">Active Elections to vote for</h1>
            <Election/>
            <Election/>
            <Election/>
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

