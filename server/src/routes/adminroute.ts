import { Router } from "express";
import { adminController } from "../controllers/adminController";
import adminmiddleware from "../middleware/adminMiddleware";
const adminRoute=Router()

adminRoute.post('/element',adminController.createElement)
adminRoute.put('/element/:elementId',adminController.updateElement)
adminRoute.post('/avatar',adminmiddleware,adminController.creatAvatar)
adminRoute.get("/avatar",adminmiddleware,adminController.getavatar)
adminRoute.post('/map',adminController.creatMap)

export default adminRoute