import { spaceModel } from "../schema/spaceSchema"
import jwt from "jsonwebtoken"
import { Socket } from "socket.io"
const getrandomstring=(length:number)=>{
       const alpha= 'ABCDEFGHIJKLMNOPQRSTUVWX' 
       let result = '' 
       for (let i=0; i<length; i++){
            result = alpha.charAt( Math.random()*alpha.length)
            return result        
        
        
        }
}


const secret_key="ok_this_working1234"
export class User {
      public id : string|undefined;
      public userid? : string;
      private spaceId? : string;
      private x:number;
      private y : number;
      private send:()=>any
      private Socket : Socket;
        constructor(Socket:Socket){
           this.id=getrandomstring(10)
           this.x=0;
           this.y=0;
           this.Socket=Socket 
           this.initHndler()
           this.send()
        } 
      async  initHndler(){
          this.Socket.on('connection', async  (data)=>{
                const {type,spacId,token}=data
                switch (type){
                case 'join':
                    const userId = jwt.verify(token,secret_key) as any
                    if (!userId){
                        this.Socket.disconnect()
                        return 
                    } 
                    this.userid=userId  
                    const isSpaceId = await spaceModel.findOne({spacId}) 
                    if (!isSpaceId){
                        this.Socket.disconnect()
                        return    
                    } 
                    this.spaceId=spacId

                } 

            
            
          })
        }
        }
