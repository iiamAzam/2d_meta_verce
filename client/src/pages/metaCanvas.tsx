
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
        const {socket,data1} = useSocket()
        const [users,setusers]=useState<User[]>([])
        const {nickname}=useAuth()
        const handleonjoined=React.useCallback((data:joinedsata)=>{
            const {x,y,users} = data
            console.log(x,y);

            localStorage.setItem('users',JSON.stringify(users))
            setusers((prev) => [...prev, ...users]);

        },[])

        React.useEffect(()=>{
            if(!socket) return

            socket.on('spacejoined',handleonjoined)
            if(data1){
                const {x,y,users}= data1
                  console.log(x,y,users)
                // console.log(users,x,y)
                localStorage.setItem('users',JSON.stringify(users))
                setusers((prev) => [...prev, ...users]);

            }
        },[handleonjoined,socket,data1])



        ///// charecter movements and logic
        const [position, setPosition] = useState<myloc>({x:100,y:100});
        const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
        const [isMoving, setMoving] = useState<boolean>(false);
        const notsolid=(x:number , y:number)=>{
            const row = Math.floor(y/TILE_SIZE)
            const col= Math.floor(x/TILE_SIZE)
            if(row>=0&&row<classroomLayout.length && col>=0&&col<classroomLayout[0].length){
              const tile = classroomLayout[row][col]
                return tile===1||tile===2||tile===7||tile===5
              }
           return false
    }
        React.useEffect(()=>{
            const handleKeyDown=(e:KeyboardEvent)=>{
                e.preventDefault()
                setMoving(true)
                const speed=5
                let newpositon = {...position}
                switch (e.key){
                    case 'ArrowUp':
                    case 'w':
                    setDirection('up');
                    newpositon={x:position.x, y: position.y - speed}

                    break;
                    case 'ArrowDown':
                    case 's':
                    setDirection('down');
                    newpositon={x:position.x,y:position.y+speed}
                    break;
                    case 'ArrowLeft':
                    case 'a':
                    setDirection('left');
                    newpositon = { x: position.x - speed, y: position.y };
                    break;
                    case 'ArrowRight':
                    case 'd':
                    setDirection('right');
                    newpositon = { x: position.x + speed, y: position.y };
                    break;
                  default:
                    break
                  }
                  if(!notsolid(newpositon.x,newpositon.y)){
                    setPosition(newpositon)
              }
                }
                const handleKeyUp = () => {
                    setMoving(false);
                  };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
        };

        })


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
                        key={e.id+Math.random()}
                        position={{ x: e.x, y: e.y }} name={nickname} direction={direction} isMoving={isMoving}
                        />

                    ))
                  }

            <Charecter position={{ x: position.x, y: position.y }} name={nickname} direction={direction} isMoving={isMoving} />
            </Container>
          </Stage>


        )
};

export default MetaCanvas;
