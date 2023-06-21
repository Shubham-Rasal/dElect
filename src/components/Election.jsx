import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./../GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Election = ({ election }) => {
  const { contract, accounts } = useContext(GlobalContext);
  let { applicantCount, candidateCount, admin, startTime, duration, name, id } =
    election;
  const date = new Date(startTime.toNumber());
  const today = Date.parse(new Date().toLocaleString());
  let timeLeft = Math.ceil(
    (startTime.toNumber() - today) / (1000 * 60 * 60 * 24)
  );
  const formatter = new Intl.RelativeTimeFormat("en");
  timeLeft = formatter.format(timeLeft, "days");
  const voteToast = () =>
    toast.success("Voted for Election Successfully.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorToast = (data) =>
    toast.error(data, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [hasVoted, setHasVoted] = useState([]);
  const [voted, setVoted] = useState(false);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const voterAddress = accounts[0];
    const checkVote = async () => {
      const hasVoted = await contract.hasVoted(id);
      console.log("Has voted for " + election.name + " ", hasVoted);
      setHasVoted(hasVoted);
    };
    checkVote();

    (async () => {
      for (let index = 1; index <= candidateCount.toNumber(); index++) {
        const candidate = await contract.getCandidate(id.toString(), index);
        console.log(candidate);
        setCandidates([...candidates, { candidate: candidate, id: index }]);
      }
    })();

    console.log(candidates);
  }, [accounts, contract, id]);

  async function vote(candidate) {
    console.log(candidate);
    try {
      const res = await contract.vote(id, candidate.id);
      const receipt = await res.wait();
      console.log(receipt);
      if (receipt.status) {
        voteToast();
        //set has voted to true for this election and this candidate
        setHasVoted(true);
      }
    } catch (err) {
      const error = err.error;
      console.log(error.data.message);
      errorToast(error.data.message);
    }
  }

  return (
    <div className="flex flex-col sm:w-2/4 w-auto bg-slate-900 shadow-slate-300 m-3 p-3 rounded-md ">
      <div className="title text-lg font-bold bg-slate-100  p-2  shadow-xl">
        {name}
      </div>
      {!hasVoted ? (
        <div className="wrapper">
          <div className=" bg-slate-200 my-2 p-2 ">
            <div className="candidates rounded-sm flex text-center items-center  gap-2">
              <div className="text-lg font-bold rounded-md  ">Candidates</div>
              <div className="text-sm font-bold text-gray-500 ">
                {candidateCount.toString()} candidates
              </div>
            </div>
          </div>
          <div className="start">
            {startTime.toNumber() > Date.parse(new Date().toLocaleString()) ? (
              <div className="text-lg font-bold text-slate-800">
                Election Starts in {timeLeft}
              </div>
            ) : startTime.toNumber() >
                Date.parse(new Date().toLocaleString()) &&
              startTime.toNumber() <
                Date.parse(new Date().toLocaleString()) +
                  duration.toNumber() ? (
              <div className="text-lg font-bold text-green-900">
                Election is live
              </div>
            ) : (
              <div className="text-lg font-bold text-slate-900">
                Election Ended
              </div>
            )}
          </div>
          <div className="candidates">
            {candidates.map((candidate, index) => (
              <div
                className="candidate flex justify-between border-2 m-2 p-2 border-blue-900  gap-2"
                key={index}
              >
                <div className="name text-lg font-bold">
                  {candidate.candidate}
                </div>
                <div className="vote">
                  <button
                    onClick={() => vote(candidate)}
                    className=" bg-white text-blue-500 font-bold py-2 px-4 rounded-full
          hover:bg-blue-500 hover:text-white border border-blue-500 hover:border-transparent
            transition duration-300 ease-in-out"
                  >
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="voted text-lg font-bold bg-slate-100  p-2 rounded-md shadow-xl">
          You have already voted for this election
        </div>
      )}
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
        console.log("Applicant for " + name + " : ", applicant.status);
        const applicantAddress = applicant.add;

        if (applicantAddress.toLowerCase() === userAddress.toLowerCase()) {
          console.log("User has applied for " + name);
          if (applicant.status == "Pending") {
            setHasApplied(true);
            break;
          }
        }
      }
    })();
  }, []);

  async function apply() {
    try {
      const voter = await contract.voters(userAddress);
      // console.log(voter);
      // console.log(id.toString());
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
      <div className="name  text-xl font-semibold ">{name}</div>
      <div className="admin">
        <span>Admin : </span>
        <a
          href={`https://etherscan.io/address/${admin}`}
          className="text-blue-500"
        >
          {admin.slice(0, 6)}...
        </a>
      </div>
      <div className="start">
        <span className="text-slate-600">Starts on :</span>
        {date.toUTCString()}
      </div>
      <div className="time left">
        {startTime.toNumber() > Date.parse(new Date().toLocaleString()) ? (
          <>
            <div className="text-lg font-bold text-slate-800">
              Election Starts in {timeLeft}
            </div>
            <div className="apply">
              <button
                onClick={apply}
                disabled={hasApplied}
                className={`${
                  hasApplied ? "bg-gray-400" : "bg-green-500"
                } p-2 m-1 rounded-md px-3 text-lg`}
              >
                {hasApplied ? "Applied" : "Apply"}
              </button>
            </div>
          </>
        ) : startTime.toNumber() > Date.parse(new Date().toLocaleString()) &&
          startTime.toNumber() <
            Date.parse(new Date().toLocaleString()) + duration.toNumber() ? (
          <div className="text-lg font-bold text-green-900">
            Election is live
          </div>
        ) : (
          <div className="text-lg font-bold text-slate-900">Election Ended</div>
        )}
      </div>
    </div>
  );
};

