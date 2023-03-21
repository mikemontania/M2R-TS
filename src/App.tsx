import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HeaderComponent } from './Layout/HeaderComponent';
import { SidebarComponent } from './Layout/SidebarComponent';
import { AuxComponent } from './Layout/AuxComponent';
import { MyRoutes } from './MyRoutes/MyRoutes';
import { LayoutProvider } from './Context/LayoutContext';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (

    <LayoutProvider>
      <BrowserRouter>
        <HeaderComponent />
        <div className="app-main">
          <SidebarComponent />
          <div className="app-main__outer">
            <div className='bodycontainer'>
              <MyRoutes />
            </div>
          </div>
        </div>
      </BrowserRouter>

    </LayoutProvider>
  )
}

export default App
