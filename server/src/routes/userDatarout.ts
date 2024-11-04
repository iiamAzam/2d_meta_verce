import { Router } from "express";
import middleware from "../middleware/middlware"; // Corrected the spelling
import {updatedata} from '../controllers/userdatacontroller'
const userroute = Router();
userroute.post('/metadata', middleware,updatedata);

export const user_route = userroute;
