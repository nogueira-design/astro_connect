import React, { useState } from 'react';
import { EARTH_GALLERY } from '../mockData';
import { GalleryItem } from '../types';

interface AstronautProfileGalleryProps {
  language?: 'EN' | 'PT';
}

export const AstronautProfileGallery: React.FC<AstronautProfileGalleryProps> = ({ language = 'EN' }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const keyCrew = [
    {
      name: 'Commander Shepard',
      role: language === 'EN' ? 'Expedition 71 Lead' : 'Líder da Expedição 71',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9udi7tN7IhW7GISU-MDodUI2zbxDRTRJkrZNJjW-f0YOtKR8jz1rgurEMbE6CY0L-mMcsBvXoGKJUBBuAwqo646rrAyY6bLgG20xgzlag5LcmczxMpzJcWjHy9wnVQ5mlG_M0vlJ19KPXw2JcCZFGK4ptakm4mcvP60OwfRI0vQ4SKr9uHYSg1pyvLFJpUZpH7Vlmk3-nOG755XVwVhUs3iJuilsxouY4QS9CucnMNUpH-WFvXbZokGHwZYVt-cAhgz28KIfEee',
      achievements: language === 'EN' 
        ? ['Core Sector 7G Founder', 'Artemis VII Deployment Lead', '4,280 Cumulative Orbit Hours']
        : ['Fundador do Setor Principal 7G', 'Líder de Implantação Artemis VII', '4.280 Horas de Órbita Acumuladas'],
      specialty: language === 'EN' ? 'Orbital Logistics & Geophysics Mapping' : 'Logística Orbital e Mapeamento Geofísico'
    },
    {
      name: 'Commander Miller',
      role: language === 'EN' ? 'Station Alpha Astrogator' : 'Navegador da Estação Alpha',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqY-1dxGeSd3_4dP6rVjb69QTDDG6G-kRpOMlLpyUAHe13eOsY32EZqCXzfN3T8UXgPskcbRSll475YtcsoCwW95rzId3xVEpPWx6lpEotJvMaNRxUOCfYwBjixQk-GK06OSZX5N8-MZ05EMz8FALdu66qS6dFsF7SQxPoTvquA6TBSkPVsg8suT2YSIAC5YdTrpz7rVc9t9fvpdLUCgZxm5KprIQeLLgFoVL1o7lVrRKf6XumpJqExa0jrM7Z6Em7ULTn5UQHAQ14',
      achievements: language === 'EN'
        ? ['Hydrological Spectrometry Pioneer', '2,400 Orbit Hours', 'NASA Spaceflight Medal recipient']
        : ['Pioneiro em Espectrometria Hidrológica', '2.400 Horas de Órbita', 'Ganhador da Medalha de Vôo Espacial da NASA'],
      specialty: language === 'EN' ? 'Hydrological Flow Analytics • Earth Monitoring' : 'Análise de Fluxo Hidrológico • Monitoramento Terrestre'
    }
  ];

  return (
    <section 
      role="region" 
      aria-label="Astronaut Crew Profiles and Planet Gallery"
      className="space-y-gutter"
    >
      {/* Profiles Sub-Section */}
      <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-800 space-y-6">
        <header className="flex justify-between items-center border-b border-slate-850 pb-3">
          <h2 className="font-label-caps text-label-caps text-primary flex items-center gap-2 uppercase tracking-wide">
            <span className="material-symbols-outlined text-sm">groups</span> 
            {language === 'EN' ? 'Active Crew List & Achievements' : 'Membros da Tripulação Ativos e Conquistas'}
          </h2>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
            {language === 'EN' ? 'Expedition 71 Mission' : 'Missão Expedição 71'}
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {keyCrew.map((crew, idx) => (
            <div key={idx} className="bg-slate-950/70 rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row gap-4 hover:border-cyan-500/30 transition-all duration-300">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyan-400/30 flex-shrink-0 mx-auto sm:mx-0">
                <img src={crew.avatar} alt={`${crew.name} Portrait`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div>
                  <h3 className="font-bold text-on-surface text-base">{crew.name}</h3>
                  <span className="text-secondary font-mono text-[10px] uppercase tracking-wide">{crew.role}</span>
                </div>
                <div>
                  <div className="text-[9px] font-label-caps text-on-surface-variant uppercase">
                    {language === 'EN' ? 'Specialty' : 'Especialidade'}
                  </div>
                  <p className="text-xs text-on-surface/90 font-mono mt-0.5">{crew.specialty}</p>
                </div>
                <div className="pt-1">
                  <div className="text-[9px] font-label-caps text-on-surface-variant uppercase mb-1">
                    {language === 'EN' ? 'Key Accolades' : 'Principais Conquistas'}
                  </div>
                  <ul className="text-xs text-on-surface-variant space-y-1 pl-4 list-disc text-left">
                    {crew.achievements.map((acc, aIdx) => (
                      <li key={aIdx}>{acc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earth captured gallery */}
      <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-800 space-y-6">
        <header className="flex items-center justify-between border-b border-slate-850 pb-3">
          <h2 className="font-label-caps text-label-caps text-primary flex items-center gap-2 uppercase tracking-wide">
            <span className="material-symbols-outlined text-sm">image</span> 
            {language === 'EN' ? 'Earth Captured Gallery' : 'Galeria de Capturas Terrestres'}
          </h2>
          <p className="hidden sm:block text-[10px] font-mono text-slate-450 opacity-75">
            {language === 'EN' ? 'Click snapshots to fetch spectral calibration data' : 'Clique nas fotos para obter dados de calibração espectral'}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
          {EARTH_GALLERY.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItem(item); }}
              className="group cursor-pointer bg-slate-950/70 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
              aria-label={`View detailed space image: ${item.title}`}
            >
              <div className="aspect-video relative overflow-hidden bg-black/40">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <span className="absolute bottom-3 right-3 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-primary border border-primary/20">
                  {language === 'EN' ? item.sdgGoal.split(':')[0] : (
                    item.sdgGoal.includes('Climate') ? 'ODS 13' : 'ODS 15'
                  )}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors text-sm">
                    {language === 'EN' ? item.title : (
                      item.title.includes('Glacial Melt') ? 'Derretimento Glacial nos Andes' :
                      item.title.includes('Canopy Loss') ? 'Perda de Copa na Amazônia' :
                      'Transporte de Poeira do Saara'
                    )}
                  </h3>
                  <span className="text-[10px] font-mono text-on-surface-variant">{item.date}</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {language === 'EN' ? item.description : (
                    item.description.includes('Retreating glaciers') ? 'Geleiras recuando na Patagônia capturadas via radar infravermelho de alta órbita para análise climática.' :
                    item.description.includes('imaging of forest') ? 'Imagens de alta resolução de copas de árvores confirmando aumento drástico de degradação.' :
                    'Pluma massiva de poeira cruzando o Oceano Atlântico para fertilizar solos da Floresta Amazônica.'
                  )}
                </p>
                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-on-surface-variant opacity-75">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">shield_person</span>
                    {language === 'EN' ? `By ${item.astronaut}` : `Por ${item.astronaut}`}
                  </span>
                  <span>{item.cameraInfo.split('•')[1] || item.cameraInfo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal detailed camera view */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-image-title"
        >
          <div className="bg-slate-900 w-full max-w-2xl rounded-xl overflow-hidden border border-slate-800 shadow-2xl my-4 sm:my-8">
            <header className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/55">
              <h3 id="modal-image-title" className="font-bold text-primary text-base flex items-center gap-2">
                <span className="material-symbols-outlined">satellite_alt</span>
                {language === 'EN' ? 'Astronaut Observation Detail' : 'Detalhes da Observação do Astronauta'}
              </h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary hover:scale-110 active:scale-90 transition-colors"
                title={language === 'EN' ? "Exit zoom view" : "Fechar"}
              >
                close
              </button>
            </header>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="aspect-[16/10] w-full rounded-lg overflow-hidden border border-slate-800 bg-black/60 relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-xl font-bold text-on-surface">
                      {language === 'EN' ? selectedItem.title : (
                        selectedItem.title.includes('Glacial Melt') ? 'Derretimento Glacial nos Andes' :
                        selectedItem.title.includes('Canopy Loss') ? 'Perda de Copa na Amazônia' :
                        'Transporte de Poeira do Saara'
                      )}
                    </h4>
                    <p className="text-xs font-mono text-secondary mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">calendar_today</span>
                      {language === 'EN' 
                        ? `Exposed on ${selectedItem.date} by ${selectedItem.astronaut}`
                        : `Capturada em ${selectedItem.date} por ${selectedItem.astronaut}`}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-mono rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/20">
                    {language === 'EN' ? selectedItem.sdgGoal : (
                      selectedItem.sdgGoal.includes('Climate Action') ? 'ODS 13: Ação Contra a Mudança Climática' : 'ODS 15: Vida Terrestre'
                    )}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-label-caps text-primary uppercase tracking-wider">
                    {language === 'EN' ? 'Planetary Impact Narrative' : 'Narrativa do Impacto Planetário'}
                  </span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {language === 'EN' ? selectedItem.description : (
                      selectedItem.description.includes('Retreating glaciers') ? 'Geleiras recuando na Patagônia capturadas via radar infravermelho de alta órbita para análise climática.' :
                      selectedItem.description.includes('imaging of forest') ? 'Imagens de alta resolução de copas de árvores confirmando aumento drástico de degradação.' :
                      'Pluma massiva de poeira cruzando o Oceano Atlântico para fertilizar solos da Floresta Amazônica.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg border border-white/5 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-on-surface-variant font-label-caps uppercase block mb-1">
                      {language === 'EN' ? 'Optical Payload Model' : 'Modelo do Sensor Óptico'}
                    </span>
                    <span className="text-primary font-bold">{selectedItem.cameraInfo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant font-label-caps uppercase block mb-1">
                      {language === 'EN' ? 'Calibration Target Resolution' : 'Resolução do Alvo de Calibração'}
                    </span>
                    <span className="text-primary font-bold">
                      {language === 'EN' ? 'Raw Sub-Meter Hyperspectral Scan' : 'Escaneamento Hiperespectral Raw Subgrupado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <footer className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-surface-container/20 flex justify-end">
              <button 
                onClick={() => setSelectedItem(null)}
                className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-6 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                {language === 'EN' ? 'De-authorize viewport' : 'Fechar Janela de Observação'}
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};
