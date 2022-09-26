import { useState, createContext } from 'react';

export const GlobalContext = createContext();

const { accounts } = window.ethereum._state;
const c = (accounts.length !== 0)
export const GlobalContextProvider = (props) => {
    const [isConnected, setIsConnected] = useState(c);


    return (
        <GlobalContext.Provider value={[isConnected, setIsConnected]}>
            {props.children}
        </GlobalContext.Provider>
    )

}