import { useState, createContext } from 'react';
import abi from './artifacts/abi.json'
import { ethers } from 'ethers';
export const GlobalContext = createContext();

const { accounts } = window.ethereum._state;
console.log(accounts)
const c = (accounts !== null && accounts.length !== 0)
// console.log("c", c)
export const GlobalContextProvider = (props) => {
    const [isConnected, setIsConnected] = useState(c);
    const [isVoter, setIsVoter] = useState(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contractABI = abi
    const contractAddress = "0x4d6f7D051f092187Ee8760510275a6512ce983A2"
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner())


    return (
        <GlobalContext.Provider value={{connect:[isConnected, setIsConnected],contract:contract , voter:[isVoter,setIsVoter] , accounts:accounts}}>
            {props.children}
        </GlobalContext.Provider>
    )

}