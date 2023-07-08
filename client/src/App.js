import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/Home'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/update-profile' element={<UpdateProfile />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

export default App
