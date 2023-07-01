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
        alert("Ethereum object does not exist. Install metamask.");
        console.log("Ethereum object doesn't exist");
        e.target.parentNode.parentNode.classList.remove("blur-sm");
        e.target.disabled = false;
      }
    } catch (error) {
      console.log(error);
      e.target.parentNode.parentNode.classList.remove("blur-sm");
      e.target.disabled = false;
    }
  }
  const feature = `feature  bg-slate-50 text-teal-600 w-32    aspect-square
  flex  text-center rounded-lg  text-md hover:scale-105
   transition scale duration-700
   items-center justify-center m-2  p-2 cursor-pointer shadow-2xl 
    dark:bg-slate-800 dark:text-teal-200
   dark:hover:bg-slate-700 dark:hover:text-slate-100            
     dark:hover:opacity-100
     dark:opacity-70
     dark:border-l-2
     dark:border-t-2`;

    
  


  return (
    <div className="main flex flex-col bg-slate-900 h-screen text-slate-50">
      <div className="navbar absolute flex w-screen h-auto justify-between items-center lg:px-32 p-3">
        <div className="logo p-2 m-2 rounded-md">
          <a href="/">dElect</a>
        </div>
        <div className="connect">
          {!window.ethereum ? (
            <div className="install p-2 m-1 bg-white rounded-md text-slate-900">
              <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noreferrer"
              >
                Install Metamask
              </a>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="connect-btn p-2 m-2 bg-white text-slate-900 rounded-md hover:scale-105"
            >
              Connect
            </button>
          )}
        </div>
      </div>
      <main className="flex flex-col justify-center items-center h-full w-screen">
        <section>
          <div className="flex flex-col lg:items-center justify-center text-center h-full p-4 m-2">
            <div className="lg:text-6xl text-3xl lg:5xl"> Welcome to  <span className="text-teal-600">d</span>Elect</div>
            <div className="lg:text-4xl text-xl lg:text-center">
              <span className="text-teal-600">Decentralised </span> Elections
            </div>
            <p className="">
              dElect is a decentralized application that allows you to vote, create and participate in elections.
            </p>
            <div className="container mt-10  flex flex-wrap lg:gap-8 items-center justify-center">
              <div className={feature}>Decentralised</div>
              <div className={feature}>Autonomous</div>
              <div className={feature}>Secure</div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex justify-center items-center h-16 bg-slate-800 text-slate-50">
        Made with ❤️ by {"Shubham"}
      </footer>
    </div>
  );
};

export default Landing;
