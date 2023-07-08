import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <header className='bg-light text-black'>
        <div className='container py-3 d-flex justify-content-between'>
          <h4>This is the task</h4>
          <Link to='/register' className='text-decoration-none'>
            Register
          </Link>
        </div>
      </header>

      <main className=' ' style={{maxHeight: '100vh', minHeight: '80vh'}}>
        <div className='container py-5'>
          <h2>Welcome to the interview task</h2>
        </div>
      </main>

      
    </div>
  )
}

export default Home
