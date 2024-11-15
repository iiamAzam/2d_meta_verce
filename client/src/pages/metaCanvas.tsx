
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
type tileType=0|1|2|3|4|5|6|7|8|9
type ClassroomLayout=tileType[][]
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
const TILE_SIZE : number = 32
const classroomLayout: ClassroomLayout = [
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




const MetaCanvas: React.FC = () => {
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

            <Charecter initialPosition={{ x: 300, y: 200 }} />
            </Container>
          </Stage>


        )
};

export default MetaCanvas;