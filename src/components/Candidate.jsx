import React, { useState ,useEffect } from 'react'

const Candidate = () => {
    const [statusClass, setStatusClass] = useState({
        className: 'bg-green-300',
        status: 'active'
    })
    useEffect(() => {

        setStatusClass({
            className: 'bg-yellow-500',
            status: 'closed'
        })


    }, [])

    return (
        <div className="flex flex-col">
            <div className="active-elections w-screen">
                <div className="bg-red-300 "> Active Elections</div>

            </div>
            <div className="standing flex flex-col items-center">
                <div className="bg-red-500 w-screen"> Approved Elections: </div>
                <div className="election-card ml-5 mt-3 w-2/4 bg-blue-200">
                    <div className={`name flex items-center p-1  font-semibold text-yellow-900`}>Mid-Term Elections
                        <span className={`status ${statusClass.className}   text-white p-1  m-1 rounded-lg`}>{statusClass.status}</span>
                    </div>
                    <div className={`results-live text-lg p-2 bg-blue-300 text-blue-900`}>Votes: 20</div>
                    <div className={`results-live text-lg p-2 bg-blue-300 text-blue-900`}>Lost</div>
                </div>
            </div>
        </div>
    )
}

export default Candidate