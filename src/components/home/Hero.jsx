import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, MapPin, Briefcase, Star, Users, Sparkles, FolderOpen, Award } from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  const [allFeaturedProjects, setAllFeaturedProjects] = useState([]);
  
  const [reelItems, setReelItems] = useState([]);
  const [reelTextColor, setReelTextColor] = useState("#a855f7");
  const [reelBgColor, setReelBgColor] = useState("rgba(255, 255, 255, 0.03)");
  const [reelFontSize, setReelFontSize] = useState(14);
  const [reelFontWeight, setReelFontWeight] = useState("font-medium");
  const [reelSpeed, setReelSpeed] = useState(25);
  const [reelPosition, setReelPosition] = useState("after-stats");

  const [settings, setSettings] = useState({
    bgColor: "#050505",
    textColor: "#ffffff",
    accentColor: "#a855f7",
    heroTitle: "Mohsin Azeem",
    heroSubtitle: "Creative Director & Brand Identity Designer",
    heroBio: "I design brands, websites and digital experiences that leave a lasting impression.",
    heroLocation: "Faisalabad, Pakistan",
    heroWebsite: "www.kreativedesign.com",
    heroProfileImage: "https://ui-avatars.com/api/?name=Mohsin+Azeem&size=200&background=0D0D0D&color=fff",
  });

  const [stats, setStats] = useState({ 
    projects: 0, clients: 0, awards: 0,
    iconColor: "#a855f7",
    textColor: "#ffffff",
    subtitleColor: "#9ca3af",
    animationSpeed: 1.5,
    projectPercent: 80,
    clientPercent: 100,
    awardsPercent: 80
  });
  
  const [counts, setCounts] = useState({ projects: 0, clients: 0, awards: 0 });

  const loadAllData = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const featuredList = savedProjects.filter((project) => project.featured === true);
    setAllFeaturedProjects(featuredList);

    const savedOffers = JSON.parse(localStorage.getItem("offers")) || [];
    if (savedOffers.length > 0) {
      setReelItems(savedOffers);
    } else {
      setReelItems([
        "✦ Brand Identity Design",
        "✦ Logo Design",
        "✦ Website Design",
        "✦ UI / UX Design",
        "✦ Social Media Marketing",
        "✦ Packaging Design",
        "✦ 24/7 Support Available",
        "✦ 100% Client Satisfaction",
      ]);
    }

    const savedTextColor = localStorage.getItem("reelColor");
    if (savedTextColor) setReelTextColor(savedTextColor);
    const savedBgColor = localStorage.getItem("reelBgColor");
    if (savedBgColor) setReelBgColor(savedBgColor);
    const savedFontSize = localStorage.getItem("reelFontSize");
    if (savedFontSize) setReelFontSize(parseInt(savedFontSize) || 14);
    const savedFontWeight = localStorage.getItem("reelFontWeight");
    if (savedFontWeight) setReelFontWeight(savedFontWeight);
    const savedSpeed = localStorage.getItem("reelSpeed");
    if (savedSpeed) setReelSpeed(parseInt(savedSpeed) || 25);
    const savedPosition = localStorage.getItem("reelPosition");
    if (savedPosition) setReelPosition(savedPosition);

    const savedSettings = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (savedSettings) setSettings(savedSettings);

    const savedStats = JSON.parse(localStorage.getItem("studioStats")) || { 
      projects: 70, clients: 100, awards: 12,
      iconColor: "#a855f7",
      textColor: "#ffffff",
      subtitleColor: "#9ca3af",
      animationSpeed: 1.5,
      projectPercent: 80,
      clientPercent: 100,
      awardsPercent: 80
    };
    setStats(savedStats);
    setCounts({ projects: 0, clients: 0, awards: 0 });
  };

  useEffect(() => {
    loadAllData();
    const handleUpdate = () => { loadAllData(); };
    window.addEventListener("themeUpdated", handleUpdate);
    window.addEventListener("projectsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("themeUpdated", handleUpdate);
      window.removeEventListener("projectsUpdated", handleUpdate);
    };
  }, []);

  // Count Up Animation for Projects
  useEffect(() => {
    if (stats.projects > 0) {
      let start = 0; const end = stats.projects; const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1; setCounts((prev) => ({ ...prev, projects: start }));
        if (start >= end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [stats.projects]);

  // Count Up Animation for Clients
  useEffect(() => {
    if (stats.clients > 0) {
      let start = 0; const end = stats.clients; const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1; setCounts((prev) => ({ ...prev, clients: start }));
        if (start >= end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [stats.clients]);

  // Count Up Animation for Awards
  useEffect(() => {
    if (stats.awards > 0) {
      let start = 0; const end = stats.awards; const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1; setCounts((prev) => ({ ...prev, awards: start }));
        if (start >= end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [stats.awards]);

  const showReelHere = reelPosition === "after-hero";

  return (
    <section className="relative overflow-hidden min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col" style={{ backgroundColor: settings.bgColor }}>
      <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-violet-600/15 blur-[180px]" />
      <div className="absolute bottom-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/80 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative w-28 h-28 lg:w-32 lg:h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-purple-800 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] p-1">
                <img src={settings.heroProfileImage} alt={settings.heroTitle} className="w-full h-full rounded-full object-cover border-2 border-[#050505]" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="space-y-2 text-sm text-center">
              <div className="flex items-center justify-center gap-2 hover:text-white transition-colors cursor-default">
                <MapPin size={16} style={{ color: settings.accentColor }} /> <span className="text-gray-400">{settings.heroLocation}</span>
              </div>
              <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
                <Globe size={16} style={{ color: settings.accentColor }} /> <a href="#" className="text-gray-400 hover:text-white transition">{settings.heroWebsite}</a>
              </div>
            </motion.div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-3">
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/work')} className="flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-semibold text-sm transition hover:scale-105 shadow-lg"><Briefcase size={16} /> <span>Portfolio</span></button>
              <button onClick={() => { const element = document.getElementById("about-section"); if (element) element.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl font-medium text-sm transition hover:scale-105"><Users size={16} className="text-purple-400" /> <span>About</span></button>
              <button onClick={() => { const element = document.getElementById("featured-projects-section"); if (element) element.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-5 py-3 rounded-xl font-medium text-sm transition hover:scale-105 shadow-lg shadow-purple-900/30"><Star size={16} className="fill-current" /> <span>Featured</span></button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-10">
            <p className="uppercase tracking-[8px] text-gray-500 text-sm mb-4">Creative Director</p>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{ color: settings.textColor }}>{settings.heroTitle}</h1>
            <p className="mt-2 text-lg font-medium flex items-center gap-2" style={{ color: settings.accentColor }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: settings.accentColor }}></span> {settings.heroSubtitle}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-10">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">About Me</h3>
            <p className="text-lg leading-relaxed text-gray-300">{settings.heroBio}</p>
            <div className="mt-6 flex flex-wrap gap-6 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2"><FolderOpen size={16} className="text-purple-400" /> <span className="text-white font-medium">{counts.projects}+ Projects</span></div>
              <div className="flex items-center gap-2"><Users size={16} className="text-blue-400" /> <span className="text-white font-medium">{counts.clients}+ Clients</span></div>
              <div className="flex items-center gap-2"><Star size={16} className="text-yellow-400 fill-yellow-400" /> <span className="text-white font-medium">{stats.awards}+ Awards</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🔥 FIXED REEL (Ab mid se start nahi hogi, bilkul RIGHT side se andar aayegi) */}
      {showReelHere && (
        <div className="relative z-10 w-full mb-16">
          <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] overflow-hidden py-4 rounded-none border-y border-white/5 bg-[#0f0f0f]/50" style={{ backgroundColor: reelBgColor }}>
            <motion.div 
              className={`flex whitespace-nowrap gap-10 ${reelFontWeight} tracking-wider`}
              style={{ color: reelTextColor, fontSize: `${reelFontSize}px` }}
              animate={{ x: ["0%", "-100%"] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: reelSpeed }}
            >
              {/* Text ko 2 baar repeat kiya taake loop perfect ho */}
              {[...reelItems, ...reelItems].map((item, index) => (
                <span key={index} className="flex items-center gap-2 cursor-default">{item}</span>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {allFeaturedProjects.length > 0 && (
        <div id="featured-projects-section" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 mb-16">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 lg:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8 pb-6 border-b border-white/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-yellow-500/10"><Star className="text-yellow-400 fill-yellow-400" size={28} /></div>
                <div><h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">Featured Projects</h2><p className="text-gray-400 text-sm mt-1">Explore our most highlighted work</p></div>
              </div>
              <span className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300">{allFeaturedProjects.length} Projects</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allFeaturedProjects.map((project) => (
                <div onClick={() => navigate(`/project/${project.id}`)} className="group flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer border border-white/5 hover:border-purple-500/30">
                  <div className="w-14 h-14 rounded-lg bg-[#1a1a1a] overflow-hidden border border-white/5 flex-shrink-0"><img src={project.image || "/projects/fallback.jpg"} alt={project.title} className="w-full h-full object-cover" /></div>
                  <div className="flex-1"><h4 className="text-white font-medium text-lg group-hover:text-purple-300 transition-colors">{project.title}</h4><p className="text-sm text-gray-400">{project.category}</p></div>
                  <Star size={18} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔥 UPDATED STATS (Ab icons theme color k sath match karenge) */}
      <div id="studio-stats-section" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Studio Stats</h2>
          </div>
          <p className="text-sm text-gray-400">Awards & Achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          
          {/* 1. Projects */}
          <div className="flex flex-col items-center group">
            <div className="relative w-44 h-44 lg:w-52 lg:h-52">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="8" fill="transparent" />
                <motion.circle 
                  cx="50" cy="50" r="42" 
                  stroke={stats.iconColor} strokeWidth="8" 
                  fill="transparent" strokeLinecap="round"
                  initial={{ strokeDasharray: "0 264" }} 
                  whileInView={{ strokeDasharray: `${stats.projectPercent * 2.64} 264` }} 
                  transition={{ duration: stats.animationSpeed, ease: [0.34, 1.56, 0.64, 1] }} 
                  viewport={{ once: true }} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Theme Color Folder Icon */}
                <FolderOpen size={32} className="mb-1" style={{ color: stats.iconColor, filter: `drop-shadow(0 0 10px ${stats.iconColor}40)` }} />
                <span className="text-4xl font-bold" style={{ color: stats.textColor }}>{counts.projects}+</span>
              </div>
            </div>
            <h4 className="mt-4 text-lg font-semibold" style={{ color: stats.textColor }}>Projects Uploaded</h4>
            <p className="mt-1 text-sm text-center max-w-xs" style={{ color: stats.subtitleColor }}>A proven track record of delivering quality designs.</p>
          </div>

          {/* 2. Clients */}
          <div className="flex flex-col items-center group">
            <div className="relative w-44 h-44 lg:w-52 lg:h-52">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="8" fill="transparent" />
                <motion.circle 
                  cx="50" cy="50" r="42" 
                  stroke={stats.iconColor} strokeWidth="8" 
                  fill="transparent" strokeLinecap="round"
                  initial={{ strokeDasharray: "0 264" }} 
                  whileInView={{ strokeDasharray: `${stats.clientPercent * 2.64} 264` }} 
                  transition={{ duration: stats.animationSpeed, ease: [0.34, 1.56, 0.64, 1] }} 
                  viewport={{ once: true }} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Theme Color Users Icon */}
                <Users size={32} className="mb-1" style={{ color: stats.iconColor, filter: `drop-shadow(0 0 10px ${stats.iconColor}40)` }} />
                <span className="text-4xl font-bold" style={{ color: stats.textColor }}>{counts.clients}+</span>
              </div>
            </div>
            <h4 className="mt-4 text-lg font-semibold" style={{ color: stats.textColor }}>Clients Satisfied</h4>
            <p className="mt-1 text-sm text-center max-w-xs" style={{ color: stats.subtitleColor }}>Loved by amazing clients around the world.</p>
          </div>

          {/* 3. Awards Won */}
          <div className="flex flex-col items-center group">
            <div className="relative w-44 h-44 lg:w-52 lg:h-52">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="8" fill="transparent" />
                <motion.circle 
                  cx="50" cy="50" r="42" 
                  stroke={stats.iconColor} strokeWidth="8" 
                  fill="transparent" strokeLinecap="round"
                  initial={{ strokeDasharray: "0 264" }} 
                  whileInView={{ strokeDasharray: `${(stats.awardsPercent || 80) * 2.64} 264` }} 
                  transition={{ duration: stats.animationSpeed, ease: [0.34, 1.56, 0.64, 1] }} 
                  viewport={{ once: true }} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Theme Color Award Icon (Gold background remove kar diya) */}
                <div className="mb-1 flex items-center justify-center">
                  <Award size={34} style={{ color: stats.iconColor, filter: `drop-shadow(0 0 15px ${stats.iconColor}60)` }} />
                </div>
                <span className="text-3xl font-bold" style={{ color: stats.textColor }}>{counts.awards || 0}</span>
              </div>
            </div>
            <h4 className="mt-4 text-lg font-semibold" style={{ color: stats.textColor }}>Awards Won</h4>
            <p className="mt-1 text-sm text-center max-w-xs" style={{ color: stats.subtitleColor }}>Acknowledged for excellence in design.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;