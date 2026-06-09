import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from './translations';
import {
  INITIAL_POSTS,
  INITIAL_SATELLITES,
  TOP_EXPLORERS,
  ACTIVE_MISSIONS,
  SPACE_DISCOVERIES
} from './mockData';
import { Post, Satellite } from './types';
import { MapComponent } from './components/MapComponent';
import { PostComponent } from './components/PostComponent';
import { NewPostForm } from './components/NewPostForm';
import { AstronautProfileGallery } from './components/AstronautProfileGallery';
import Logo from './assets/Logo.svg';

export default function App() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<'feed' | 'map' | 'crew' | 'discoveries'>('feed');

  // Station Time Clock
  const [stationTime, setStationTime] = useState<string>('14:22:09 UTC');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setStationTime(`${hrs}:${mins}:${secs} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic state engines
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [satellites, setSatellites] = useState<Satellite[]>(INITIAL_SATELLITES);
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(INITIAL_SATELLITES[0]);
  const [explorerSearch, setExplorerSearch] = useState<string>('');
  const [sdgFilterFilter, setSdgFilterFilter] = useState<string>('ALL');

  // New log modal state
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);

  // System parameters
  const [globalEarthCount, setGlobalEarthCount] = useState<number>(14294);
  const [orbitalCount, setOrbitalCount] = useState<number>(842);
  const [notifications, setNotifications] = useState<string[]>([
    'Solar Flare Alpha-3 warning alert updated',
    'Artemis VII entered orbit ingress corridor'
  ]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showLanguageSettings, setShowLanguageSettings] = useState<boolean>(false);
  const [language, setLanguage] = useState<'EN' | 'PT'>('EN');

  // Feed handlers
  const handleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const liked = !post.likedByMe;
          return {
            ...post,
            likedByMe: liked,
            likes: liked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, commentAuthor: string, commentContent: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author: commentAuthor,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE9vyQJz38eIeQAaYdLkK24uyK6-X9IM5Nip0JqVIzYMwV6zVxdicMOBq4PNbnlLyhkPzG4muA1juLhkmAcw9wP9vCRmVXqNaiA_tg_Y9pb2ghdBM_FX21fZ6muxjIcC0g7nULxZ7KlxSAm-Ym-Wty1iPAAQAzKcrEwKP_oem0w-C_jIhvPhpBC6EuIJS383xPvuLlrT2XHHOqICyymFedCuUSr8QSOBkHV-cWmpFo5i_tGsIkmTlbyfY1EnhFfGzcslZdv4qZyHRk',
      content: commentContent,
      date: 'Just now'
    };

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments || [], newComment]
          };
        }
        return post;
      })
    );
  };

  const handleAddPost = (newPostData: Omit<Post, 'id' | 'likes' | 'likedByMe' | 'comments' | 'date'>) => {
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 0,
      likedByMe: false,
      comments: [],
      date: 'Just now'
    };

    setPosts(prev => [newPost, ...prev]);
    // Also slightly increment orbital counts if post comes from space
    if (newPostData.altitude && newPostData.altitude > 0) {
      setOrbitalCount(prev => prev + 1);
    } else {
      setGlobalEarthCount(prev => prev + 1);
    }
  };

  const handleSyncData = () => {
    // Generate simulated real-time telemetry fluctuations
    setSatellites(prev =>
      prev.map(sat => ({
        ...sat,
        altitude: sat.altitude + Math.round((Math.random() - 0.5) * 6)
      }))
    );
    setOrbitalCount(prev => prev + Math.floor(Math.random() * 3));
    alert('Orbital Sync Complete:\nGeospatial telemetry calibration is strictly operational.');
  };

  // Filtered lists
  const filteredPosts = useMemo(() => {
    if (sdgFilterFilter === 'ALL') return posts;
    return posts.filter(post => post.sdgTags.some(tag => tag.includes(sdgFilterFilter)));
  }, [posts, sdgFilterFilter]);

  const filteredExplorers = useMemo(() => {
    if (!explorerSearch.trim()) return TOP_EXPLORERS;
    return TOP_EXPLORERS.filter(exp => exp.name.toLowerCase().includes(explorerSearch.toLowerCase()));
  }, [explorerSearch]);

  const activeMissionUpdates = useMemo(() => {
    return ACTIVE_MISSIONS;
  }, []);

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container pb-16 lg:pb-0">
      
      {/* Top Navigation Bar in Immersive UI Theme */}
      <header className="fixed top-0 w-full z-40 bg-[#0a0a0f]/85 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-4 lg:px-6 h-16 shrink-0">
        <div className="flex items-center gap-8">
          {/* ========================================== */}
          {/*    ASTROCONNECT OFFICIAL BRAND LOGO        */}
          {/* ========================================== */}
          <div id="astroconnect-brand-logo" className="flex items-center select-none">
            <img src={Logo} alt="AstroConnect Logo" className="h-8 sm:h-10 w-auto object-contain" />
          </div>
          {/* ========================================== */}
          
          {/* Desktop Tab Navigation formatted uppercase tracking-widest */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-bold font-mono uppercase tracking-widest text-[#b9cacb]" role="tablist" aria-label="Main Navigation Panels">
            <button 
              role="tab"
              aria-selected={activeTab === 'feed'}
              onClick={() => setActiveTab('feed')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'feed' ? 'text-[#00f2ff] border-b-2 border-[#00f2ff]' : 'hover:text-[#e4e1e9] border-b-2 border-transparent'
              }`}
            >
              {t.orbitalFeed}
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'map'}
              onClick={() => setActiveTab('map')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'map' ? 'text-[#00f2ff] border-b-2 border-[#00f2ff]' : 'hover:text-[#e4e1e9] border-b-2 border-transparent'
              }`}
            >
              {t.missionMap}
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'crew'}
              onClick={() => setActiveTab('crew')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'crew' ? 'text-[#00f2ff] border-b-2 border-[#00f2ff]' : 'hover:text-[#e4e1e9] border-b-2 border-transparent'
              }`}
            >
              {t.earthGallery}
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'discoveries'}
              onClick={() => setActiveTab('discoveries')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'discoveries' ? 'text-[#00f2ff] border-b-2 border-[#00f2ff]' : 'hover:text-[#e4e1e9] border-b-2 border-transparent'
              }`}
            >
              {t.commLink}
            </button>
          </nav>
        </div>

        {/* Global Toolbar with Stations clocks and signals */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Station Timer Dynamic Clock */}
          <div className="hidden sm:block text-right mr-2 select-none">
            <div className="text-[10px] text-cyan-400 font-mono tracking-wider font-bold">{t.stationTime}</div>
            <div className="text-sm font-mono tracking-tighter text-slate-100" id="station-time-clock">{stationTime}</div>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative material-symbols-outlined text-slate-400 hover:text-slate-100 hover:bg-white/5 p-2 rounded-full transition-all active:scale-95 text-lg sm:text-xl cursor-pointer"
              title="System Alerts"
              aria-haspopup="true"
              aria-expanded={showNotifications}
            >
              notifications
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-rose-500 active-glow animate-pulse"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-lg overflow-hidden z-50 shadow-2xl p-4 space-y-3 bg-[#12121a]/95 border border-white/10 max-h-[300px] overflow-y-auto backdrop-blur-md">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h4 className="text-[10px] font-mono font-bold text-[#00f2ff] uppercase tracking-widest">{t.activeAlerts}</h4>
                  <button 
                    onClick={() => setNotifications([])} 
                    className="text-[10px] text-slate-500 hover:text-[#00f2ff] underline font-mono"
                  >
                    {t.clearAll}
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 opacity-75 italic py-2">{t.noAlerts}</p>
                ) : (
                  notifications.map((notif, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-xs text-slate-300 leading-snug">
                      <span className="material-symbols-outlined text-[#00f2ff] text-sm mt-0.5">warning</span>
                      <span>{notif}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick Settings Group */}
          <div className="relative">
            <button 
              onClick={() => setShowLanguageSettings(!showLanguageSettings)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all active:scale-95 text-xs text-slate-300 hover:text-slate-100 font-mono font-bold cursor-pointer select-none"
              title="Change language / Mudar idioma"
              aria-haspopup="true"
              aria-expanded={showLanguageSettings}
            >
              <span className="material-symbols-outlined text-[16px]">translate</span>
              <span>{language}</span>
              <span className="material-symbols-outlined text-[12px] opacity-70">keyboard_arrow_down</span>
            </button>
            {showLanguageSettings && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg overflow-hidden z-50 shadow-2xl p-3 bg-[#12121a]/95 border border-white/10 space-y-2 backdrop-blur-md">
                <div className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider pb-1 border-b border-white/10 flex gap-2 items-center">
                  <span className="material-symbols-outlined text-xs">language</span>
                  <span>{t.selectLanguage}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => { setLanguage('EN'); setShowLanguageSettings(false); }}
                    className={`text-xs text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${language === 'EN' ? 'bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20' : 'text-slate-400 hover:bg-white/5'}`}
                  >
                    <span>English (US)</span>
                    {language === 'EN' && <span className="material-symbols-outlined text-sm text-[#00f2ff]">check</span>}
                  </button>
                  <button 
                    onClick={() => { setLanguage('PT'); setShowLanguageSettings(false); }}
                    className={`text-xs text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${language === 'PT' ? 'bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20' : 'text-slate-400 hover:bg-white/5'}`}
                  >
                    <span>Português (BR)</span>
                    {language === 'PT' && <span className="material-symbols-outlined text-sm text-[#00f2ff]">check</span>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Commander Badge */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-2 sm:pl-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 p-0.5">
              <div className="w-full h-full bg-[#1b1b20] rounded-full bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')] bg-cover"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex h-screen pt-16">
        
        {/* Left Sidebar (Desktop Only) with Telemetry Status Dashboard */}
        <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-[280px] bg-[#12121a]/90 backdrop-blur-md border-r border-white/10 flex-col p-6 select-none z-30 overflow-y-auto">
          <div className="space-y-8 flex-1">
            
            {/* Current Orbit Parameters Section */}
            <section>
              <h3 className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest mb-4 font-mono">{t.currentOrbit}</h3>
              <div className="glass-card rounded-md p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant">{t.altitude}</span>
                  <span className="text-xs font-mono text-[#00f2ff] font-bold">
                    {selectedSatellite ? `${selectedSatellite.altitude} km` : '408.2 km'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant">{t.velocity}</span>
                  <span className="text-xs font-mono text-[#00f2ff] font-bold">
                    {selectedSatellite ? `${(selectedSatellite.velocity / 3.6).toFixed(0)} km/h` : '27,581 km/h'}
                  </span>
                </div>
                <div className="w-full bg-[#1b1b20] h-1 rounded overflow-hidden mt-2">
                  <div className="bg-[#00f2ff] h-full w-2/3"></div>
                </div>
              </div>
            </section>

            {/* SDG 13: Climate Action Sector */}
            <section>
              <h3 className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest mb-4 font-mono">{t.climateActionTitle}</h3>
              <div className="p-4 rounded bg-emerald-950/20 border border-emerald-500/20 font-sans">
                <p className="text-[11px] leading-relaxed text-[#e4e1e9]/85">
                  {t.climateActionText}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                  <span className="block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  {t.dataUplinking}
                </div>
              </div>
            </section>

            {/* Active Mission Members list */}
            <section>
              <h3 className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest mb-4 font-mono">{t.activeMembers}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#00f2ff]/30 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Cdr. Sarah Jenks" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-on-surface">Cdr. Sarah Jenks</div>
                    <div className="text-[9px] text-[#00f2ff] uppercase tracking-tighter font-mono">ISS EXP-72</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Dr. Aris Thorne" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-on-surface">Dr. Aris Thorne</div>
                    <div className="text-[9px] text-on-surface-variant uppercase tracking-tighter font-mono">Tiangong Core</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Diagnostics triggers and utilities built-in safely */}
            <section className="pt-4 border-t border-white/10">
              <div className="flex flex-col gap-2.5 text-xs font-mono text-on-surface-variant">
                <button 
                  onClick={() => alert(t.systemStatusAlert)} 
                  className="flex items-center gap-3 hover:text-[#00f2ff] text-left transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">sensors</span>
                  {t.systemDiagnostics}
                </button>
                <button 
                  onClick={() => alert(t.astroAssistance)} 
                  className="flex items-center gap-3 hover:text-[#00f2ff] text-left transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">help</span>
                  {t.astroAssistance}
                </button>
              </div>
            </section>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <button 
              onClick={() => setIsNewPostOpen(true)}
              className="w-full py-3 bg-[#00f2ff] hover:bg-[#00dbe7] text-[#00363a] text-xs font-bold uppercase tracking-widest rounded transition-all font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,255,0.25)] hover:shadow-[0_0_25px_rgba(0,242,255,0.45)] cursor-pointer"
            >
              {t.initiateDownlink}
            </button>
          </div>
        </aside>

        {/* Core Screen Viewport Area */}
        <main className="flex-1 overflow-y-auto lg:pl-[280px]">
          
          {/* Animated Hero Map Section */}
          <section className="mb-4">
            <MapComponent 
              satellites={satellites}
              selectedSatellite={selectedSatellite}
              onSelectSatellite={(sat) => setSelectedSatellite(sat)}
              onSyncData={handleSyncData}
              language={language}
            />
          </section>

          {/* Multi-Tab Dynamic Router Content */}
          <div className="px-4 sm:px-6 md:px-gutter py-4 grid grid-cols-1 xl:grid-cols-12 gap-gutter mb-20 xl:mb-12">
            
            {/* Left Content column */}
            <div className="xl:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-gutter"
                >
                  {/* Tab 1: Mission Feed Panel */}
                  {activeTab === 'feed' && (
                    <div className="space-y-6">
                      
                      {/* Filter Controls */}
                      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface rounded-xl border border-white/5 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-base">filter_list</span>
                          <span className="font-label-caps text-[11px] text-on-surface-variant">{t.planetaryTargets}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['ALL', 'SDG 13', 'SDG 9'].map((filterOption) => (
                            <button
                              key={filterOption}
                              onClick={() => setSdgFilterFilter(filterOption)}
                              className={`px-3 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                                sdgFilterFilter === filterOption
                                  ? 'bg-primary-container text-on-primary-container border-primary-container font-semibold'
                                  : 'bg-white/5 text-on-surface-variant border-white/5 hover:border-white/10'
                              }`}
                            >
                              {filterOption === 'ALL' 
                                ? t.showAllProjects 
                                : filterOption === 'SDG 13' 
                                  ? t.showSdg13 
                                  : t.showSdg9}
                            </button>
                          ))}
                        </div>
                      </header>

                      {/* Posts Feed listing */}
                      <div className="space-y-6">
                        {filteredPosts.map(post => (
                          <PostComponent 
                            key={post.id}
                            post={post}
                            onLike={handleLikePost}
                            onAddComment={handleAddComment}
                            language={language}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Orbital Map Details Panel */}
                  {activeTab === 'map' && (
                    <div className="bg-surface rounded-xl p-6 border border-white/5 space-y-6">
                      <header className="border-b border-white/10 pb-4">
                        <h2 className="text-xl font-bold text-primary">
                          {language === 'EN' ? 'Inter-Space Network Synchronization' : 'Sincronização de Rede Interespacial'}
                        </h2>
                        <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                          {language === 'EN' 
                            ? 'Synchronizing trans-atmospheric signals from various telemetry instruments. Active satellites are currently broadcasting direct imagery indices aligning with SDG 9 (innovation) and SDG 13 (climate safety).' 
                            : 'Sincronizando sinais transatmosféricos de vários instrumentos de telemetria. Os satélites ativos estão transmitindo índices diretos de imagens alinhados com o ODS 9 (inovação) e o ODS 13 (segurança climática).'}
                        </p>
                      </header>

                      {/* Grid listing Satellites */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {satellites.map(sat => (
                          <div 
                            key={sat.id}
                            onClick={() => setSelectedSatellite(sat)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer bg-white/5 ${
                              selectedSatellite?.id === sat.id ? 'border-primary ring-1 ring-primary/35 active-glow' : 'border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-on-surface text-base flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: sat.pathColor }}></span>
                                {sat.name}
                              </h3>
                              <span className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                                sat.status === 'ACTIVE' || sat.status === 'OPTIMAL' ? 'bg-primary-container/20 text-primary border border-primary/20' : 'bg-surface text-on-surface-variant border border-white/10'
                              }`}>
                                {sat.status}
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant font-mono mb-3">
                              Type: {sat.tag}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono border-t border-white/5 pt-3">
                              <div>
                                <span className="text-[9px] text-on-surface-variant block">LATITUDE</span>
                                <span className="text-on-surface font-semibold">{sat.latitude}°N</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-on-surface-variant block">LONGITUDE</span>
                                <span className="text-on-surface font-semibold">{sat.longitude}°E</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Crew Profiles & Gallery Panel */}
                  {activeTab === 'crew' && (
                    <AstronautProfileGallery language={language} />
                  )}

                  {/* Tab 4: Space Archives Log Panel */}
                  {activeTab === 'discoveries' && (
                    <div className="bg-surface rounded-xl p-6 border border-white/5 space-y-6">
                      <header className="border-b border-white/10 pb-4">
                        <h2 className="text-xl font-bold text-primary">{t.discoveriesTitle}</h2>
                        <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                          {t.discoveriesSub}
                        </p>
                      </header>

                      <div className="space-y-6">
                        {SPACE_DISCOVERIES.map(disc => (
                          <div key={disc.id} className="relative pl-6 space-y-2 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/15">
                            <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background active-glow"></div>
                            <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-widest">{disc.date}</span>
                            <h3 className="font-bold text-on-surface text-lg pt-1">
                              {language === 'EN' ? disc.title : (
                                disc.title.includes('Global CO2') ? 'Detecção Global de CO₂ Anômala' :
                                disc.title.includes('Andean Glacial') ? 'Retração do Glaciar de Andes Registrada' :
                                disc.title.includes('Solar Maximum') ? 'Pico de Atividade Máxima Solar Coronária' :
                                disc.title
                              )}
                            </h3>
                            <p className="text-xs md:text-sm text-on-surface-variant/90 leading-relaxed max-w-2xl">
                              {language === 'EN' ? disc.description : (
                                disc.description.includes('orbiting spectrometer') ? 'Espectrômetros em órbita capturaram uma taxa elevada de liberação de combustíveis fósseis que necessita de atenção immediata das agências ambientais terrestres.' :
                                disc.description.includes('Hyperspectral captures') ? 'Capturas hiperespectrais confirmam que a área da cobertura de neve diminuiu mais rapidamente do que nos modelos climáticos da última década.' :
                                'Surgecimento repentino acelerado de erupções magnéticas solares interferindo com canais menores em altitudes sob 500KM.'
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Widget Column */}
            <div className="hidden xl:block xl:col-span-4 space-y-gutter">
              
              {/* Mission Progress list */}
              <section className="bg-[#12121a] rounded-xl p-5 border border-white/5 space-y-5" aria-label="Astronaut project trackers">
                <header className="flex items-center gap-2 text-primary font-label-caps text-label-caps border-b border-white/10 pb-2">
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  <span>{t.activeMissionProgress}</span>
                </header>

                <div className="space-y-4">
                  {activeMissionUpdates.map(miss => (
                    <div key={miss.id} className="space-y-1.5 block">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-on-surface">
                          {miss.name}
                        </span>
                        <span className="font-mono text-primary font-semibold">{miss.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 active-glow" 
                          style={{ width: `${miss.progress}%`, backgroundColor: miss.color }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-on-surface-variant opacity-80">
                        <span>
                          ETA: {language === 'EN' ? miss.eta : (
                            miss.eta.includes('T-Minus') ? miss.eta.replace('T-Minus', 'T-Menos') :
                            miss.eta.includes('Surface Sol') ? miss.eta.replace('Surface Sol', 'Sol de Superfície') :
                            miss.eta.includes('Finishing Calibration Pac') ? 'Finalizando Kit de Calibração' :
                            miss.eta
                          )}
                        </span>
                        <span>{miss.statusText}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Principal Explorers widgets */}
              <section className="bg-[#12121a] rounded-xl p-5 border border-white/5 space-y-4" aria-label="Top active discoverers leaderboard">
                <header className="flex items-center gap-2 text-primary font-label-caps text-label-caps border-b border-white/10 pb-2 uppercase tracking-wide">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  <span>{t.topExplorers}</span>
                </header>

                {/* Explorer Query Search */}
                <div>
                  <input 
                    type="text" 
                    placeholder={t.filterExplorersPlaceholder}
                    value={explorerSearch}
                    onChange={(e) => setExplorerSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 placeholder:text-on-surface-variant/40 rounded p-2 text-xs text-on-surface focus:outline-none focus:border-primary/50 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-3">
                  {filteredExplorers.map(exp => (
                    <div key={exp.rank} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-primary">#{exp.rank}</span>
                        <div className="h-8 w-8 rounded-full overflow-hidden border border-white/10">
                           <img src={exp.avatar} alt={exp.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-on-surface">{exp.name}</p>
                          <p className="text-[10px] text-on-surface-variant font-mono">
                            {exp.discoveries} {language === 'EN' ? 'Planetary logs' : 'Logs planetários'}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert(`Radio signal channeled directly to ${exp.name} over Planet Earth communications network.`)}
                        className="material-symbols-outlined text-on-surface-variant hover:text-primary hover:scale-110 active:scale-95 text-base cursor-pointer"
                        title="Establish direct audio payload telemetry"
                      >
                        settings_ethernet
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Geonode active connections tracker */}
              <section className="bg-[#12121a] rounded-xl p-5 border border-white/5 space-y-4" aria-label="Global planetary population counters">
                <header className="flex items-center gap-2 text-primary font-label-caps text-label-caps border-b border-white/10 pb-2 uppercase tracking-wide">
                  <span className="material-symbols-outlined text-sm">public</span>
                  <span>{t.globalConexao}</span>
                </header>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] text-on-surface-variant block uppercase">{t.earthUsers}</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-base font-bold text-on-surface">{(globalEarthCount / 1000).toFixed(1)}K</span>
                      <span className="text-[9px] text-green-400 font-bold">+4%</span>
                    </div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] text-on-surface-variant block uppercase">{t.orbitalUsers}</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-base font-bold text-primary">{orbitalCount}</span>
                      <span className="text-[9px] text-primary animate-pulse font-bold">ALIVE</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-on-surface-variant">
                  <span className="material-symbols-outlined text-xs text-emerald-400">check_circle</span>
                  <span>{t.secureConnection}</span>
                </div>
              </section>
            </div>
            
          </div>
        </main>
      </div>

      {/* Floating Action Button (FAB) for post creation */}
      <button 
        onClick={() => setIsNewPostOpen(true)}
        className="fixed bottom-20 lg:bottom-8 right-8 h-14 w-14 bg-[#00f2ff] hover:bg-[#00dbe7] text-[#00363a] rounded-full shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-90 active-glow z-40 cursor-pointer"
        title="Broadcast new log update"
        aria-label="Broadcast new log"
      >
        <span className="material-symbols-outlined text-2xl font-bold">edit_note</span>
      </button>

      {/* Mobile/Tablet Pivot Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 w-full h-16 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-40" role="tablist" aria-label="Mobile Navigation Drawer">
        <button 
          role="tab"
          aria-selected={activeTab === 'feed'}
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'feed' ? 'text-[#00f2ff]' : 'text-[#b9cacb]'}`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[9px] font-label-caps uppercase tracking-wider">Feed</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'map'}
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'map' ? 'text-[#00f2ff]' : 'text-[#b9cacb]'}`}
        >
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[9px] font-label-caps uppercase tracking-wider">Map</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'crew'}
          onClick={() => setActiveTab('crew')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'crew' ? 'text-[#00f2ff]' : 'text-[#b9cacb]'}`}
        >
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[9px] font-label-caps uppercase tracking-wider">Crew</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'discoveries'}
          onClick={() => setActiveTab('discoveries')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'discoveries' ? 'text-[#00f2ff]' : 'text-[#b9cacb]'}`}
        >
          <span className="material-symbols-outlined">history</span>
          <span className="text-[9px] font-label-caps uppercase tracking-wider">Archives</span>
        </button>
      </nav>

      {/* New Log modal drawer overlay */}
      {isNewPostOpen && (
        <NewPostForm 
          onAddPost={handleAddPost}
          onClose={() => setIsNewPostOpen(false)}
          language={language}
        />
      )}

      {/* Footer Status Bar matching Immersive UI Mockup */}
      <footer className="hidden lg:flex fixed bottom-0 left-0 w-full h-10 border-t border-white/5 bg-[#0a0a0f] px-6 items-center justify-between shrink-0 z-40 select-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-emerald-500">{t.uplinkSteady}</span>
          </div>
          <div className="text-[10px] font-mono text-[#b9cacb]/65">{t.latency}: 240ms</div>
          <div className="text-[10px] font-mono text-[#b9cacb]/65">{t.node}: LEO-SOUTH-ALPHA</div>
        </div>
        <div className="text-[10px] text-[#b9cacb]/45 font-mono">
          © 2026 ASTROCONNECT PLATFORM // {t.secureChannel}
        </div>
      </footer>
      
    </div>
  );
}
