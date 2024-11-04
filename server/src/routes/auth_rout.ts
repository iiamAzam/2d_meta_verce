import express from 'express'
import {userAuthentication} from '../controllers/authcontrollers'
import {user_route} from './userDatarout'
import { avatars } from '../controllers/avatarController'
import spaceroute from './spaceRout'
const route=express.Router()
route.post('/signup',userAuthentication.signUp)
route.post ('/signin',userAuthentication.signIn)
route.get('/avatars',avatars.getallavatars)
route.use('/user',user_route)
route.use('/space',spaceroute)
export default route


