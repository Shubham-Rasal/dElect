import React from 'react'
import Button from './Button'

const Election = ({ election }) => {
  return (
    <div className="flex flex-col sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
      <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">{election.name}</div>
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
  )
}

export const CandidateElection = ({ election }) => {
  return (
    <div className="flex flex-col shadow-lg bg-slate-200 m-3 p-1  rounded-md">
      <div className="name p-1 m-1 ">name : {election.name}</div>
      <div className="admin">Admin : {election.admin}</div>
      <div className="start">Starts : {election.startTime.toString()}</div>
      <div className="time left">Time left to apply: 40days</div>
      <div className="apply"><Button name="Apply" /></div>
    </div>
  )
}
export const AdminElection = ({ election }) => {
  console.log(Date().toLocaleUpperCase())
  return (
    <div className="container w-full bg-slate-300 my-3 mx-auto px-3">

      <div className="title text-xl text-teal-700 p-1 m-1 ">Title</div>
      <div className="starttime w-full   flex gap-3 p-1 m-1 ">
        <div className=" bg-yellow-50 text-gray-500 font-semibold rounded-xl px-2 shadow-md ">Starts on {new Date().toLocaleString()}</div>
        <div className="duration bg-yellow-50 text-gray-600 font-semibold rounded-lg px-2 shadow-md">30 days left</div>
      </div>
      <div className="candidates w-full flex flex-col gap-3">
        <h1 className='flex items-center h-10  text-slate-800 drop-shadow-xl  justify-center bg-violet-200 my-1 w-1/4' >Candidates</h1>
        <div className="candidate
      bg-white  flex flex-col p-1 text-md m-1 shadow-md rounded-md  ">

          <div className="name">Name</div>
          <div className="Address">Addresss</div>
        </div>
      


      </div>
      <div className="applicants flex flex-col gap-2">
        <h2 className='flex items-center h-10  text-teal-800 drop-shadow-xl  justify-center bg-amber-100 my-1 w-1/4'>Applicants:</h2>
        <div className="applicant bg-white my-1 flex flex-col p-1  m-1 shadow-md rounded-md  ">
          <div className="name">Name</div>
          <div className="address">Adreess</div>
          <button className='bg-teal-400 w-32 rounded-md shadow-md text-white' >Approve</button>
        </div>
        
        
      </div>

    </div>
  )
}






export default Election