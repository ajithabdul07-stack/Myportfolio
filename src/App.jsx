import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Portfolio from './Aboutme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TicTacToe from './tictactoe'
import Ecommerce from './ecommerce'
import ChatbotWebsite from './chatbot'
import ProductRecommendation from './recommend'
import PatientManagement from './patient'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Portfolio />} />
      <Route path='/tic-tac-toe' element={<TicTacToe />} />
      <Route path='/ecommerce' element={<Ecommerce />} />
      <Route path='/chatbot' element={<ChatbotWebsite />} />
      <Route path='/recommendation-system' element={<ProductRecommendation />} />
      <Route path='/patient' element={<PatientManagement />} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
