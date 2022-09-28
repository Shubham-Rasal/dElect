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
    const contractAddress = "0xab4CEE9255B1B4c9E9AC7AED55a43755F41D1967"
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner())


    return (
        <GlobalContext.Provider value={{connect:[isConnected, setIsConnected],contract:contract , voter:[isVoter,setIsVoter]}}>
            {props.children}
        </GlobalContext.Provider>
    )

}