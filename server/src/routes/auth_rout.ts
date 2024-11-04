import express from 'express'
import {userAuthentication} from '../controllers/authcontrollers'
import {user_route} from './userDatarout'
const route=express.Router()
route.post('/signup',userAuthentication.signUp)
route.post ('/signin',userAuthentication.signIn)



route.use('/user',user_route)
export default route


