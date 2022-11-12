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
  const feature = `feature  bg-slate-50 text-teal-600 w-48   aspect-square
  flex  text-center rounded-lg  text-2xl hover:scale-105
   transition scale duration-700
   items-center justify-center m-4  p-4 cursor-pointer shadow-2xl 
    dark:bg-slate-800 dark:text-teal-200
   dark:hover:bg-slate-700 dark:hover:text-slate-100            
     dark:hover:opacity-100
     dark:opacity-70
     dark:border-l-2
     dark:border-t-2`;

  return (
    <div className="main bg-slate-900 h-auto text-slate-50">
      <div className="navbar absolute flex w-screen h-auto justify-between items-center lg:px-32 p-3">
        <div className="logo p-2 m-2 rounded-md">dElect</div>
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
      <main>
        <section>
          <div className="flex flex-col lg:items-center justify-center h-screen p-4">
            <div className="lg:text-6xl text-5xl">dElect</div>
            <div className="lg:text-4xl text-xl lg:text-center">
              Decentralized Elections
            </div>
            <p className="">
              dElect is a decentralized application that allows you to create
              and participate in elections.
            </p>
          </div>
        </section>
        <section className=" h-auto lg:h-screen p-4 m-4 flex flex-col items-center justify-around">
          <div className="features text-4xl">Features</div>
          <div className="container  flex flex-wrap lg:gap-8 items-center justify-center">
            <div
              className={feature}
            >
              Decentralised
            </div>
            <div className={feature}>Autonomous</div>
            <div className={feature}>Secure</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
