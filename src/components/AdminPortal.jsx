import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { ElectionModal } from '../ElectionModal';
import { GlobalContext } from '../GlobalContext';
import Election, { AdminElection } from './Election';
import { motion } from 'framer-motion'


const AdminPortal = () => {

    const [elections, setElections] = useState([]);
    const [isComplete, setIsComplete] = useState(true)
    const { contract, accounts, admin , connect} = useContext(GlobalContext);
    const dataFetchedRef = useRef(false);
    const [isAdmin, setIsAdmin] = admin;
    const [isConnected,setIsConnected] = connect;
    // console.log(contract, accounts);

    const modal = document.getElementsByClassName('emodal');


    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;


        async function getElections() {

            const electionCount = await contract.electionCount();
            console.log(electionCount.toString())
            for (let i = 1; i <= electionCount; i++) {
                const election = await contract.elections(i);
                setElections(old => [election, ...old])

            }
            setIsComplete(true)
            
        }

        getElections();
    }, []);






    async function handleAdminRegister() {

        const voter = await contract.voters(accounts[0]);
        if (voter.name == '') {
            alert("not a voter. First register as a voter")
            return
        }
        const adminName = await voter.name;
        const res = await contract.addAdmin(adminName.toString());
        console.log(res);
        if (res.hash) setIsAdmin(true);


    }

    async function openElectionModal() {
        // console.log(modal[0])
        console.log(elections)
        modal[0].classList.remove('hidden')
        modal[0].classList.remove('opacity-0')

    }
  
    if(!isConnected){
        return(
            <Navigate replace to={'/'} />
        )
    }   

    return (

        <div className="portal h-screen w-screen bg-slate-900 text-white">
            
            <ElectionModal state={{ state: [elections, setElections] }} />

            <Link to='/'>
                <button className=' m-2 p-2 rounded-md bg-slate-800' >Home</button>
            </Link>
            <h1 className='mx-auto text-2xl text-center font-medium' >Admin Portal</h1>
            {!isAdmin &&

                <div className="register w-screen flex justify-end p-3 ">
                    <button onClick={handleAdminRegister} className=' p-2 rounded-md bg-slate-600' >Register as admin</button>
                </div>

            }
            {isAdmin &&
                <div className="  w-screen p-2 mx-auto flex flex-col justify-end">

                    <button onClick={openElectionModal} className="plus text-1xl  w-12 h-12 bg-slate-600 rounded-full flex justify-center items-center fixed bottom-10 right-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-50" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <ul>
                        {isComplete &&  elections.map((election, index) => (

                            <AdminElection key={index} election={election} />
                        ))}

                    </ul>
                </div>
            }
        </div>

    )
}

export default AdminPortal