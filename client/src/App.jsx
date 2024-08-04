import Login from './pages/login'
import Home from './pages/home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path ='/' element={<Login/>}></Route>
            <Route path ='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