export const AdminElection = ({ election }) => {
  const { contract } = useContext(GlobalContext);

  const [applicants, setApplicants] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // console.log(election)
  let { applicantCount, candidateCount, admin, startTime, duration, name, id } =
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
      for (let index = 1; index <= candidateCount.toNumber(); index++) {
        const candidate = await contract.getCandidate(id.toString(), index);
        console.log(candidate);
        setCandidates([...candidates, candidate]);
      }
      for (let index = 0; index < applicantCount.toNumber(); index++) {
        const applicant = await contract.getApplicant(id.toString(), index);
        console.log(applicant);
        // debugger;
        //check appicant status and then add only if status is pending
        if (applicant.status == "Pending") {
          setApplicants([...applicants, applicant]);
        }
      }

      // console.log(candidates);
      // console.log(applicants);
    })();
  }, []);

  async function approve(applicant) {
    // implementation required
    try {
      console.log(applicant);
      const aid = applicant.applicantId;
      const res = await contract.approveApplicant(
        aid.toNumber(),
        id.toNumber()
      );
      const receipt = await res.wait();
      console.log(receipt);
      const applicants = applicants.filter(
        (app) => app.applicantId !== applicant.applicantId
      );
      setApplicants(applicants);
      for (let index = 0; index < candidateCount.toNumber(); index++) {
        const candidate = await contract.getCandidate(id.toString(), index);
        setCandidates([...candidates, candidate]);
      }
    } catch (err) {
      console.error(err);
    }
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
        {candidates.map((candidate, index) => (
          <div
            className="applicant bg-white my-1 flex flex-col p-1  m-1 shadow-md rounded-md  "
            key={index}
          >
            <div className="name bg-blue-200  ">Name : {candidate}</div>
          </div>
        ))}
      </div>
      <div className="applicants flex flex-col gap-2">
        <h2 className="flex items-center h-10  text-teal-800 drop-shadow-xl  justify-center bg-amber-100 my-1 w-1/4">
          Applicants: {applicantCount.toString()}
        </h2>
        {applicants.map((applicant, index) => (
          <div
            className="applicant bg-white my-1 flex flex-col p-1  m-1 shadow-md rounded-md  "
            key={index}
          >
            <div className="name bg-blue-200  ">Name : {applicant.name}</div>
            <div className="address bg-blue-100 ">
              Address : {applicant.add}
            </div>
            <div className="status bg-amber-100 ">
              Status : {applicant.status}
            </div>

            <button
              onClick={() => approve(applicant)}
              className="bg-teal-400 w-32 rounded-md shadow-md text-white my-2"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Election;
