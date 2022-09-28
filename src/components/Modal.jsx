import React from 'react'
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import { ethers } from 'ethers';
import abi from '../artifacts/abi.json'

const Modal = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contractABI = abi
    const contractAddress = "0xBCB43124eb1185Bd7E45c5336Fda3bf3498A0fEc"
    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner())
    let voter = {
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

                voter.description = e.target.value;

                break;
            case 'name':
                voter.name = e.target.value;
                break;
        }

    }
    const modal = document.getElementsByClassName('modal');
    async function handleRegister() {
        const id = Math.round(Math.random() * 1000);
        if(voter.name === '' ){
            alert('Enter a name');
            return;
        }
        try {
            const res = await contract.addVoter(voter.name, id, voter.country, voter.description)
            modal[0].classList.add('invisible')
            modal[0].classList.add('opacity-0')
            console.log(res)
            
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div className=" transition-all modal w-screen h-screen absolute opacity-0 invisible  ease-in-out delay-500  bg-gradient-to-r from-blue-300 to-pink-300">
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
                        <div className="mb-3 xl:w-96">
                            <select id="selectType" onChange={handleOnChange} name='type' className="form-select appearance-none
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                {/* <option>Open this select menu</option> */}
                                <option value="Student">Student</option>
                                <option value="Professional">Professional</option>
                                <option defaultValue={"Other"} value="Other">Other</option>
                            </select>
                        </div>


                        <button onClick={handleRegister} type="button" className="inline-block px-6 py-2 border-2 bg-green-200  border-green-500
                            text-green-500  text-xs leading-tight uppercase rounded-full
                            hover:bg-green-500 hover:text-white
                            focus:outline-none focus:ring-0 transition duration-150 ease-in-out font-semibold">REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal