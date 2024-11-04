import { Router } from "express";
import {space} from  "../controllers/spacecontroller"
import middlewawre from "../middleware/middlware";
const spaceroute = Router()
spaceroute.post('/',middlewawre,space.createspace)
spaceroute.delete('/:spaceId',middlewawre,space.spaceDelete)
spaceroute.get('/:all',middlewawre,space.getall)
spaceroute.get('/:spaceId',middlewawre,space.getaspace)


export default spaceroute