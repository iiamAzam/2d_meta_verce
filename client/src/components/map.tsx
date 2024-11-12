import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion } from 'framer-motion';

interface MapSectionProps {
  avatar: Array<{
    src: string;
    alt: string;
    position: { top: string,  left: string } | { bottom: string,  right: string }
    bgColor: string;
  }>;
}

const MapSection: React.FC<MapSectionProps> = ({ avatar }) => {
  const avatarStyle = "w-12 h-12 rounded-full border-4 border-gray-200";

  return (
    <motion.div
      className="h-screen flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: 'radial-gradient(circle, #c33764, #1d2671)',
      }}
    >
      <div className="relative h-[80%] w-[90%] mx-auto">
        <ComposableMap projection="geoEqualEarth">
          <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#2b2b2b" },
                    hover: { fill: "#3a3a3a" },
                    pressed: { fill: "#4a4a4a" },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

        {/* Render avatars on specified positions */}
        {avatar.map((avatar, index) => (
          <div
            key={index}
            className={`absolute ${avatar.position.top ? `top-${avatar.position.top}` : ''} ${avatar.position.left ? `left-${avatar.position.left}` : ''} ${avatar.position.bottom ? `bottom-${avatar.position.bottom}` : ''} ${avatar.position.right ? `right-${avatar.position.right}` : ''}`}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              className={`${avatarStyle} ${avatar.bgColor}`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MapSection;
