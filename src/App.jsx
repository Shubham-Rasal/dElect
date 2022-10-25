import React, { useContext, useState ,useEffect} from "react"
import Landing from "./components/Landing"
import { ethers } from "ethers"
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import abi from './artifacts/abi.json'
import { GlobalContext } from "./GlobalContext"
import Modal from "./components/Modal";
import { Link } from "react-router-dom";
import Election from "./components/Election";
import Button from "./components/Button";
import { ToastContainer } from "react-toastify";
const App = () => {

  const { connect ,contract , voter} = useContext(GlobalContext);

  const [isConnected, setIsConnected] = connect;
  const [isVoter, setIsVoter] = voter;
  const [elections, setElections] = useState([]);

  const state = window.ethereum._state
  console.log("Connecton Status:", state.isConnected)
  const { accounts } = window.ethereum._state;
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const modal = document.getElementsByClassName('modal');
  


  async function isaVoter() {
    const userAddress = await provider.listAccounts();
    // console.log(userAddress[0])
    const voter = await contract.voters(userAddress[0]);
    console.log(voter)


    if (voter.name == '')
      return false
    else
      return true

  }



  async function openRegisterModal() {
    // console.log(modal[0])
    modal[0].classList.remove('invisible')
    modal[0].classList.remove('opacity-0')



  }


  useEffect(() => {
   (async()=>{
     const temp = await isaVoter();
     console.log("temp ",temp)
     setIsVoter(temp)
     //get election details
     const electionCount = await contract.electionCount();
      console.log(electionCount.toNumber())
      //get election details using for loop
      for(let i=1;i<=electionCount.toNumber();i++){
        const election = await contract.elections(i);
        console.log(election)
        setElections(old=>[election,...old])
      }

   })()
    
  }, [])
  
  
  


  if (isConnected) {

    return (
      <>
       
        <Modal />
        {/* <h1 className="bg-amber-100">Connected as : {state.accounts[0]}</h1> */}
        <div className="flex flex-col w-screen h-screen  items-start  bg-gradient-to-r from-blue-500 to-teal-500 overflow-x-hidden">
          
         <div className="flex flex-row w-full h-16 bg-slate-700 sticky-top items-center text-center justify-start gap-4 px-4">
            {!isVoter &&
              <div onClick={() => openRegisterModal()} className="register text-amber-400 text-center h-full hover:bg-slate-500 cursor-pointer p-2 m-2">
                Register as voter !
              </div>
            }

            
            <Link to='/dElect/admin'>
              <Button name='Create' />
            </Link>
            <Link to='/dElect/candidate'>
              <Button name='Apply' />
            </Link>

          </div>
          <ToastContainer/>
          <div className="flex flex-col w-75 justify-center translate-y-20 items-center w-screen ">
            <h1 className="text-lg font-bold bg-slate-100 m-2 p-2">Active Elections to vote for</h1>
             
            {elections.map((election,index)=>{
              return(
                <Election key={index} election={election} />
              )
            }
            )}
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

