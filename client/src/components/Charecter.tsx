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
import * as PIXI from 'pixi.js';

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
                PIXI.Texture.from('../assets/school/charecters/comming.png'),
                PIXI.Texture.from('../assets/school/charecters/coming21.png'),
                PIXI.Texture.from('../assets/school/charecters/coming2.png'),
            ],
            up:[
                PIXI.Texture.from('../assets/school/charecters/up1.png'),
                PIXI.Texture.from('../assets/school/charecters/up2.png'),
                PIXI.Texture.from('../assets/school/charecters/up3.png')
            ],
            left :[
                PIXI.Texture.from('../assets/school/charecters/left1.png'),
                PIXI.Texture.from('../assets/school/charecters/left2.png'),
                PIXI.Texture.from('../assets/school/charecters/left3.png')
            ],
            right:[
                PIXI.Texture.from('../assets/school/charecters/right1.png'),
                PIXI.Texture.from('../assets/school/charecters/right2.png'),
                PIXI.Texture.from('../assets/school/charecters/right3.png')
            ],  
        } 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setMoving(true);
      setPosition((prevPos) => {
        const speed = 5;
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
            setDirection('up');
            return { ...prevPos, y: prevPos.y - speed };
          case 'ArrowDown':
          case 's':
            setDirection('down');
            return { ...prevPos, y: prevPos.y + speed };
          case 'ArrowLeft':
          case 'a':
            setDirection('left');
            return { ...prevPos, x: prevPos.x - speed };
          case 'ArrowRight':
          case 'd':
            setDirection('right');
            return { ...prevPos, x: prevPos.x + speed };
          default:
            return prevPos;
        }
      });
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
  }, []);

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
      texture={currentTexture}
      x={clampedPosition.x}
      y={clampedPosition.y}
      anchor={0.5}
      width={32}
      height={32}
    />
  );
};

export default Character;
