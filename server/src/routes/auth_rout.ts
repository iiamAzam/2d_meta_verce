import express from 'express'
import {userAuthentication} from '../controllers/authcontrollers'
import {user_route} from './userDatarout'
import { avatars } from '../controllers/avatarController'
const route=express.Router()
route.post('/signup',userAuthentication.signUp)
route.post ('/signin',userAuthentication.signIn)
route.get('/avatars',avatars.getallavatars)
route.use('/user',user_route)

export default route


