import { spaceModel } from "../schema/spaceSchema";
import { Roommanager } from "./roomManager";
import jwt, {  JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
interface Datatype{
        type:string,
        spacId:string,
        token:string,
        nickname:string
}

const getRandomString = (length: number): string => {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWX';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += alpha.charAt(Math.floor(Math.random() * alpha.length));
    }
    return result;
};

const SECRET_KEY = "ok_this_working1234";

  class User {
    public id: string;
    public userid?:string|null;
    public spaceId?: string;
    private x: number;
    private y: number;
    public socket: Socket;
    public nickname?:string

    constructor(socket: Socket) {
        console.log('User constructor called for socket:', socket.id);
        this.id = getRandomString(10);
        this.x = 0;
        this.y = 0;
        this.socket = socket;
        this.initHandler();
    }

    initHandler() {

        this.socket.on('initialdata' , async (data) => {
            const { type, spacId,token, nickname } = data as Datatype
            try {
                switch (type) {
                    case 'join':
                        try {
                            const userId = jwt.verify(token, SECRET_KEY) as JwtPayload|{_id:string}
                            this.userid = userId._id;
                            console.log(userId)

                            const space = await spaceModel.findOne({ spacId });
                            console.log(space)
                            if (!space) {
                                console.log('id problem')
                                this.socket.disconnect();
                                return;
                            }

                            this.spaceId = spacId;
                            this.nickname=nickname
                            Roommanager.getInstance().addUser(spacId, this);

                            this.x = Math.floor(Math.random() * space.width);
                            this.y = Math.floor(Math.random() * space.height);
                            this.socket.emit("spacejoined", {
                                x: this.x,
                                y: this.y,
                                users: Roommanager.getInstance().rooms.get(spacId)
                                    ?.filter(x => x.id !== this.id)
                                    ?.map((u) => ({ id: u.id })) ?? [],
                            });

                        } catch (error) {
                            if (error instanceof jwt.JsonWebTokenError) {
                                console.log('catch1 problem')
                                console.log(error);
                                  this.socket.disconnect();
                            }
                            console.error(error)
                            console.log('catch1 problem')
                            return;
                        }
                        break;

                    case 'move':
                        const { x, y } = data;
                        const xdisplacement = Math.abs(this.x - x);
                        const ydisplacement = Math.abs(this.y - y);

                        if ((xdisplacement === 1 && ydisplacement === 0) ||
                            (xdisplacement === 0 && ydisplacement === 1)) {
                            this.x = x;
                            this.y = y;
                            Roommanager.getInstance().broadcast(
                                {
                                    x: this.x,
                                    y: this.y
                                },
                                this.spaceId,
                                this
                            );
                            return;
                        }

                        this.socket.emit("movement-rejected", {
                            x: this.x,
                            y: this.y
                        });
                        break;
                }
            } catch (error) {
                console.error('Error handling socket event:', error);
                this.socket.emit('error', { message: 'Internal server error' });
            }
        });
        this.socket.on('disconnect', () => {
            this.destroy();
        });


    }

    destroy() {
        if (this.spaceId) {
            Roommanager.getInstance().broadcast(
                {
                    type: 'user-left',
                    payload: {
                        userId: this.userid
                    }
                },
                this.spaceId,
                this
            );

            Roommanager.getInstance().removeUser(
                this,
                this.spaceId
            );
        }
    }

    send(payload: any) {
        this.socket.emit('message', payload);
    }
}

export default User














































// import { spaceModel } from "../schema/spaceSchema"
// import { Roommanager } from "./roomManager"
// import jwt, { JsonWebTokenError } from "jsonwebtoken"
// import { Socket } from "socket.io"
// const getrandomstring=(length:number)=>{
//        const alpha= 'ABCDEFGHIJKLMNOPQRSTUVWX'
//        let result = ''
//        for (let i=0; i<length; i++){
//             result = alpha.charAt( Math.random()*alpha.length)
//             return result
//         }
// }
// const secret_key="ok_this_working1234"
// export class User {
//       public id : string|undefined;
//       public userid? : string;
//       public spaceId? : string;
//       private x:number;
//       private y : number;
//       public Socket : Socket;
//         constructor(Socket:Socket){
//            this.id=getrandomstring(10)
//            this.x=0;
//            this.y=0;
//            this.Socket=Socket
//            this.initHndler()

//         }
//         initHndler(){
//           this.Socket.on('connection', async  (data)=>{
//                 const {type,spacId,token}=data
//                 switch (type){
//                     case 'join':
//                     const userId = jwt.verify(token,secret_key) as any
//                     if (!userId){
//                         this.Socket.disconnect()
//                         return
//                     }
//                     this.userid=userId
//                     const isSpaceId = await spaceModel.findOne({spacId})
//                     if (!isSpaceId){
//                         this.Socket.disconnect()
//                         return
//                     }
//                     this.spaceId=spacId
//                     Roommanager.getinstatance().adduser(spacId,this)
//                     this.x=Math.floor(Math.random()*isSpaceId?.width)
//                     this.y=Math.floor(Math.random()*isSpaceId?.height)
//                     this.Socket.emit("space-joined",
//                         {x:this.x,
//                          y:this.y,
//                          users:Roommanager.getinstatance().rooms.get(spacId)?.filter(x=>x.id!==this.id)?.map((u)=>({id:u.id}))??[]
//                         })
//                     break

//                     case 'move':
//                         const {x,y}=data
//                         const xdisplacement=Math.abs(this.x - x)
//                         const ydisplacement=Math.abs(this.y-y)
//                         if ((xdisplacement==1&&ydisplacement==0)|| (xdisplacement==0&&ydisplacement==1)){
//                                 this.x=x
//                                 this.y=y
//                                 Roommanager.getinstatance().broadcast(
//                                         {
//                                             x:this.x,
//                                             y:this.y
//                                         },
//                                         this.spaceId,
//                                         this

//                                 )
//                                 return
//                         }

//                         this.Socket.send(
//                             {
//                                 type:"movement-rejected",
//                                 x:this.x,
//                                 y:this.y
//                             }
//                         )
//                     }
//                 }
//             )
//         }
//         distroy(){
//             Roommanager.getinstatance().broadcast(

//                 { type:'user-left',
//                     payload:{
//                         userId:this.userid
//                     }},
//                     this.spaceId,
//                     this)
//                     Roommanager.getinstatance().removeuser(
//                         this,
//                         this.spaceId
//                     )

//         }
//         send(payload:any){
//             this.Socket.send(payload)
//         }
//     }
