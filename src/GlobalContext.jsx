import { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <GlobalContext.Provider value={[isConnected, setIsConnected]}>
            {props.children}
        </GlobalContext.Provider>
    )

}