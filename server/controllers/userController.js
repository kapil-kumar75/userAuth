import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

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
      res.status(201).send({
        success: false,
        message: msg,
      })
    }

    const existUser = await userModel.findOne({email})

    if (existUser) {
      res.status(201).send({
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
      res.status(200).send({
        success: true,
        message: 'Registration has been successfully',
        user,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in user registration',
    })
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body

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
      res.status(201).send({
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

    if (existUser) {
      req.session.user_id = existUser._id
      res.status(200).send({
        success: true,
        message: 'User login successfully',
        user: existUser,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in user login',
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const {id} = req.query

    const profile = await userModel.findById({_id: id}).select('-password')

    if (profile) {
      res.status(200).send({
        success: true,
        profile,
      })
    } else {
      res.status(404).send({
        success: false,
        message: 'User data not found',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in get user profile',
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {name, gender, password, status, phone} = req.body
    const profile_pic = req.file?.filename
    const {id} = req.query
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

    await update.save()
    res.status(201).send({
      success: true,
      message: 'Profile update successfully',
      update,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in update profile',
    })
  }
}

export const logout = async (req, res) => {
  try {
    req.session.destroy()
    res.status(201).send({
      success: true,
      message: 'User logout successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in user logout',
    })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const {id} = req.query
    const deleteUser = await userModel.findByIdAndDelete({_id: id})
    if (deleteUser) {
      req.session.destroy()
      res.status(200).send({
        success: true,
        message: 'User profile deleted successfully',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in delete profile',
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
