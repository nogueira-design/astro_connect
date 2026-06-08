import React, { useState } from 'react';
import { Post } from '../types';

interface NewPostFormProps {
  onAddPost: (post: Omit<Post, 'id' | 'likes' | 'likedByMe' | 'comments' | 'date'>) => void;
  onClose: () => void;
  language?: 'EN' | 'PT';
}

const PREMADE_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQM7lMcP8NS1fchTolfYReRvtOHFIBIjKknud2yzr8Ex-3OdoraEzhz4zqrNK8fyOGBa9UFLPtlSpA_qXR0X1-Sk1_2UTXYuusGhubvc0pOdBsGGd8PYjEkJD5RUDQpyIUk2GsaikdoJ0NEvFJzwG3ZYxoRyOnBJLjN4OjtQ2DZnojsqxzx8bIhyLVdVKe1jK2kOxLvjyE0hapEH6pfFBWUNKw2zxjZoW3P4JPMpLeYNj_XFOzGdpIIWxXMtxNAXc4RdOgdwZAuEYn',
    title: 'Earth at Night',
    label: '4K Multi-spectral • NOAA-20'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3YnKC7D4GN4NNAvHcviMtzrqy9ZH88MLsexJsWhKu_MEmbID8cvhCnGycrLgsXAsiM4Veev5M_rzlqzim7OsA9BJE5MNr-pEvAm2hnxr0Icg8EqApaI3Bf7e3H9lPxhN9lu6wcoNmh7njME_Hz9FOnCHMMjUdz4Qol_JjM8kkkRxi52Hsa5kK0wxQk1ElLLvu02bfFpPnEdmfBkaEys0opKm1060GNkwNaBx3sV-SfGM9jxjx2Zb0Fr-aKk0YdCMjEWjccoDD3Sni',
    title: 'Planetary Sunrise',
    label: '4K HDR • Expedition 71'
  }
];

