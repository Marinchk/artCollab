import fs from 'fs'
import cors from 'cors'
import express, { response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import routerCollab from './router/routerCollab.js'
import routerAuth from './router/routerAuth.js'


dotenv.config()
const port = process.env.PORT || 3501
const corsOptions = {
    origin: ['localhost', process.env.IP_HOST]
  }
const app = express()

app.use(cors())
app.use(bodyParser.json())
express.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/collab', routerCollab)
app.use('/auth', routerAuth);

app.listen(port, () => {
    console.log('the server is running on the port ', port, ' ...')
})

