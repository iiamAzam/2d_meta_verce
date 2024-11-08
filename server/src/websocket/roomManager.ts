 import { User } from "./user"

export class Roommanager{
        rooms:Map<string, User[]>=new Map()
        static instatance:Roommanager;
        private constructor (){
            this.rooms=new Map()
        }
        static getinstatance(){
                if(!this.instatance){
                    this.instatance=new Roommanager()
                }
                return this.instatance
        }
        adduser(spaceId:string,user:User){
                if(!this.rooms.has(spaceId)){
                    this.rooms.set(spaceId,[user])
                    return
                }
        }
        removeuser(user:User,spaceId:any){
            if(!this.rooms.has(spaceId)){
                return
            }
            this.rooms.set(spaceId,(this.rooms.get(spaceId)?.filter(u=>u.id!==user.id)??[]))
            return}
            broadcast (message:any, roomid:any,user:User){
                    if(this.rooms.has(roomid)){
                        return 
                    }
                    this.rooms.get(roomid)?.forEach((u)=>{
                        if(u.id!==user.id){
                            u.Socket.send(message)  
                        }
                    })
                     
                } 
     }



