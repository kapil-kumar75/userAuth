import express from 'express'
import cors from 'cors'
import session from 'express-session'
import connectDB from './db/connection.js'
import path from 'path'
import userRouters from './routers/userRouters.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app = express()

import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const oneDay = 1000 * 60 * 60 * 24
app.use(express.static(path.resolve('public')))
app.use('/profile', express.static('public/profile'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))


// middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
  })
)
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors())

connectDB()

app.use('/user', userRouters)

app.listen(5000, (req, res) => {
  console.log('Server is running on port 5000')
})
