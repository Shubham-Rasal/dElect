import React, { useContext, useState } from "react"
import Landing from "./components/Landing"
import { ethers } from "ethers"
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import abi from './artifacts/abi.json'
import { GlobalContext } from "./GlobalContext"
import { toUtf8String } from "ethers/lib/utils";
const App = () => {

  const [isConnected, setIsConnected] = useContext(GlobalContext);
  const [isVoter, setIsVoter] = useState(false);

  const state = window.ethereum._state
  console.log("Connecton Status:", state.isConnected)
  const { accounts } = window.ethereum._state;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contractABI = abi
  const contractAddress = "0xF9963A9269C9330dd221ac1375Ee60280502Fb39"
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

  async function checkVoter() {
    const voter = await contract.voters("0xeb7e64ec981a178a70eba05a37b3ee5e440df041");
    console.log(voter.name)

  }


  const modal = document.getElementsByClassName('modal');
  async function openRegisterModal() {
    console.log(modal[0])
    modal[0].classList.remove('invisible')
    modal[0].classList.remove('opacity-0')



  }

  async function handleRegister() {
    modal[0].classList.add('invisible')
    modal[0].classList.add('opacity-0')
    console.log(voter.id)
    let bytes = uuidParse('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
    console.log(bytes)
    
    const id = Math.round(Math.random()*1000);
    
    const res = await contract.addVoter(voter.name,id, voter.country, voter.description)
    console.log(res)

  }

  if (isConnected) {

    checkVoter()


    return (
      <>
        <div className=" transition-all modal w-screen h-screen absolute opacity-0 invisible  ease-in-out delay-500  bg-green-100">
          <div className="modal-body h-full w-full flex flex-col justify-center items-center ">
            <div class="flex justify-center">
              <div>
                <div class="form-floating mb-3 xl:w-96">
                  <input onChange={handleOnChange} type="text" name="name" class="form-control
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
                  <label for="floatingInput" class="text-gray-700">Name</label>
                </div>
                <div class="mb-3 xl:w-96">
                  <select id="selectType" onChange={handleOnChange} name='type' class="form-select appearance-none
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
                    <option selected value="Other">Other</option>
                  </select>
                </div>


                <button onClick={handleRegister} type="button" class="inline-block px-6 py-2 border-2 border-green-500
                 text-green-500 font-medium text-xs leading-tight uppercase rounded-full
                  hover:bg-green-500 hover:text-white
                focus:outline-none focus:ring-0 transition duration-150 ease-in-out">REGISTER</button>
              </div>
            </div>
          </div>
        </div>
        {/* <h1 className="bg-amber-500">Connected as : {state.accounts[0]}</h1> */}
        <div className="flex flex-col w-screen h-screen  items-start  bg-slate-900 overflow-x-hidden">
          <div className="flex w-full fixed z-50 justify-end items-center bg-slate-700 overflow-x-hidden">
            <div onClick={() => openRegisterModal()} className="register text-amber-400 text-center h-full hover:bg-slate-500 cursor-pointer p-2 m-2">


              Register as voter !

            </div>





            <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            hover:ring-slate-900 ring-2
            ">
              Create
            </button>
            <button className="p-3 pl-5 pr-5 m-2
            text-slate-900 bg-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-700
            hover:ring-amber-200 ring
            ">
              Apply
            </button>

          </div>
          <div className="flex flex-col w-75 justify-center translate-y-20 items-center w-screen">
            <h1 className="text-lg font-bold bg-slate-100 m-2 p-2">Active Elections to vote for</h1>
            <div className="flex flex-col sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
              <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">MID-TERM GENERAL ELECTION</div>
              <div className=" bg-slate-200 m-2 p-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Velit delectus sed temporibus asperiores molestiae nihil ex
                iste debitis voluptas architecto. Quas, culpa dicta tempora
                possimus expedita ipsam. Maxime, sapiente illo!
              </div>
              <div className="criteria p-2">
                <i><b>Criteria</b></i>
                <li className="hover:bg-amber-300 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-400 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-500 text-xl font-semibold">Should be matic token holder</li>

              </div>
              <div className="vote">
                <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
                  VOTE
                </button>
              </div>

            </div>
            <div className="flex flex-col sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
              <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">MID-TERM GENERAL ELECTION</div>
              <div className=" bg-slate-200 m-2 p-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Velit delectus sed temporibus asperiores molestiae nihil ex
                iste debitis voluptas architecto. Quas, culpa dicta tempora
                possimus expedita ipsam. Maxime, sapiente illo!
              </div>
              <div className="criteria p-2">
                <i><b>Criteria</b></i>
                <li className="hover:bg-amber-300 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-400 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-500 text-xl font-semibold">Should be matic token holder</li>

              </div>
              <div className="vote">
                <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
                  VOTE
                </button>
              </div>

            </div>
            <div className="flex flex-col  sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
              <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">MID-TERM GENERAL ELECTION</div>
              <div className=" bg-slate-200 m-2 p-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Velit delectus sed temporibus asperiores molestiae nihil ex
                iste debitis voluptas architecto. Quas, culpa dicta tempora
                possimus expedita ipsam. Maxime, sapiente illo!
              </div>
              <div className="criteria p-2">
                <i><b>Criteria</b></i>
                <li className="hover:bg-amber-300 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-400 text-xl font-semibold">Should be matic token holder</li>
                <li className="hover:bg-amber-500 text-xl font-semibold">Should be matic token holder</li>

              </div>
              <div className="vote">
                <button className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            ">
                  VOTE
                </button>
              </div>

            </div>

          </div>

        </div>
      </>

    )

  }
  else {
    console.log(isConnected)
    return (
      <Landing />
    )
  }
}
export default App

