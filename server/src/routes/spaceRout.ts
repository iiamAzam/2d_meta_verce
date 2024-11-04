import { Router } from "express";
import {space} from  "../controllers/spacecontroller"
import middlewawre from "../middleware/middlware";
import { SocketAddress } from "net";
const spaceroute = Router()

spaceroute.post('/',middlewawre,space.createspace)
spaceroute.delete('/:spaceId',middlewawre,space.spaceDelete)
spaceroute.get('/:spaceId',middlewawre,space.getall)

export default spaceroute