
import { Stage, Container, Sprite } from '@pixi/react';
import  image  from '../assets/school/grass.jpg';
import image3 from '../assets/school/PineTools.com_files/border.png'
import image5 from '../assets/school/PineTools.com_files/almira.png'
import image6 from '../assets/school/PineTools.com_files/window.png'
import image7 from '../assets/school/PineTools.com_files/talbes2.png'
import image8 from '../assets/school/PineTools.com_files/chair2 .png'
import image9 from '../assets/school/PineTools.com_files/library.png'
import image10 from '../assets/school/PineTools.com_files/board.png'
import image11 from '../assets/school/PineTools.com_files/chaird.png'
import Charecter from '../components/Charecter';
import { useAuth } from '../httpconnection/Auth';
type tileType=0|1|2|3|4|5|6|7|8|9
type ClassroomLayout=tileType[][]
import { useSocket } from '../socket.connection/SocketContext';
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
interface Tilemap{
  [key:number]:string;
}
const tileMappings:Tilemap={
  0:image,     //Floor   <this are for remembering>
  1:image3 ,    //Wall (top/bottom)
  2:image3,     //Wall (top/bottom)
  3:image5,     //Door
  4:image6,     // window
  5:image7,     //Desk
  6:image8,     //chair
  7:image9,     //Bookshelf
  8:image10,    //whiteboard
  9:image11     //chair_green
}
export const TILE_SIZE : number = 32
export const classroomLayout: ClassroomLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 0, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 2],
  [2, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 2],
  [2, 0, 6, 0, 6, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 2],
  [2, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 2],
  [2, 0, 6, 0, 6, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 7, 0, 7, 0, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 2],
  [2, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

];
interface User{
        id : string,
        userid:string,
        spceID:string,
        nickname:string,
        x:number,
        y:number,
}

interface joinedsata{
        x:number ,
        y:number,
        users:User[]
}

interface myloc{
    x:number ,
    y:number
}


const MetaCanvas: React.FC = () => {
        const {socket,isconnected} = useSocket()


        const [users,setusers]=useState<User[]>([])
        const [mylocation, setmylocation] = useState<myloc>({
            x:200,
            y:200
        })
        const {nickname}=useAuth()
        const handleonjoined=React.useCallback((data:joinedsata)=>{
            const {x,y,users} = data
            console.log(x,y);

            localStorage.setItem('users',JSON.stringify(users))
            setusers((prev) => [...prev, ...users]);
            setmylocation({x:x,y:y})
        },[])

        React.useEffect(()=>{
            if(!socket) return
            socket.on('spacejoined',handleonjoined)
        },[handleonjoined,socket])


        return (
          <Stage  width={TILE_SIZE * 35} height={TILE_SIZE * 18} options={{ backgroundColor: 0xe8f0f2 }}>
            <Container
                x={250}
                y={0}
            >
                  {classroomLayout.map((row, rowIndex) =>
                    row.map((tile, colIndex) => {
                      const tileTexture = tileMappings[tile];
                      return (
                        <Sprite
                          key={`${rowIndex}-${colIndex}`}
                          image={tileTexture}
                          x={colIndex * TILE_SIZE}
                          y={rowIndex * TILE_SIZE}
                          width={TILE_SIZE}
                          height={TILE_SIZE}
                        />
                      );
                    })
                  )}
                  {
                    users.map((e)=>(
                        <Charecter
                        key={e.id}
                        initialPosition={{x:e.x,y:e.y}}
                        name={nickname}
                        />

                    ))
                  }

            <Charecter initialPosition={{ x: mylocation.x, y: mylocation.y }} name={nickname} />
            </Container>
          </Stage>


        )
};

export default MetaCanvas;
