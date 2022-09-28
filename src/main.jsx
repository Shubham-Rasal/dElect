import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalContextProvider } from './GlobalContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Candidate from './components/Candidate';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Router>
        <Routes>
          <Route path='/dElect/' element={<App />} />
          <Route path='/dElect/candidate' element={<Candidate />} />
        </Routes>


      </Router>
    </GlobalContextProvider>
  </React.StrictMode>
)
