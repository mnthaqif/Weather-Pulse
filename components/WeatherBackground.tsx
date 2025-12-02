import React, { useMemo } from 'react';
import { WeatherType, TimeOfDay } from '../types';

interface WeatherBackgroundProps {
  condition: WeatherType;
  timeOfDay: TimeOfDay;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, timeOfDay }) => {

  const getGradient = () => {
    // Smoother, cleaner pastel-inspired gradients
    switch (condition) {
      case WeatherType.Sunny:
        return timeOfDay === TimeOfDay.Night 
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-[#020617]' // Deep clean night
          : 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-300 via-blue-200 to-blue-50'; // Soft sunny day
      
      case WeatherType.Cloudy:
        return timeOfDay === TimeOfDay.Night
          ? 'bg-gradient-to-b from-slate-800 via-slate-900 to-[#020617]'
          : 'bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100'; // Clean grey/white
      
      case WeatherType.Rainy:
        return timeOfDay === TimeOfDay.Night
           ? 'bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617]'
           : 'bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600';
      
      case WeatherType.Stormy:
        return 'bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#020617]'; // Deepest purple/blue
      
      case WeatherType.Snowy:
        return timeOfDay === TimeOfDay.Night
          ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-black'
          : 'bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-white'; // Ice blue to white
      
      default:
        return 'bg-blue-500';
    }
  };

  // -------------------------
  // RAIN
  // -------------------------
  const RainDrops = useMemo(() => {
    // 3 Layers for depth: Back (slow, small), Mid, Front (fast, large)
    const layers = [
      { count: 40, duration: '1.5s', opacity: 0.4, width: '1px', height: '10vh' },
      { count: 30, duration: '1.2s', opacity: 0.6, width: '1px', height: '15vh' },
      { count: 20, duration: '0.8s', opacity: 0.8, width: '2px', height: '20vh' }
    ];

    return layers.map((layer, layerIdx) => (
      <div key={`rain-layer-${layerIdx}`} className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: layer.count }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-200/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20 + 20}vh`,
              width: layer.width,
              height: layer.height,
              opacity: layer.opacity,
              // Slant rain slightly for realism
              transform: 'rotate(15deg)',
              animation: `fall ${parseFloat(layer.duration) + Math.random() * 0.5}s linear infinite`,
              animationDelay: `-${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    ));
  }, []);

  // -------------------------
  // SNOW
  // -------------------------
  const SnowFlakes = useMemo(() => {
    // Layers: Back (small, slow), Front (large, faster)
    // Combined with a sway animation container
    const layers = [
      { count: 30, duration: '10s', size: 3, opacity: 0.5 },
      { count: 20, duration: '7s', size: 5, opacity: 0.8 },
      { count: 10, duration: '5s', size: 7, opacity: 0.95 } 
    ];

    return layers.map((layer, layerIdx) => (
      <div key={`snow-layer-${layerIdx}`} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: layer.count }).map((_, i) => (
           // Container for vertical fall
           <div
             key={i}
             className="absolute"
             style={{
               left: `${Math.random() * 100}%`,
               top: `-20px`,
               animation: `fall ${parseFloat(layer.duration) + Math.random() * 5}s linear infinite`,
               animationDelay: `-${Math.random() * 5}s`,
             }}
           >
             {/* Inner element for horizontal sway */}
             <div 
                className="bg-white rounded-full blur-[1px]"
                style={{
                  width: `${layer.size}px`,
                  height: `${layer.size}px`,
                  opacity: layer.opacity,
                  animation: `sway ${3 + Math.random() * 2}s ease-in-out infinite alternate`
                }}
             />
           </div>
        ))}
      </div>
    ));
  }, []);

  // -------------------------
  // CLOUDS
  // -------------------------
  const Clouds = useMemo(() => {
    // Large, soft, abstract shapes instead of distinct circles
    // Using simple divs with heavy blur to create "atmosphere"
    const cloudShapes = [
       { width: '60vw', height: '60vw', top: '-10%', left: '-10%', duration: '60s', opacity: 0.3, blur: 'blur-3xl' },
       { width: '70vw', height: '50vw', top: '20%', left: '40%', duration: '80s', opacity: 0.2, blur: 'blur-3xl' },
       { width: '50vw', height: '50vw', top: '50%', left: '-20%', duration: '70s', opacity: 0.25, blur: 'blur-2xl' },
    ];

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {cloudShapes.map((cloud, i) => (
           <div
             key={i}
             className={`absolute rounded-full bg-white ${cloud.blur}`}
             style={{
               width: cloud.width,
               height: cloud.height,
               top: cloud.top,
               left: cloud.left,
               opacity: cloud.opacity,
               // Gentle drift back and forth
               animation: `drift ${cloud.duration} linear infinite alternate`,
             }}
           />
        ))}
      </div>
    );
  }, []);

  // -------------------------
  // STARS
  // -------------------------
  const Stars = useMemo(() => {
     return Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
             width: Math.random() > 0.8 ? '2px' : '1px',
             height: Math.random() > 0.8 ? '2px' : '1px',
             top: `${Math.random() * 70}%`,
             left: `${Math.random() * 100}%`,
             opacity: Math.random() * 0.7 + 0.3,
             // Slower, calmer twinkle
             animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite alternate`
          }}
        />
     ));
  }, []);

  return (
    <div className={`fixed inset-0 z-0 transition-all duration-1000 ${getGradient()}`}>
      
      {/* Sun / Moon Orb with subtle float */}
      {(condition === WeatherType.Sunny || condition === WeatherType.Cloudy) && (
         <div 
           className={`absolute rounded-full blur-2xl transition-all duration-1000 animate-[float_8s_ease-in-out_infinite]
             ${timeOfDay === TimeOfDay.Night 
               ? 'w-28 h-28 bg-indigo-100/20 top-20 right-12 shadow-[0_0_60px_rgba(255,255,255,0.2)]' 
               : 'w-64 h-64 bg-yellow-300/40 top-[-50px] right-[-50px] shadow-[0_0_100px_rgba(253,224,71,0.4)]'}`}
         ></div>
      )}
      
      {/* Stars if Night */}
      {timeOfDay === TimeOfDay.Night && (condition === WeatherType.Sunny || condition === WeatherType.Cloudy) && Stars}

      {/* Atmospheric Clouds (Visible in most conditions except very clear nights) */}
      {(condition === WeatherType.Cloudy || condition === WeatherType.Rainy || condition === WeatherType.Stormy || (condition === WeatherType.Sunny && timeOfDay !== TimeOfDay.Night)) && Clouds}
      
      {/* Precipitation */}
      {(condition === WeatherType.Rainy || condition === WeatherType.Stormy) && RainDrops}
      {condition === WeatherType.Snowy && SnowFlakes}
      
      {/* Sun Rays Effect (Daytime Sunny) */}
      {condition === WeatherType.Sunny && timeOfDay !== TimeOfDay.Night && (
         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-yellow-100/10 via-transparent to-transparent pointer-events-none"></div>
      )}

      {/* Lightning Flash (Stormy) */}
      {condition === WeatherType.Stormy && (
        <div className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay animate-[flash_7s_infinite] z-20"></div>
      )}
    </div>
  );
};

export default WeatherBackground;