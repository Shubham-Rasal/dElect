import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./../GlobalContext";

const Election = ({ election }) => {
  return (
    <div className="flex flex-col sm:w-2/4 w-auto bg-slate-500 m-3 p-3 rounded-md ">
      <div className="title text-lg font-bold bg-slate-100 m-2 p-2 rounded-md shadow-xl">
        {election?.name}
      </div>
      <div className=" bg-slate-200 m-2 p-2 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit delectus
        sed temporibus asperiores molestiae nihil ex iste debitis voluptas
        architecto. Quas, culpa dicta tempora possimus expedita ipsam. Maxime,
        sapiente illo!
      </div>
      <div className="criteria p-2">
        <i>
          <b>Criteria</b>
        </i>
        <li className="hover:bg-amber-300 text-xl font-semibold">
          Should be matic token holder
        </li>
        <li className="hover:bg-amber-400 text-xl font-semibold">
          Should be matic token holder
        </li>
        <li className="hover:bg-amber-500 text-xl font-semibold">
          Should be matic token holder
        </li>
      </div>
      <div className="vote">
        <button
          className="p-3 pl-5 pr-5 m-2
            bg-slate-900 text-amber-300 text-lg
            font-semibold rounded-md tracking-wider
            transform hover:shadow-lg transition duration-500
            "
        >
          VOTE
        </button>
      </div>
    </div>
  );
};

export const CandidateElection = ({ election }) => {
  const { contract, accounts } = useContext(GlobalContext);
  const userAddress = accounts[0];
  const [hasApplied, setHasApplied] = useState(false); 
  let { applicantCount, candidateCount, admin, startTime, duration, name, id } =
    election;
  const date = new Date(startTime.toNumber());
  const today = Date.parse(new Date().toLocaleString());
  let timeLeft = Math.ceil(
    (startTime.toNumber() - today) / (1000 * 60 * 60 * 24)
  );
  const formatter = new Intl.RelativeTimeFormat("en");
  timeLeft = formatter.format(timeLeft, "days");

  useEffect(() => {
    console.log("Election Applicants count : ", applicantCount.toNumber());
    console.log("Election Candidates count : ", candidateCount.toNumber());
    (async () => {

      //for loop for applicant count
      for (let i = 1; i <= applicantCount.toNumber(); i++) {
        const applicant = await contract.getApplicant(id, i);
        console.log("Applicant : ", applicant);
        if (applicant.applicantAddress === userAddress) {
          if(applicant.appStatus == 'Pending') setHasApplied(true);
          break;
        }

      }

      
      
      


      


    })()
  },[])

  async function apply() {
    console.log(candidates);

    try {
      const voter = await contract.voters(userAddress);
      console.log(voter);
      console.log(id.toString())
      const res = await contract.applyForPost(id.toString(), voter.name); //use real id and name
      const receipt = await res.wait();
      console.log(receipt);
      setHasApplied(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col shadow-lg bg-slate-200 m-3 p-1  rounded-md">
      <div className="name p-1 m-1 text-xl font-semibold ">{name}</div>
      <div className="admin">
        <span>Admin : </span>
        {admin}
      </div>
      <div className="start">
        <span className="text-slate-600">Starts on :</span>
        {date.toUTCString()}
      </div>
      <div className="time left">Time left to apply: {timeLeft}</div>
      <div className="apply">
        <button
          onClick={apply} disabled={hasApplied}
          className=" bg-green-300 p-2 m-1 rounded-md px-3 text-lg"
        >
          {hasApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export const AdminElection = ({ election }) => {
  const { contract } = useContext(GlobalContext);

  const [applicants, setApplicants] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // console.log(election)
  let { applicantCount, candidateCount, admin, startTime, duration, name ,id } =
    election;
  // startTime = Date.parse(startTime);
  const date = new Date(startTime.toNumber());
  const today = Date.parse(new Date().toLocaleString());
  let timeLeft = Math.ceil(
    (startTime.toNumber() - today) / (1000 * 60 * 60 * 24)
  );
  const formatter = new Intl.RelativeTimeFormat("en");

  timeLeft = formatter.format(timeLeft, "days");

  useEffect(() => {
    (async () => {
      for (let index = 0; index < candidateCount.toNumber(); index++) {
        const candidate = await contract.getCandidate(id.toString(),index);
        setCandidates([...candidates, candidate]);
      }
      for (let index = 0; index < applicantCount.toNumber(); index++) {
        const applicant = await contract.getApplicant(id.toString(),index);
        setApplicants([...applicants, applicant]);
      }

      console.log(candidates);
      console.log(applicants);
    })();
  }, []);

  async function approve() {
    //implementation required
    const applicant = await contract.getApplicant(
      election.id,
      applicants[0].applicantId
    );
    console.log;
  }

  return (
    <motion.div
      className="container w-full bg-slate-300 my-3 mx-auto px-3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
    >
      <div className="title text-xl text-teal-700 p-1 m-1 ">{name}</div>
      <div className="starttime w-full   flex gap-3 p-1 m-1 ">
        <div className=" bg-yellow-50 text-gray-500 font-semibold rounded-xl px-2 shadow-md ">
          Starts on {date.toUTCString()}
        </div>
        <div className="duration bg-yellow-50 text-gray-600 font-semibold rounded-lg px-2 shadow-md">
          {timeLeft < 0 ? "Election over" : timeLeft}
        </div>
      </div>
      <div className="candidates w-full flex flex-col gap-3">
        <h1 className="flex items-center h-10  text-slate-800 drop-shadow-xl  justify-center bg-violet-200 my-1 w-1/4">
          Candidates {candidateCount.toString()}
        </h1>
        <div
          className="candidate
      bg-white  flex flex-col p-1 text-md m-1 shadow-md rounded-md  "
        >
          <div className="name">Name</div>
          <div className="Address">Addresss</div>
        </div>
      </div>
      <div className="applicants flex flex-col gap-2">
        <h2 className="flex items-center h-10  text-teal-800 drop-shadow-xl  justify-center bg-amber-100 my-1 w-1/4">
          Applicants: {applicantCount.toString()}
        </h2>
        <div className="applicant bg-white my-1 flex flex-col p-1  m-1 shadow-md rounded-md  ">
          <div className="name">Name</div>
          <div className="address">Adreess</div>
          <button
            onClick={approve}
            className="bg-teal-400 w-32 rounded-md shadow-md text-white"
          >
            Approve
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Election;
