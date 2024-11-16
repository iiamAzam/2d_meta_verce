// import React,{ useEffect,useState} from 'react'

// import {Sprite,useTick} from '@pixi/react'
// import * as PIXI from 'pixi.js'
// interface CharecterPosition {
//     initialpostition :{x:number , y: number}
// }




// const Charecter :React.FC <CharecterPosition> = ({initialpostition})=>{
//     const [position, setposition]= useState(initialpostition)
//     const [direction , setdirection ]= useState<'up'|'down'|'left'|'right'>('down')
//     const [ismoving,setmoving]= useState<boolean>(false)
//     const [frame,setframe]= useState<number>(0)


//     const textures = {
//         down: [
//             PIXI.Texture.from('../assets/school/charecters/comming.png'),
//             PIXI.Texture.from('../assets/school/charecters/coming21.png'),
//             PIXI.Texture.from('../assets/school/charecters/coming2.png'),
//         ],
//         up:[
//             PIXI.Texture.from('../assets/school/charecters/up1.png'),
//             PIXI.Texture.from('../assets/school/charecters/up2.png'),
//             PIXI.Texture.from('../assets/school/charecters/up3.png')
//         ],
//         left :[
//             PIXI.Texture.from('../assets/school/charecters/left1.png'),
//             PIXI.Texture.from('../assets/school/charecters/left2.png'),
//             PIXI.Texture.from('../assets/school/charecters/left3.png')
//         ],
//         right:[
//             PIXI.Texture.from('../assets/school/charecters/right1.png'),
//             PIXI.Texture.from('../assets/school/charecters/right2.png'),
//             PIXI.Texture.from('../assets/school/charecters/right3.png')
//         ],  
//     }           
//         useEffect(()=>{
//             const handleKeyDown = (e:KeyboardEvent)=>{
//                 setmoving(true)
//                 setposition(prevpos=>{
//                     const speed=5
//                     switch(e.key){
//                         case 'ArrowUp':
//                         case 'w':
//                             setdirection('up')
//                             return {x:prevpos.x,y:prevpos.y-speed}
//                         case 'ArrowDown':
//                         case 's':
//                             setdirection('down')
//                             return {x:prevpos.x,y:prevpos.y+speed}
//                         case 'ArrowLeft':
//                         case 'a':
//                             setdirection('left')
//                             return {x:prevpos.x-speed,y:prevpos.y}
//                         case 'ArrowRight':
//                         case 'd':
//                             setdirection('right')
//                             return {x:prevpos.x+speed,y:prevpos.y}
//                         default:
//                             return prevpos

//                     }
//                 }
//                     )
            
//         }
//         const handleKeyup=()=>{
//             setmoving(false)
//             setframe(0)
//           }  

//         window.addEventListener('keydown',handleKeyDown)
//         window.addEventListener('keyup',handleKeyup)

//         return ()=>{
//             window.removeEventListener('keydown',handleKeyDown)
//             window.removeEventListener('keyup',handleKeyup)
//         }
//     },[])
    
//     useTick((delta)=>{
//         if (ismoving){
//             setframe((prevframe)=>(delta+prevframe*0.1)%2+1)
//         }
//     })
    
//     const currenttexture=textures[direction][ismoving ? Math.floor(frame):1]
//     const clampPosition = (pos: { x: number; y: number }) => ({
//         x: Math.max(0, Math.min(pos.x, 1120)), 
//         y: Math.max(0, Math.min(pos.y, 576)), 
//       });
//       const clampedPosition = clampPosition(position);


//     return (
//         <Sprite
//         texture={currenttexture}
//         x={clampedPosition.x}
//         y={clampedPosition.y}
//         anchor={0.5}
//         width={32}
//         height={32}
        
//       />
//             )
// }

// export default Charecter




import React, { useEffect, useState } from 'react';
import { Sprite, useTick } from '@pixi/react';
import image1 from '../assets/school/charecters/comming.png'
import image2 from '../assets/school/charecters/comming21.png'
import image3 from  '../assets/school/charecters/coming2.png'
import image4 from  '../assets/school/charecters/up1.png'
import image5 from '../assets/school/charecters/up2.png'
import image6 from '../assets/school/charecters/up3.png'
import image7 from '../assets/school/charecters/left1.png'
import image8 from  '../assets/school/charecters/left2.png'
import image9 from  '../assets/school/charecters/left3.png'
import image10 from  '../assets/school/charecters/right1.png'
import image11 from  '../assets/school/charecters/right2.png'
import image12 from '../assets/school/charecters/right3.png'
import { classroomLayout,TILE_SIZE } from '../pages/metaCanvas';



interface CharacterPosition {
  initialPosition: { x: number; y: number };
}

const Character: React.FC<CharacterPosition> = ({ initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isMoving, setMoving] = useState<boolean>(false);
  const [frame, setFrame] = useState<number>(0);

  // Load character textures
  const textures = {
            down: [
               image1,image2,image3
            ],
            up:[
                image4,image5,image6
            ],
            left :[
                image7,image8,image9
            ],
            right:[
                image10,image11,image12
            ],  
        } 

      const notsolid=(x:number , y:number)=>{
              const row = Math.floor(y/TILE_SIZE)
              const col= Math.floor(x/TILE_SIZE)
              if(row>=0&&row<classroomLayout.length && col>=0&&col<classroomLayout[0].length){
                const tile = classroomLayout[row][col]
                  return tile===1||tile===2||tile===7||tile===5
                }
             return false
      }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setMoving(true);
      const speed = 5 
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
    };

    const handleKeyUp = () => {
      setMoving(false);
      setFrame(0); // Reset to standing frame when stopping
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position]);

  // Animation loop using useTick (PixiJS equivalent of requestAnimationFrame)
  useTick((delta) => {
    if (isMoving) {
      // Cycle between frame 1 and 2 (since index 0 is standing)
      setFrame((prevFrame) => (prevFrame + 0.1 * delta) % 3);
    }
  });

  // Get the current texture based on direction and animation frame
  const currentTexture = textures[direction][isMoving ? Math.floor(frame) : 0];

  // Ensure character stays within boundaries
  const clampPosition = (pos: { x: number; y: number }) => ({
    x: Math.max(0, Math.min(pos.x, 1120)), // Width of the room
    y: Math.max(0, Math.min(pos.y, 576)), // Height of the room
  });

  const clampedPosition = clampPosition(position);

  return (
    <Sprite
      image={currentTexture}
      x={clampedPosition.x}
      y={clampedPosition.y}
      anchor={0.5}
     
    />
  );
};

export default Character;
