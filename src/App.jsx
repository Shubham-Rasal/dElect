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

  if (accounts.length !== 0) {
    setIsConnected(true)
  }

  async function getAdmin() {


    const res = await contract.admins("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
    
    console.log(res.id.toString(),res.name,res.adminAddress.toString())
    if(res.id == 0)
    console.log("Not an admin")
  }

  if (isConnected) {

     getAdmin()







    return (
      <>
        <h1 className="bg-amber-500">Connected as : {state.accounts[0]}</h1>
        {
          1 == 1 ?
            <h1>HEllo</h1> : <Landing />

        }
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

