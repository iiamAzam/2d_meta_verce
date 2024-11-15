
import { useMemo } from 'react';

import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container,  Text ,TilingSprite, Sprite } from '@pixi/react';
import  image  from '../assets/school/grass.jpg';
import image1 from '../assets/school/PineTools.com_files/almira.png'
import image3 from '../assets/school/PineTools.com_files/border.png'
import image4 from '../assets/school/PineTools.com_files/board.png'

const MetaCanvas: React.FC = () => {
  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  return (
    <div className='flex justify-center mt-5 items-center'>
    <Stage width={1000} height={500} options={{ background: 0x1099bb }}>
      {/* <Sprite image={bunnyUrl} x={300} y={150} />
      <Sprite image={bunnyUrl} x={500} y={150} />
      <Sprite image={bunnyUrl} x={400} y={200} /> */}
      <TilingSprite
        image={image}
        width={1000}
        height={600}
        tilePosition={{ x: 250, y: 300 }}
        tileScale={{ x: 1, y: 1 }}
        />
        <TilingSprite
        image={image3}
        width={1000}
        height={20}
        tilePosition={{ x: 0, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
        />
        <TilingSprite
        image={image3}
        width={1000}
        height={20}
        tilePosition={{ x: 0, y: 1000 }}
        tileScale={{ x: 1, y: 2 }}
        x={920}
        y={500}
        />
        <Sprite
            image={image1}
            width={50}
            height={50}
            x={200}
            y={200}
        />
        <Sprite
            image={image4}
            width={100}
            height={50}
            x={450}
            y={50}
        />

       
      <Container x={200} y={200}>
      


        {/* <Text
          text="Hello World"
          anchor={0.5}
          x={220}
          y={150}
          filters={[blurFilter]}
          style={
            new TextStyle({
              align: 'center',
              fill: '0xffffff',
              fontSize: 50,
              letterSpacing: 20,
              dropShadow: true,
              dropShadowColor: '#E72264',
              dropShadowDistance: 6,
            })
          }
        /> */}


      </Container>
    </Stage>
    </div>
  );
};

export default MetaCanvas;