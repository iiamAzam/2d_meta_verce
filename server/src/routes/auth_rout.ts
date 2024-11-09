import express from 'express'
import {userAuthentication} from '../controllers/authcontrollers'
import {user_route} from './userDatarout'
import { avatars } from '../controllers/avatarController'
import spaceroute from './spaceRout'
import middlewawre from '../middleware/middlware'
import { element } from '../controllers/elementscontroller'
import adminRoute from './adminroute'
const route=express.Router()
route.post('/signup',userAuthentication.signUp)
route.post ('/signin',userAuthentication.signIn)
route.get('/avatars',middlewawre,avatars.getallavatars)
route.get('/elements',middlewawre,element.getallelements)
route.use('/user',user_route)
route.use('/admin',adminRoute)
route.use('/space',spaceroute)
export default route


