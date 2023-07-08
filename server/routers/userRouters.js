import express from 'express'
import {
  userRegisterController,
  deleteProfile,
  login,
  getProfile,
  updateProfile,
  logout,
  getUserList,
} from '../controllers/userController.js'
import multer from 'multer'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const router = express.Router()

router.use(express.static('public'))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/profile'), function (err, success) {
      if (err) {
        throw err
      }
    })
  },
  filename: function (req, file, cb) {
    const str = file.originalname
    const name = str.split(' ').join('')
    cb(null, name, function (err, success) {
      if (err) {
        throw err
      }
    })
  },
})

const upload = multer({storage: storage})

router.post('/register', userRegisterController)
router.post('/login', login)
router.get('/profile', getProfile)
router.post('/update-profile', upload.single('profile_pic'), updateProfile)
router.get('/logout', logout)
router.get('/delete-profile', deleteProfile)
router.get('/user-list', getUserList)

export default router
