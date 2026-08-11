import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Briefcase, Code, Globe, Sparkles, MapPin, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

function About() {
  // 🟢 DYNAMIC CONTENT LOADED FROM THEME SETTINGS
  const [content, setContent] = useState({
    heading: "About Us",
    title: "Designing Brands That People Remember.",
    text1: "Welcome to our creative world! We are a team of passionate graphic designers, dedicated to turning ideas into powerful visual stories. From logos to posters, brochures to banners, we design anything and everything your brand needs to shine.",
    text2: "Whether you're launching a startup, upgrading your business, or simply looking to refresh your identity, we are here to help you stand out from the crowd.",
    profileImage: "https://ui-avatars.com/api/?name=Mohsin+Azeem&size=200&background=0D0D0D&color=fff",
    heroTitle: "Mohsin Azeem",
    heroSubtitle: "Creative Director & Brand Identity Designer",
    heroLocation: "Faisalabad, Pakistan"
  });

  // 🟢 STATS
  const [stats, setStats] = useState({ projects: 0, clients: 0, rating: 0.0 });

  useEffect(() => {
    // Load Theme Config for Texts & Images
    const saved = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (saved) {
      setContent((prev) => ({
        ...prev,
        heading: saved.aboutHeading || "About Us",
        title: saved.aboutTitle || "Designing Brands That People Remember.",
        text1: saved.aboutText1 || "Welcome to our creative world!...",
        text2: saved.aboutText2 || "Whether you're launching a startup...",
        profileImage: saved.heroProfileImage || prev.profileImage,
        heroTitle: saved.heroTitle || prev.heroTitle,
        heroSubtitle: saved.heroSubtitle || prev.heroSubtitle,
        heroLocation: saved.heroLocation || prev.heroLocation
      }));
    }

    // Load Studio Stats
    const savedStats = JSON.parse(localStorage.getItem("studioStats")) || { projects: 70, clients: 100, rating: 5.0 };
    setStats(savedStats);
  }, []);

  // Social Links
  const socials = [
    { icon: Heart, label: "Instagram", url: "#" },
    { icon: Briefcase, label: "LinkedIn", url: "#" },
    { icon: Code, label: "Twitter / X", url: "#" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 lg:py-32 px-6 relative overflow-hidden">
      
      {/* Premium Background Glows */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px] pointer-events-none" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 lg:mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* 🟢 PREMIUM PROFILE HEADER */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16">
          
          {/* Profile Image (Bada Size + Admin Sync) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-64 lg:w-80 rounded-full p-2 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-purple-800 shadow-[0_0_80px_rgba(168,85,247,0.3)] flex-shrink-0"
          >
            <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden border-4 border-[#050505]">
              <img 
                src={content.profileImage} 
                alt={content.heroTitle} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
              {content.heroTitle}
            </h1>
            <p className="text-xl text-purple-400 font-medium mb-4 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              {content.heroSubtitle}
            </p>
            <p className="text-gray-400 flex items-center justify-center lg:justify-start gap-2">
              <MapPin size={18} className="text-purple-400" /> {content.heroLocation}
            </p>
          </motion.div>
        </div>

        {/* 🟢 PREMIUM ABOUT SECTION */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          
          {/* ===== LEFT SIDE: STATS & SOCIAL CARDS ===== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Stats Grid */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-purple-400" /> Activity
              </h3>
              <div className="divide-y divide-white/5">
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-gray-400">Projects Uploaded</span>
                  <span className="text-white font-medium">{stats.projects}+</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-gray-400">Clients Satisfied</span>
                  <span className="text-white font-medium">{stats.clients}+</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-gray-400">Google Rating</span>
                  <span className="text-yellow-400 font-medium">{stats.rating} <Star size={14} className="inline fill-current" /></span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">On The Web</h3>
              <div className="space-y-3">
                {socials.map((social) => (
                  <a 
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition group border border-white/5 hover:border-purple-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <social.icon size={18} className="text-purple-400 group-hover:scale-110 transition" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition">{social.label}</span>
                    </div>
                    <Globe size={14} className="text-gray-500 group-hover:text-purple-400 transition" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ===== RIGHT SIDE: ABOUT TEXT & BIO ===== */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden group">
              
              {/* Subtle Glow behind text */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] group-hover:scale-150 transition duration-500 pointer-events-none"></div>

              <h3 className="text-3xl lg:text-4xl font-bold leading-tight text-white relative z-10">
                {content.title}
              </h3>

              {/* Bio Paragraph */}
              <div className="mt-8 space-y-4 text-gray-300 leading-relaxed border-l-2 border-purple-500/50 pl-4 lg:pl-6 relative z-10">
                <p>
                  {content.text1}
                </p>
                <p>
                  {content.text2}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 relative z-10">
                <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105 hover:shadow-lg">
                  Let's Talk
                </button>
                <a
                  href="/Mohsin-Azeem-Resume.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-violet-400 hover:bg-violet-500/10"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default About;