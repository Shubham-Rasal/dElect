import { useState, createContext } from 'react';
import abi from './artifacts/abi.json'
import { ethers } from 'ethers';
export const GlobalContext = createContext();

const { accounts } = window.ethereum._state;
console.log(accounts)
const c = (accounts !== null && accounts.length !== 0)
console.log("c", c)
export const GlobalContextProvider = (props) => {
    const [isConnected, setIsConnected] = useState(c);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contractABI = abi
    const contractAddress = "0xBCB43124eb1185Bd7E45c5336Fda3bf3498A0fEc"
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner())


    return (
        <GlobalContext.Provider value={{connect:[isConnected, setIsConnected],contract:contract}}>
            {props.children}
        </GlobalContext.Provider>
    )

}