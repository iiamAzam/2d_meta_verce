import express from 'express'
import authController from '../controllers/authrout'

const route=express.Router()
route.post('/register',authController.authRegister)
route.post ('/login',authController.Login)

export default route