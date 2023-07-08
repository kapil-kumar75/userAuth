import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {baseUrl} from '../constant'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    setUser(JSON.parse(userData))
  }, [])

  const handelLogout = async () => {
    const response = await axios.get(`${baseUrl}/logout`)
    if (response.status === 201) {
      toast(response?.data?.message)
      localStorage.clear('user')
      navigate('/login')
    }
  }

  const handelDelete = async () => {
    const response = await axios.get(`${baseUrl}/delete-profile?id=${user._id}`)
    if (response.status === 200) {
      toast(response?.data?.message)
      navigate('/register')
    }
  }

  return (
    <div>
      <header className='bg-light text-black'>
        <div className='container py-3 d-flex justify-content-between'>
          <h4>Profile</h4>
          <div>
            <Link
              to='/profile/update-profile'
              className='btn btn-primary text-decoration-none'
              style={{marginRight: '8px'}}
            >
              Update Profile
            </Link>
            <button className='btn btn-primary' style={{marginRight: '8px'}} onClick={handelLogout}>
              Logout
            </button>
            <button className='btn btn-primary ml-3' onClick={handelDelete}>
              Delete Profile
            </button>
          </div>
        </div>
      </header>

      <main className=' ' style={{maxHeight: '100vh', minHeight: '80vh'}}>
        <div className='container py-5'>
          <div className='mb-2'>
            <img
              src={user?.profile_pic}
              alt='image'
              className='border rounded'
              width='60px'
              height='60px'
            />
          </div>
          <h3>Name : {user?.name}</h3>
          <h4>Email : {user?.email}</h4>
          <h3>Phone : {user?.phone}</h3>
          <h3>
            Status : {user?.status === 0 ? 'In Active' : user?.status === 1 ? 'Active' : 'Pending'}
          </h3>
        </div>
      </main>

      <footer className='bg-light text-black'>
        <div className='container py-3'>
          <p>&copy; 2023 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Profile
