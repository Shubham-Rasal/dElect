import React, { useContext } from "react";
import { ethers } from "ethers";
import { GlobalContext } from "../GlobalContext";
const Landing = () => {
  const { connect } = useContext(GlobalContext);
  console.log(connect);
  const [isConnected, setIsConnected] = connect;
  async function handleConnect(e) {
    //styling
    e.preventDefault();
    console.log(e.target.parentNode.parentNode);
    e.target.disabled = true;
    e.target.parentNode.parentNode.classList.add("blur-sm");
    //connecting to metamask
    try {
      if (window.ethereum) {
        const { accounts } = window.ethereum._state;
        if (accounts.length !== 0) {
          setIsConnected(true);
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setIsConnected(true);
      } else {
        alert("Ethereum object does not exist");
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
      e.target.parentNode.parentNode.classList.remove("blur-sm");
      e.target.disabled = false;
    }
  }

  return (
    <div className="main">
      <div className="navbar flex w-screen h-auto bg-red-300 justify-between items-center">
        <div className="logo p-2 m-2 rounded-md">
            Logo
          
        </div>
        <div className="connect">
            {window.ethereum ? (
                <div className="install p-1 m-1 bg-white rounded-md ">
                    <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">
                    
                        Install Metamask
                    </a>


                </div>
            ):(
                <button onClick={handleConnect} className="connect-btn">
                    {!isConnected ? "Connect" : "Connected"}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
