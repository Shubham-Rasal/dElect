import { useState, createContext } from "react";
import abi from "./artifacts/abi.json";
import { ethers } from "ethers";
import Landing from "./components/Landing";
export const GlobalContext = createContext();

console.log("c");
export const GlobalContextProvider = (props) => {
  
  const [isConnected, setIsConnected] = useState(false);
  const [isVoter, setIsVoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  if (!window.ethereum)
    return (
      <GlobalContext.Provider
        value={{
          connect: [isConnected, setIsConnected],
            }}
      >
        <Landing />
      </GlobalContext.Provider>
    );
    const { accounts } = window?.ethereum?._state;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractABI = abi;
  const contractAddress = "0x69c0fB9A4d880bEE7DEF6e1de176E06fBC43089D";
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider.getSigner()
  );

  const getAdmins = async () => {
    const admin = await contract.admins(accounts[0]);
    console.log(admin, accounts[0]);

    if (admin.adminAddress.toLowerCase() == accounts[0]) {
      setIsAdmin(true);
    }
  };
  getAdmins();

  return (
    <GlobalContext.Provider
      value={{
        connect: [isConnected, setIsConnected],
        contract: contract,
        voter: [isVoter, setIsVoter],
        accounts: accounts,
        admin: [isAdmin, setIsAdmin],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
