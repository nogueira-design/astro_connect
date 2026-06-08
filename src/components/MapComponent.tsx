import React, { useState, useEffect } from 'react';
import { Satellite } from '../types';

interface MapComponentProps {
  satellites: Satellite[];
  selectedSatellite: Satellite | null;
  onSelectSatellite: (satellite: Satellite) => void;
  onSyncData: () => void;
  language?: 'EN' | 'PT';
}

export const MapComponent: React.FC<MapComponentProps> = ({
  satellites,
  selectedSatellite,
  onSelectSatellite,
  onSyncData,
  language = 'EN'
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [syncGlowing, setSyncGlowing] = useState<boolean>(false);
  
  // Real-time coordinates emulator
  const [activeSatellites, setActiveSatellites] = useState<Satellite[]>(satellites);

  useEffect(() => {
    // Keep active satellites updated when the parent state updates
    setActiveSatellites(satellites);
  }, [satellites]);

  useEffect(() => {
    // Simulate slight orbital movement over time for all tracked units
    const interval = setInterval(() => {
      setActiveSatellites(prev => 
        prev.map(sat => {
          let newLat = sat.latitude + (Math.random() - 0.5) * 0.4;
          let newLng = sat.longitude + (Math.random() - 0.5) * 0.4;
          
          // Wrap latitude
          if (newLat > 90) newLat = -90;
          if (newLat < -90) newLat = 90;
          
          // Wrap longitude
          if (newLng > 180) newLng = -180;
          if (newLng < -180) newLng = 180;

          return {
            ...sat,
            latitude: parseFloat(newLat.toFixed(2)),
            longitude: parseFloat(newLng.toFixed(2))
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSyncClick = () => {
    setSyncGlowing(true);
    onSyncData();
    setTimeout(() => {
      setSyncGlowing(false);
    }, 1200);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
    }
  };

  // Currently viewed satellite
  const currentSat = activeSatellites.find(s => s.id === selectedSatellite?.id) || activeSatellites[0];

  return (
    <section 
      id="orbital-map-container"
      role="region" 
      aria-label="Interactive Orbital Map Tracker"
      className="relative w-full h-[320px] sm:h-[450px] bg-slate-950 overflow-hidden rounded-none border border-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
    >
      {/* Dynamic Simulated Background Earth with Zooming */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-screen transition-transform duration-500"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00F2FF15] via-transparent to-transparent"></div>
        <img 
          alt="Orbital view of Earth with geography layout overlay" 
          className="w-full h-full object-cover grayscale brightness-40 contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQM7lMcP8NS1fchTolfYReRvtOHFIBIjKknud2yzr8Ex-3OdoraEzhz4zqrNK8fyOGBa9UFLPtlSpA_qXR0X1-Sk1_2UTXYuusGhubvc0pOdBsGGd8PYjEkJD5RUDQpyIUk2GsaikdoJ0NEvFJzwG3ZYxoRyOnBJLjN4OjtQ2DZnojsqxzx8bIhyLVdVKe1jK2kOxLvjyE0hapEH6pfFBWUNKw2zxjZoW3P4JPMpLeYNj_XFOzGdpIIWxXMtxNAXc4RdOgdwZAuEYn"
        />
        
        {/* SVG Orbital Track Overlays */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Orbital path curve representation */}
          <path 
            d="M 50 150 Q 300 80 650 200 T 1200 150" 
            fill="none" 
            stroke="rgba(0, 242, 255, 0.15)" 
            strokeWidth="2" 
            strokeDasharray="6,6"
          />
          <path 
            d="M 100 350 Q 400 200 800 300 T 1300 220" 
            fill="none" 
            stroke="rgba(173, 198, 255, 0.15)" 
            strokeWidth="1.5" 
            strokeDasharray="4,4"
          />
        </svg>
      </div>

      {/* Map Control Markers */}
      {/* Map Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 pointer-events-none">
        
        {/* Top bar controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
          <div className="glass-card px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg border-primary/30 flex items-center gap-2 sm:gap-3">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-primary"></span>
            </span>
            <span className="font-label-caps text-[10px] sm:text-[11px] text-primary">
              {language === 'EN' ? 'orbital tracker active' : 'rastreador orbital ativo'}
            </span>
          </div>

          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={handleSyncClick}
              className={`glass-card px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg border-primary/30 flex items-center gap-1.5 sm:gap-2 text-primary font-label-caps text-[9px] sm:text-[10px] hover:bg-primary/15 transition-all active:scale-95 ${syncGlowing ? 'active-glow bg-primary/20' : ''}`}
              title={language === 'EN' ? "Request simulated geospatial synchronization" : "Solicitar sincronização geoespacial"}
            >
              <span className={`material-symbols-outlined text-xs sm:text-sm ${syncGlowing ? 'animate-spin' : ''}`}>sync</span>
              {syncGlowing 
                ? (language === 'EN' ? 'SYNCING...' : 'SINCRONIZANDO...') 
                : (language === 'EN' ? 'SYNC SENSOR DATA' : 'SINCRONIZAR SINAL')}
            </button>
            
            <button 
              onClick={() => handleZoom('in')}
              className="bg-surface/80 p-1.5 sm:p-2 border border-white/10 rounded-lg text-on-surface hover:text-primary active:scale-95 hover:bg-surface/90 transition-colors"
              title="Camera zoom in"
            >
              <span className="material-symbols-outlined text-sm sm:text-base">add</span>
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="bg-surface/80 p-1.5 sm:p-2 border border-white/10 rounded-lg text-on-surface hover:text-primary active:scale-95 hover:bg-surface/90 transition-colors"
              title="Camera zoom out"
            >
              <span className="material-symbols-outlined text-sm sm:text-base">remove</span>
            </button>
          </div>
        </div>

        {/* Live coordinate point markers */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Map live satellites as real coordinates */}
          {activeSatellites.map((sat, index) => {
            // Project simple responsive grid coordinates based on latitude/longitude
            // Latitude maps vertical (-90 to 90), Longitude maps horizontal (-180 to 180)
            const mapX = `${((sat.longitude + 180) / 360) * 80 + 10}%`;
            const mapY = `${(1 - (sat.latitude + 90) / 180) * 60 + 20}%`;
            const isSelected = currentSat.id === sat.id;

            return (
              <button
                key={sat.id}
                onClick={() => onSelectSatellite(sat)}
                style={{ left: mapX, top: mapY }}
                className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group z-10"
              >
                {/* Tooltip */}
                <div className={`glass-card px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono text-primary group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isSelected ? 'opacity-100 border-primary' : 'opacity-0'}`}>
                  {sat.name}
                </div>
                
                {/* Visual Radar Pulse */}
                <div className="relative flex items-center justify-center">
                  {isSelected && (
                    <span className="absolute flex h-5 w-5 sm:h-6 sm:w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                    </span>
                  )}
                  <div 
                    className={`h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 rounded-full border-2 border-white/60 transition-all duration-300 ${isSelected ? 'active-glow scale-120' : 'opacity-80 group-hover:opacity-100 group-hover:scale-110'}`}
                    style={{ backgroundColor: sat.pathColor }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Panel with real-time stats readout */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-2 sm:gap-4">
          <div className="hidden sm:block max-w-sm bg-slate-900/85 p-2.5 rounded-lg backdrop-blur-sm border border-slate-800 pointer-events-auto">
            <div className="text-[9px] font-label-caps text-cyan-400 uppercase tracking-wider mb-0.5">
              {language === 'EN' ? 'Focus Telemetry target' : 'Alvo de telemetria em foco'}
            </div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentSat.pathColor }}></span>
              {currentSat.name}
            </h3>
            <p className="text-slate-400 text-[10px] mt-0.5 font-mono">
              {language === 'EN' ? 'Lock-on:' : 'Foco:'}{' '}
              <span className="text-cyan-400 font-bold">
                {language === 'EN' ? (currentSat.sensorTarget || 'Planetary Crust Imaging') : (
                  currentSat.sensorTarget?.includes('Andes') ? 'Vazão Glacial dos Andes' :
                  currentSat.sensorTarget?.includes('Tokyo') ? 'Mapeamento de CO₂ Urbano de Tóquio' :
                  currentSat.sensorTarget?.includes('Amazon') ? 'Detecção de Desmatamento na Amazônia' :
                  'Espectrografia de Recursos Terrestres'
                )}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-3 bg-slate-900/90 p-2 sm:p-3 rounded-lg border border-slate-800 backdrop-blur-md text-right pointer-events-auto w-full md:w-auto">
            <div className="px-1.5 sm:px-3 border-r border-slate-800/60 text-left sm:text-right">
              <div className="text-[8px] sm:text-[9px] font-label-caps text-slate-400">ALTITUDE</div>
              <div className="text-[11px] sm:text-sm font-data-point text-cyan-400 font-bold">{currentSat.altitude} <span className="text-[8px] text-slate-500">KM</span></div>
            </div>
            <div className="px-1.5 sm:px-3 border-none lg:border-r border-slate-800/60 text-right">
              <div className="text-[8px] sm:text-[9px] font-label-caps text-slate-400">{language === 'EN' ? 'VELOCITY' : 'VELOCIDADE'}</div>
              <div className="text-[11px] sm:text-sm font-data-point text-cyan-400 font-bold">{(currentSat.velocity / 3.6).toFixed(0)} <span className="text-[8px] text-slate-500">KM/H</span></div>
            </div>
            <div className="px-1.5 sm:px-3 border-r border-slate-800/60 text-left sm:text-right">
              <div className="text-[8px] sm:text-[9px] font-label-caps text-slate-400">LATITUDE</div>
              <div className="text-[11px] sm:text-sm font-data-point text-cyan-400 font-bold">{currentSat.latitude}°N</div>
            </div>
            <div className="px-1.5 sm:px-3 text-right">
              <div className="text-[8px] sm:text-[9px] font-label-caps text-slate-400">LONGITUDE</div>
              <div className="text-[11px] sm:text-sm font-data-point text-cyan-400 font-bold">{currentSat.longitude}°E</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