export const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost, onClose, language = 'EN' }) => {
  const [author, setAuthor] = useState<string>('');
  const [role, setRole] = useState<'Commander' | 'Citizen Scientist' | 'Mission Control' | 'Chief Engineer' | 'Climate Analyst'>('Citizen Scientist');
  const [content, setContent] = useState<string>('');
  const [location, setLocation] = useState<string>('Terran Ground Station Alpha');
  const [altitude, setAltitude] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageLabel, setImageLabel] = useState<string>('');
  const [sdg13Selected, setSdg13Selected] = useState<boolean>(true);
  const [sdg9Selected, setSdg9Selected] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    // Collect mock tags
    const sdgTags: string[] = [];
    if (sdg13Selected) sdgTags.push(language === 'EN' ? 'SDG 13: Climate Action' : 'ODS 13: Ação Climática');
    if (sdg9Selected) sdgTags.push(language === 'EN' ? 'SDG 9: Industry & Innovation' : 'ODS 9: Indústria e Inovação');
    if (sdgTags.length === 0) sdgTags.push(language === 'EN' ? 'SDG 9: Space Infrastructure' : 'ODS 9: Infraestrutura Espacial');

    // Default astronaut avatars or random
    const avatarUrl = role === 'Commander'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9udi7tN7IhW7GISU-MDodUI2zbxDRTRJkrZNJjW-f0YOtKR8jz1rgurEMbE6CY0L-mMcsBvXoGKJUBBuAwqo646rrAyY6bLgG20xgzlag5LcmczxMpzJcWjHy9wnVQ5mlG_M0vlJ19KPXw2JcCZFGK4ptakm4mcvP60OwfRI0vQ4SKr9uHYSg1pyvLFJpUZpH7Vlmk3-nOG755XVwVhUs3iJuilsxouY4QS9CucnMNUpH-WFvXbZokGHwZYVt-cAhgz28KIfEee'
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE9vyQJz38eIeQAaYdLkK24uyK6-X9IM5Nip0JqVIzYMwV6zVxdicMOBq4PNbnlLyhkPzG4muA1juLhkmAcw9wP9vCRmVXqNaiA_tg_Y9pb2ghdBM_FX21fZ6muxjIcC0g7nULxZ7KlxSAm-Ym-Wty1iPAAQAzKcrEwKP_oem0w-C_jIhvPhpBC6EuIJS383xPvuLlrT2XHHOqICyymFedCuUSr8QSOBkHV-cWmpFo5i_tGsIkmTlbyfY1EnhFfGzcslZdv4qZyHRk';

    onAddPost({
      author: author.trim(),
      role,
      avatar: avatarUrl,
      location: location.trim(),
      content: content.trim(),
      image: selectedImage || undefined,
      imageLabel: selectedImage ? imageLabel : undefined,
      altitude: altitude > 0 ? altitude : undefined,
      sdgTags
    });

    onClose();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Mock upload selection with premade item
      const randomPremade = PREMADE_IMAGES[Math.floor(Math.random() * PREMADE_IMAGES.length)];
      setSelectedImage(randomPremade.url);
      setImageLabel(language === 'EN' ? 'Uploaded via Sat-Telemetry File Transfer' : 'Anexado via Transmissão de Satélite');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      onDragEnter={handleDrag}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div className="glass-card w-full max-w-lg rounded-xl overflow-hidden shadow-2xl bg-surface border border-white/15 my-8">
        <header className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-surface-container-high">
          <h2 id="form-title" className="font-bold text-primary text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
            {language === 'EN' ? 'Broadcast New Orbital Log' : 'Emitir Novo Log Orbital'}
          </h2>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors hover:scale-110 active:scale-90"
            title={language === 'EN' ? "Close edit" : "Fechar"}
          >
            close
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Author and Role Input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
                {language === 'EN' ? 'Observer Call Sign' : 'Indicativo do Observador'}
              </label>
              <input 
                type="text" 
                required
                placeholder={language === 'EN' ? "e.g. Commander Sarah" : "ex: Comandante Sarah"}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-white/5 border border-white/10 focus:border-primary/50 text-sm text-on-surface rounded-lg p-2.5 focus:outline-none transition-colors font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
                {language === 'EN' ? 'Astronaut / Terrestrial Role' : 'Função Espacial / Terrestre'}
              </label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="bg-surface border border-white/10 focus:border-primary/50 text-xs text-on-surface rounded-lg p-3 focus:outline-none transition-colors font-mono"
              >
                <option value="Citizen Scientist">{language === 'EN' ? 'Citizen Scientist' : 'Cientista Cidadão'}</option>
                <option value="Commander">{language === 'EN' ? 'Commander (Space)' : 'Comandante (Espaço)'}</option>
                <option value="Climate Analyst">{language === 'EN' ? 'Climate Analyst (Earth)' : 'Analista Climático (Terra)'}</option>
                <option value="Chief Engineer">{language === 'EN' ? 'Chief Engineer' : 'Engenheiro Chefe'}</option>
                <option value="Mission Control">{language === 'EN' ? 'Mission Control' : 'Controle da Missão'}</option>
              </select>
            </div>
          </div>

          {/* Experience text content */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
              {language === 'EN' ? 'Mission Log Experience' : 'Experiência do Log de Missão'}
            </label>
            <textarea 
              required
              rows={4}
              placeholder={language === 'EN' ? "Record your telemetry analysis, orbital experiences or climate concerns..." : "Registre sua análise de telemetria, experiências orbitais ou preocupações climáticas..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-white/5 border border-white/10 focus:border-primary/50 text-sm text-on-surface rounded-lg p-3 focus:outline-none transition-colors resize-none font-sans"
            ></textarea>
          </div>

          {/* SDG Goal alignment selection */}
          <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
            <label className="text-[10px] font-label-caps text-primary uppercase tracking-wider">
              {language === 'EN' ? 'UN SDG Core Targets Alignment' : 'Alinhamento com Objetivos ODS da ONU'}
            </label>
            <p className="text-[10px] text-on-surface-variant opacity-75 leading-tight mb-1">
              {language === 'EN' 
                ? 'Select one or more UN Sustainable Development Goals addressed by this observation broadcast.' 
                : 'Selecione um ou mais Objetivos de Desenvolvimento Sustentável da ONU abordados nesta transmissão.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={sdg13Selected} 
                  onChange={() => setSdg13Selected(!sdg13Selected)}
                  className="rounded bg-[#12121A] text-secondary border-white/10 focus:ring-secondary/40 w-4 h-4"
                />
                <span className="text-xs text-on-surface font-mono">
                  {language === 'EN' ? 'SDG 13: Climate Action' : 'ODS 13: Ação Climática'}
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={sdg9Selected} 
                  onChange={() => setSdg9Selected(!sdg9Selected)}
                  className="rounded bg-[#12121A] text-secondary border-white/10 focus:ring-secondary/40 w-4 h-4"
                />
                <span className="text-xs text-on-surface font-mono">
                  {language === 'EN' ? 'SDG 9: Industry & Innovation' : 'ODS 9: Indústria e Inovação'}
                </span>
              </label>
            </div>
          </div>

          {/* Geolocation & Altitude */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider font-mono">
                {language === 'EN' ? 'Orbit sector / Coordinates' : 'Setor de Órbita / Coordenadas'}
              </label>
              <input 
                type="text" 
                placeholder={language === 'EN' ? "e.g. Orbit 14,291 / 15.42°S, 68.31°W" : "ex: Órbita 14.291 / 15.42°S, 68.31°O"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/5 border border-white/10 focus:border-primary/50 text-sm text-on-surface rounded-lg p-2.5 focus:outline-none transition-colors font-mono text-xs"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider font-mono">
                  {language === 'EN' ? 'Altitude (if in space)' : 'Altitude (se no espaço)'}
                </label>
                <span className="text-xs text-primary font-mono">
                  {altitude > 0 ? `${altitude} KM` : (language === 'EN' ? 'On Earth' : 'Na Terra')}
                </span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={1200}
                step={20}
                value={altitude}
                onChange={(e) => setAltitude(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none accent-primary mt-3"
              />
            </div>
          </div>

          {/* Drag & Drop Simulation or Image Selection preset */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
              {language === 'EN' ? 'Link Orbital Snapshot' : 'Anexar Captura Orbital'}
            </label>
            
            {/* Drag Zone */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`p-4 rounded-lg border-2 border-dashed text-center transition-all bg-white/5 ${
                dragActive ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <span className="material-symbols-outlined text-primary text-xl mb-1">cloud_upload</span>
              <p className="text-xs text-on-surface-variant font-mono">
                {language === 'EN'
                  ? 'Drag-and-drop space photography here or select a premium orbital preset below'
                  : 'Arraste e solte fotografias espaciais aqui ou selecione uma predefinição física abaixo'}
              </p>
            </div>

            {/* Presets List */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {PREMADE_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setImageLabel(img.label);
                  }}
                  className={`p-1 bg-surface-container-low text-left rounded-lg overflow-hidden border transition-all ${
                    selectedImage === img.url ? 'border-primary ring-1 ring-primary/40' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <img src={img.url} alt={img.title} className="w-full h-16 object-cover rounded-md mb-1 brightness-90" />
                  <div className="px-1 text-[10px] font-bold text-on-surface truncate">
                    {language === 'EN' ? img.title : (
                      img.title.includes('Glacier') ? 'Geleira Norueguesa' :
                      img.title.includes('Amazon') ? 'Copa da Amazônia' :
                      img.title.includes('Sahara') ? 'Nuvens de Poeira do Saara' :
                      'Amanhecer sobre os Andes'
                    )}
                  </div>
                  <div className="px-1 text-[8px] font-mono text-on-surface-variant truncate">
                    {language === 'EN' ? img.label : (
                      img.label.includes('Altitude') ? `Altitude: ${img.label.match(/\d+KM/)?.[0] || '400KM'}` : 'Imagem de Satélite'
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <footer className="pt-2 border-t border-white/10 flex justify-end gap-3 bg-surface-container/20">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-transparent hover:bg-white/5 text-on-surface-variant hover:text-on-surface px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
            >
              {language === 'EN' ? 'Cancel' : 'Cancelar'}
            </button>
            <button 
              type="submit" 
              className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all hover:brightness-115 active:scale-95 disabled:opacity-50"
              disabled={!author.trim() || !content.trim()}
            >
              {language === 'EN' ? 'Broadcast update' : 'Emitir transmissão'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
