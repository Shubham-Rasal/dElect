import React, { useState ,useEffect ,useContext } from 'react'
import { Navigate,  } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import Button from './Button'
import { CandidateElection } from './Election'

const Candidate = () => {

    const {contract} = useContext(GlobalContext)
    const {connect} = useContext(GlobalContext)
    const [connected,setIsConnected] = connect;
    console.log(connected)
    let electionCount =0;
    

    const [statusClass, setStatusClass] = useState({
        className: 'bg-green-300',
        status: 'active'
    })
    const [elections,setElections] = useState([]);
    useEffect(() => {
        
        let elections = [];

        (async()=>{
             electionCount = await contract.electionCount();
            console.log("NO of Elections : ",Number(electionCount.toString()))

            for(let i=1;i<=electionCount;i++){

                const election = await  contract.elections(i);                
                elections =[election , ...elections]

            }
            setElections(elections)

        })()



       


    }, [])

    if(!connected){
        
        return(
            <Navigate replace to={'/dElect/'} />
        )
    }

    return (
        <div className="flex flex-col">
            <div className="active-elections w-screen">
                <div className="bg-red-300 w-screen "> Active Elections</div>
                {elections.map((election,index) =>{
                    // console.log(election)
                    return(
                        <CandidateElection key={index}  election={election}/>
                    )
                })}

            </div>
            <div className="standing flex flex-col items-center">
                <div className="0 w-screen"> Approved Elections: </div>
                {/* <div className="election-card  ml-5 mt-3 w-2/4 shadow-xl rounded-md bg-slate-100 hover:scale-105 transition-all duration-300 ease-in">
                    <div className={`name flex justify-between  items-center p-1 border-green-400 border-y-2 px-2 font-semibold text-lg  `}>Mid-Term Elections
                        <span className={`status ${statusClass.className}    p-1 px-2   m-1 rounded-full `}>{statusClass.status}</span>
                    </div>
                    <div className={`flex justify-between font-bold text-slate-500 results-live text-xl p-2 `}>Votes
                    <div className='text-black'>20</div>
                    </div>
                    <div className={`results-live text-xl font-semibold p-2 `}><span className='text-slate-500'>Status :</span>  Lost</div>
                </div>
                <div className="election-card  ml-5 mt-3 w-2/4 shadow-xl">
                    <div className={`name flex items-center p-1 px-2 font-semibold `}>Mid-Term Elections
                        <span className={`status ${statusClass.className}   p-1  m-1 rounded-lg`}>{statusClass.status}</span>
                    </div>
                    <div className={`flex justify-between font-bold text-slate-500 results-live text-xl p-2 `}>Votes:
                    <div>20</div>
                    </div>
                    <div className={` flex justify-between results-live text-xl font-semibold p-2 `}><span className='text-slate-500'>Status :</span>  Lost</div>
                </div> */}
               
            </div>
        </div>
    )
}

export default Candidate