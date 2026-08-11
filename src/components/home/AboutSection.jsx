import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Briefcase, Code, Globe, Sparkles } from "lucide-react"; 

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

export default function AboutSection() {
  const [reelItems, setReelItems] = useState([]);
  const [reelTextColor, setReelTextColor] = useState("#a855f7");
  const [reelBgColor, setReelBgColor] = useState("rgba(255, 255, 255, 0.03)");
  const [reelFontSize, setReelFontSize] = useState(14);
  const [reelFontWeight, setReelFontWeight] = useState("font-medium");
  const [reelSpeed, setReelSpeed] = useState(25);
  const [reelPosition, setReelPosition] = useState("after-stats");

  useEffect(() => {
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
  }, []);

  const [content, setContent] = useState({
    heading: "About Us",
    title: "Designing Brands That People Remember.",
    text1: "Welcome to our creative world! We are a team of passionate graphic designers, dedicated to turning ideas into powerful visual stories. From logos to posters, brochures to banners, we design anything and everything your brand needs to shine.",
    text2: "Whether you're launching a startup, upgrading your business, or simply looking to refresh your identity, we are here to help you stand out from the crowd.",
  });

  useEffect(() => {
    // 🟢 Load from CENTRAL BRAIN
    const brain = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (brain) {
      setContent({
        heading: brain.aboutHeading || "About Us",
        title: brain.aboutTitle || "Designing Brands That People Remember.",
        text1: brain.aboutText1 || "Welcome to our creative world!...",
        text2: brain.aboutText2 || "Whether you're launching a startup...",
      });
    }
  }, []);

  const stats = [
    { label: "Project Views", value: "441" },
    { label: "Appreciations", value: "53" },
    { label: "Followers", value: "7" },
    { label: "Following", value: "2" },
  ];

  const socials = [
    { icon: Heart, label: "Instagram", url: "#" },
    { icon: Briefcase, label: "LinkedIn", url: "#" },
    { icon: Code, label: "Twitter / X", url: "#" },
  ];

  const showReelHere = reelPosition === "after-about";

  return (
    <section id="about-section" className="relative overflow-hidden bg-[#050505] py-24 lg:py-32">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* REEL SECTION (Top) */}
        {reelPosition === "after-stats" && (
          <div className="relative z-10 w-full mb-12">
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <Sparkles size={20} className="text-purple-400" />
              <h3 className="text-xl font-medium text-white tracking-wide">Services & Expertise</h3>
            </div>

            <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] overflow-hidden py-4 border-y border-white/5" style={{ backgroundColor: reelBgColor }}>
              <motion.div 
                className={`flex whitespace-nowrap gap-10 ${reelFontWeight} tracking-wider`}
                style={{ color: reelTextColor, fontSize: `${reelFontSize}px` }}
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ repeat: Infinity, ease: "linear", duration: reelSpeed }}
              >
                {[...reelItems, ...reelItems].map((item, index) => (
                  <span key={index} className="flex items-center gap-2 cursor-default">{item}</span>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* About Us Heading */}
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">{content.heading}</h2>
          <p className="uppercase tracking-[8px] text-gray-500 text-sm">About Kreative Designers</p>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Activity</h3>
              <div className="divide-y divide-white/5">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-white font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">On The Web</h3>
              <div className="space-y-3">
                {socials.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition group border border-white/5 hover:border-purple-500/30">
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

          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-12">
              <p className="uppercase tracking-[8px] text-gray-500 text-sm mb-6"></p>
              <h3 className="text-3xl lg:text-4xl font-bold leading-tight text-white">{content.title}</h3>
              <div className="mt-8 space-y-4 text-gray-300 leading-relaxed border-l-2 border-purple-500/50 pl-4 lg:pl-6">
                <p>{content.text1}</p>
                <p>{content.text2}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105 hover:shadow-lg">Let's Talk</button>
                <a href="/Mohsin-Azeem-Resume.pdf" download className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-violet-400 hover:bg-violet-500/10">Download Resume</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* REEL SECTION (Bottom) */}
        {showReelHere && (
          <div className="relative z-10 w-full mt-16">
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <Sparkles size={20} className="text-purple-400" />
              <h3 className="text-xl font-medium text-white tracking-wide">Services & Expertise</h3>
            </div>
            <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] overflow-hidden py-4 border-y border-white/5" style={{ backgroundColor: reelBgColor }}>
              <motion.div 
                className={`flex whitespace-nowrap gap-10 ${reelFontWeight} tracking-wider`}
                style={{ color: reelTextColor, fontSize: `${reelFontSize}px` }}
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ repeat: Infinity, ease: "linear", duration: reelSpeed }}
              >
                {[...reelItems, ...reelItems].map((item, index) => (
                  <span key={index} className="flex items-center gap-2 cursor-default">{item}</span>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}