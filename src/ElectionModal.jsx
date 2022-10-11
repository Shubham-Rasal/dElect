import React,{useContext,useState,useEffect, createElement} from 'react'
import { GlobalContext } from './GlobalContext';
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

export const ElectionModal = () => {
    const {contract, voter}  = useContext(GlobalContext);
    let tVoter = {
        name: "",
        id: uuidv4(),
        description: "",
        country: "INDIA",
        voterAddress: ""
    }

    function handleOnChange(e) {

        console.log(e.target.value)
        const name = e.target.name;
        switch (name) {
            case "type":

                tVoter.description = e.target.value;

                break;
            case 'name':
                tVoter.name = e.target.value;
                break;
        }

    }
    const modal = document.getElementsByClassName('modal');
    async function createElection() {


        

    }
  return (
    <div className=" transition-all emodal w-screen h-screen absolute opacity-0 invisible  ease-in-out delay-500  bg-gradient-to-r from-blue-300 to-pink-300">
    <div className="modal-body h-full w-full flex flex-col justify-center items-center ">
        <div className="flex justify-center">
            <div>
                <div className="form-floating mb-3 xl:w-96">
                    <input required autoComplete="off" onChange={handleOnChange} type="text" name="name" className="form-control
                            block
                          w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                focus:bg-white  focus:border-green-600 focus:outline-green-600" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput" className="text-gray-700">Name</label>
                </div>
                <div className="form-floating mb-3 xl:w-96">
                    <input required autoComplete="off"   type="date" name="date" className="form-control
                            block
                          w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                focus:bg-white  focus:border-green-600 focus:outline-green-600" id="floatingInput" placeholder="date" />
                    <label htmlFor="floatingInput" className="text-gray-700">Date</label>
                </div>
                <div className="form-floating mb-3 xl:w-96">
                    <input required autoComplete="off"   type="time" name="time" className="form-control
                            block
                          w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                focus:bg-white  focus:border-green-600 focus:outline-green-600" id="floatingInput" placeholder="date" />
                    <label htmlFor="floatingInput" className="text-gray-700">Time</label>
                </div>
              


                <button onClick={createElection} type="button" className="inline-block px-6 py-2 border-2 bg-green-100  border-green-500
                    text-green-500  text-xs leading-tight uppercase rounded-full
                    hover:bg-green-500 hover:text-white
                    focus:outline-none focus:ring-0 transition duration-150 ease-in-out font-semibold">Create</button>
            </div>
        </div>
    </div>
</div>
  )
}
