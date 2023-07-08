import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {baseUrl} from '../constant'

const Registration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (phone.length < 10 || phone.length > 13) {
      alert('Phone should be 10 digit')
    }
    // Create form data object
    // const formData = new FormData()
    // formData.append('name', name)
    // formData.append('email', email)
    // formData.append('gender', gender)
    // formData.append('password', password)
    // formData.append('phone', phone)
    try {
      const response = await axios.post(`${baseUrl}/register`, {
        name,
        email,
        phone,
        password,
        gender,
      })

      if (response.status === 200) {
        toast(response?.data?.message)
        navigate('/login')
      } else {
        toast(response?.data?.message)
      } // Handle success response
    } catch (error) {
      console.error(error) // Handle error
    }
  }

  return (
    <div className='container col-md-4 border mt-4 shadow p-3 mb-5 bg-white rounded'>
      <h4 className='text-center mt-3'>Registration Form</h4>
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
            placeholder='Enter your name'
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
            placeholder='Enter your mail'
            name='email'
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
            placeholder='Enter Your password'
            required
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
            type='text'
            className='form-control'
            id='phone'
            maxLength={13}
            minLength={10}
            placeholder='Enter your phone'
            required
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {/* <div className='mb-2'>
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
        </div> */}
        <div className='d-flex flex-column '>
          <Link to='/login' className='text-decoration-none'>
            You haven an account
          </Link>
          <button type='submit' className='btn btn-primary mb-4 mt-3'>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Registration
