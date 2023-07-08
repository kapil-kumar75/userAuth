import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userRegisterController = async (req, res) => {
  try {
    const {name, email, gender, password, phone} = req.body
    let msg = ''
    let invalid = false

    if (!name) {
      invalid = true
      msg = 'Name is required'
    } else if (!email) {
      invalid = true
      msg = 'Email is required'
    } else if (!gender) {
      invalid = true
      msg = 'Gender is required'
    } else if (!password) {
      invalid = true
      msg = 'Password is required'
    } else if (!phone) {
      invalid = true
      msg = 'Phone is required'
    }

    if (invalid) {
      return res.status(201).send({
        success: false,
        message: msg,
      })
    }

    const existUser = await userModel.findOne({email})
    if (existUser) {
      return res.status(201).send({
        success: false,
        message: 'User already register',
      })
    }

    let hashedPassword
    if (password) {
      const salt = 10
      hashedPassword = await bcrypt.hash(password, salt)
    }

    const userData = new userModel({
      name,
      email,
      gender,
      phone,
      password: hashedPassword,
    })
    const user = await userData.save()
    if (user) {
      return res.status(200).send({
        success: true,
        message: 'Registration has been successfully',
        user,
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    let JWT_SECRET = 'sjkdfjkasdfjkgajkds'
    let msg = ''
    let invalid = false

    if (!email) {
      invalid = true
      msg = 'Email is required'
    } else if (!password) {
      invalid = true
      msg = 'Password is required'
    }

    if (invalid) {
      return res.status(201).send({
        success: false,
        message: msg,
      })
    }

    const existUser = await userModel.findOne({email})

    if (!existUser) {
      return res.status(201).send({
        success: true,
        message: 'User is not register',
      })
    }

    const match = await bcrypt.compare(password, existUser.password)

    if (!match) {
      return res.status(201).send({
        success: false,
        message: 'Invalid password',
      })
    }
    let token = await jwt.sign({_id: existUser._id}, JWT_SECRET, {expiresIn: '7d'})
    if (existUser) {
      req.session.user_id = existUser._id
      return res.status(200).send({
        success: true,
        message: 'User login successfully',
        user: existUser,
        token,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const {id} = req.query

    const profile = await userModel.findById({_id: id}).select('-password')

    if (profile) {
      return res.status(200).send({
        success: true,
        profile,
      })
    } else {
      return res.status(404).send({
        success: false,
        message: 'User data not found',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {name, gender, password, status, phone} = req.body
    const {id} = req.query
    let profile_pic = req.file?.filename
    const userData = await userModel.findById({_id: id})
    if (userData) {
      if (profile_pic === undefined) {
        profile_pic = userData?.profile_pic
      } else {
        profile_pic = `http://localhost:5000/profile/${profile_pic}`
      }
    }
    let update = {}
    if (password !== '') {
      const salt = 10
      const hashedPassword = await bcrypt.hash(password, salt)
      update = await userModel.findByIdAndUpdate(
        {_id: id},
        {$set: {name, status, phone, gender, password: hashedPassword, profile_pic}},
        {new: true}
      )
    } else {
      update = await userModel.findByIdAndUpdate(
        {_id: id},
        {$set: {name, phone, gender, status, profile_pic}},
        {new: true}
      )
    }
    return res.status(201).send({
      success: true,
      message: 'Profile update successfully',
      update,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const logout = async (req, res) => {
  try {
    req.session.destroy()
    return res.status(201).send({
      success: true,
      message: 'User logout successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const {id} = req.query
    const deleteUser = await userModel.findByIdAndDelete({_id: id})
    if (deleteUser) {
      req.session.destroy()
      return res.status(200).send({
        success: true,
        message: 'User profile deleted successfully',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

export const getUserList = async (req, res) => {
  try {
    const users = await userModel.find({})
    res.render('userList', {users})
  } catch (error) {
    console.log(error)
  }
}
