import React, { useState, useContext, useEffect } from 'react'
import { ElectionModal } from '../ElectionModal';
import { GlobalContext } from '../GlobalContext';


const AdminPortal = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { contract, accounts, } = useContext(GlobalContext);
    console.log(contract, accounts);

    const modal = document.getElementsByClassName('emodal');


    useEffect(() => {
        const getAdmins = async () => {
            const admin = await contract.admins(accounts[0]);
            console.log(admin, accounts[0])

            if ((admin.adminAddress).toLowerCase() == accounts[0]) {
                setIsAdmin(true);


            }

        }
        getAdmins()
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
        modal[0].classList.remove('invisible')
        modal[0].classList.remove('opacity-0')



    }


    return (
       
        <div className="portal h-screen w-screen">
        <ElectionModal />


            <h1 className='text-2xl w-screen text-center font-medium text-cyan-800' >Admin Portal</h1>
            {!isAdmin &&

                <div className="register w-screen flex justify-end p-3  bg-cyan-50 ">
                    <button onClick={handleAdminRegister} className='bg-cyan-300 p-2 rounded-md' >Register as admin</button>
                </div>

            }
            {isAdmin &&
                <div className="bg-green-100  w-screen p-2 mx-auto flex flex-col justify-end">

                    <button onClick={openElectionModal} className="plus text-1xl bg-blue-700 px-5 p-1 rounded-sm text-white w-fit"  >New</button>

                    <ul>

                        <li>election 1</li>
                        <li>election 2</li>
                        <li>election 3</li>
                    </ul>
                </div>
            }
        </div>
       
    )
}

export default AdminPortal