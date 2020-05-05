import React from 'react'
import './App.css'
import {Wrapper} from "./Components/Wrapper/Wrapper"
import {BrowserRouter} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Wrapper />
      </div>
    </BrowserRouter>
  )
}

export default App