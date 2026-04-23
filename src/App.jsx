import React from 'react'
import Sidebar from './components/sidebar/Sidebar.jsx';
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom';
import { SettingsContext } from './context/SettingsContext.jsx';

function App() {
  
 const {settings} = React.useContext(SettingsContext)

  
  return (
   <div className={`min-h-screen flex flex-col md:flex-row ${settings.dark?'bg-radial-cosmic-dark':'bg-radial-cosmic'}`}>

      <div className=''>
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className='flex-1 md:ml-60'>
    
        <div className='flex justify-center'>
          <Header />
        </div>
       
        <div className=''>
          <Outlet />
        </div>
      </div>
   </div>


  )
}

export default App

