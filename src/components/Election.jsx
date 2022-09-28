import React from 'react'

const Election = () => {
  return (
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
  )
}

export default Election