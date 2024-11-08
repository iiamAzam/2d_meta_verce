import { Router } from "express";
import middleware from "../middleware/middlware"; 
import {updatedata,getalldata} from '../controllers/userdatacontroller'
const userroute = Router();
userroute.post('/metadata', middleware,updatedata);
userroute.get('/metadata/bulk',middleware,getalldata)
export const user_route = userroute;


