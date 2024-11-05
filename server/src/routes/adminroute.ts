import { Router } from "express";
import { adminController } from "../controllers/adminController";
const adminRoute=Router()

adminRoute.post('/element',adminController.createElement)
adminRoute.put('/element/elementId',adminController.updateElement)
adminRoute.post('/avatar',adminController.creatAvatar)
adminRoute.post('/map',adminController.creatMap)
