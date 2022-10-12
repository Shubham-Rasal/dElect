import React, { useContext, useState, useEffect, createElement } from 'react'
import { GlobalContext } from './GlobalContext';
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ElectionModal = () => {
  const { contract, voter } = useContext(GlobalContext);
  const [electionName, setElectionName] = useState('')
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1000);
  const [elections, setElections] = useState([]);


  useEffect(() => {
    (async () => {

      const electionCount = await contract.electionCount();
      console.log(electionCount.toString())
      for (let i = 1; i <= electionCount; i++) {
        const election = await contract.elections(i);
        console.log(election)
      }
    })()


  }, [elections]);

  const notify = () => toast.success('Created Election Successfully.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const modal = document.getElementsByClassName('modal');
  async function createElection() {

    if (electionName === '') {

      alert('Enter a name');
      return;

    }
  

  const unix = Date.parse(date);

  const res = await contract.createElection(electionName, unix, duration);
  console.log(res);


  if (res.hash) {
    notify()
    
  }

}





return (
  <div className=" transition-all emodal w-screen h-screen absolute opacity-0 invisible  ease-in-out delay-500  bg-gradient-to-r from-blue-300 to-pink-300">
    <ToastContainer />
    <div className="modal-body h-full w-full flex flex-col justify-center items-center ">
      <div className="flex justify-center">
        <div>
          <div className="form-floating mb-3 xl:w-96">
            <input required autoComplete="off" onChange={(e) => setElectionName(e.target.value)} type="text" name="name" className="form-control
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
            <input required autoComplete="off" onChange={(e) => setDate(e.target.value)} type="date" name="date" className="form-control
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
