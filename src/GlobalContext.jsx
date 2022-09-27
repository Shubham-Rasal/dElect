import { useState, createContext } from 'react';

export const GlobalContext = createContext();

const { accounts } = window.ethereum._state;
console.log(accounts)
const c = ( accounts !== null && accounts.length !== 0 )
console.log("c",c)
export const GlobalContextProvider = (props) => {
    const [isConnected, setIsConnected] = useState(c);


    return (
        <GlobalContext.Provider value={[isConnected, setIsConnected]}>
            {props.children}
        </GlobalContext.Provider>
    )

}