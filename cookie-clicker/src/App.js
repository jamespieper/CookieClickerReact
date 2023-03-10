import React from 'react'
import Signup from "./Signup"
import Login from "./Login"
import Dashboard from './Dashboard'

import { Container } from 'react-bootstrap'
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import './App.css'


function App() {
  return (

    
      <Container 
        className='d-flex align-items-center justify-content-center'
        style={{minHeight: '100vh'}}
      >
        
        <div className='w-100'>

            <Router>
              <AuthProvider>
                <Routes>
                  
                  <Route path='/' element={
                    <PrivateRoute>
                      <Dashboard/>
                    </PrivateRoute>
                  }
                  ></Route>

                  <Route path='/signup' element={<Signup/>} />
                  <Route path='/login' element={<Login/>} />
                </Routes>
              </AuthProvider>

            </Router>

            
        </div>
        
      </Container>


    
     
    

  );
}

export default App
