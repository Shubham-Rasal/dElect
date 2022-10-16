import React, { useState, useContext, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import { ElectionModal } from '../ElectionModal';
import { GlobalContext } from '../GlobalContext';
import Election, { AdminElection } from './Election';
import { motion } from 'framer-motion'


const AdminPortal = () => {

    const [elections, setElections] = useState([]);
    const [isComplete, setIsComplete] = useState(true)
    const { contract, accounts, admin } = useContext(GlobalContext);
    const dataFetchedRef = useRef(false);
    const [isAdmin, setIsAdmin] = admin;
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
        modal[0].classList.remove('invisible')
        modal[0].classList.remove('opacity-0')



    }


    
   



    return (

        <div className="portal h-screen w-screen">
            
            <ElectionModal state={{ state: [elections, setElections] }} />

             
            <h1 className='text-2xl w-full text-center font-medium text-cyan-800' >Admin Portal</h1>
            {!isAdmin &&

                <div className="register w-screen flex justify-end p-3  bg-cyan-50 ">
                    <button onClick={handleAdminRegister} className='bg-cyan-300 p-2 rounded-md' >Register as admin</button>
                </div>

            }
            {isAdmin &&
                <div className="bg-green-200  w-screen p-2 mx-auto flex flex-col justify-end">

                    <button onClick={openElectionModal} className="plus text-1xl  bg-blue-700 px-5 p-1 rounded-sm text-white w-fit mx-2"  >New</button>

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