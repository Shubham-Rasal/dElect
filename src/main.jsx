import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalContextProvider } from './GlobalContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Candidate from './components/Candidate';
import AdminPortal from './components/AdminPortal';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/candidate' element={<Candidate />} />
          <Route path='/admin' element={<AdminPortal />} />
        </Routes>


      </Router>
    </GlobalContextProvider>
  </React.StrictMode>
)
