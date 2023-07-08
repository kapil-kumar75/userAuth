import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {baseUrl} from '../constant'

const UpdateProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState()

  const [profile, setProfile] = useState({})

  const navigate = useNavigate()

  const getProfile = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/get-profile?id=${id}`)
      setProfile(response?.data?.profile)
      setName(response?.data?.profile?.name)
      setEmail(response?.data?.profile?.email)
      setGender(response?.data?.profile?.gender)
      setPhone(response?.data?.profile?.phone)
      setStatus(response?.data?.profile?.status)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    getProfile(JSON.parse(userData)?._id)
    setUserId(JSON.parse(userData)?._id)
    setProfilePic(JSON.parse(userData)?.profile_pic)
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Create form data object
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('gender', gender)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('status', status)
    formData.append('profile_pic', profilePic)
    try {
      const response = await axios.put(`${baseUrl}/update-profile?id=${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 201) {
        toast(response?.data?.message)
        localStorage.setItem('user', JSON.stringify(response?.data?.update))
        navigate('/profile')
      } else {
        toast(response?.data?.message)
      }
      console.log(response) // Handle success response
    } catch (error) {
      console.error(error) // Handle error
    }
  }

  return (
    <div>
      <header className='bg-light text-black'>
        <div className='container py-3 d-flex justify-content-between'>
          <h4>This is the task</h4>
          <Link to='/register' className='btn btn-primary text-decoration-none'>
            Logout
          </Link>
        </div>
      </header>

      <div className='container col-md-4 border mt-4 shadow p-3 mb-5 bg-white rounded'>
        <h4 className='text-center mt-3'>Update profile</h4>
        <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
          <div className='mb-2'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              required
              name='email'
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-2 '>
            <label className='form-label'>Gender</label>
            <div className='d-flex'>
              <div className='form-check' style={{marginRight: '5px'}}>
                <input
                  type='radio'
                  className='form-check-input'
                  id='male'
                  name='gender'
                  value='male'
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor='male' className='form-check-label'>
                  Male
                </label>
              </div>
              <div className='form-check'>
                <input
                  type='radio'
                  className='form-check-input'
                  id='female'
                  name='gender'
                  value='female'
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor='female' className='form-check-label'>
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='phone' className='form-label'>
              Phone
            </label>
            <input
              type='number'
              className='form-control'
              id='phone'
              required
              maxLength={13}
              minLength={10}
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label className='form-label'>Status</label>
            <select
              className='form-control'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='1' checked={status === 1 ? true : false}>
                Active
              </option>
              <option value='0' checked={status === 0 ? true : false}>
                In Active
              </option>
              <option value='2' checked={status === 2 ? true : false}>
                Pending
              </option>
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor='profilePic' className='form-label'>
              Profile Picture
            </label>
            <input
              type='file'
              className='form-control'
              id='profilePic'
              name='profile_pic'
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <div className='d-flex flex-column '>
            <button type='submit' className='btn btn-primary mb-4 mt-3'>
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <footer className='bg-light text-black'>
        <div className='container py-3'>
          <p>&copy; 2023 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default UpdateProfile
