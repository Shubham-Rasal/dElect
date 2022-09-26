import React, { useContext } from "react"
import Landing from "./components/Landing"
import { ethers } from "ethers"
import { GlobalContext } from "./GlobalContext"
const App = () => {

  const [isConnected, setIsConnected] = useContext(GlobalContext);
  const state = window.ethereum._state
  console.log("Connecton Status:", state.isConnected)
  const {accounts} = window.ethereum._state;
  if (accounts.length !== 0) {
    setIsConnected(true)
   
  }
  if (isConnected) {    
    return (
      <h1>Connected as : {state.accounts[0]}</h1>
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

