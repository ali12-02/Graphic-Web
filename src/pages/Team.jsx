import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, Mail, Globe, Users, Briefcase, Target } from "lucide-react";

function Team() {
  const [teamData, setTeamData] = useState({
    teamTitle: "Meet The Team",
    teamSubtitle: "The creative minds behind Kreative Design Studio.",
    teamMembers: [
      {
        name: "Mohsin Azeem",
        role: "CEO & Creative Director",
        image: "https://ui-avatars.com/api/?name=Mohsin+Azeem&size=200&background=0D0D0D&color=fff",
        bio: "Leading the creative vision with over 10 years of experience.",
        socialLink: "#", 
        email: "ceo@kreativedesign.com",
        website: "https://www.kreativedesign.com",
        icon: Target
      },
      {
        name: "Waleed Ali",
        role: "Managing Director",
        image: "https://ui-avatars.com/api/?name=Waleed+Ali&size=200&background=0D0D0D&color=fff",
        bio: "Managing operations, driving business growth, and ensuring 100% client satisfaction.",
        socialLink: "#",
        email: "md@kreativedesign.com",
        website: "#",
        icon: Briefcase
      }
    ]
  });

  // 🟢 Load Data from CENTRAL BRAIN (Content Manager)
  useEffect(() => {
    const brain = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (brain) {
      setTeamData({
        teamTitle: brain.teamTitle || "Meet The Team",
        teamSubtitle: brain.teamSubtitle || "The creative minds behind Kreative Design Studio.",
        teamMembers: brain.teamMembers || [
          {
            name: "Mohsin Azeem",
            role: "CEO & Creative Director",
            image: "https://ui-avatars.com/api/?name=Mohsin+Azeem&size=200&background=0D0D0D&color=fff",
            bio: "Leading the creative vision with over 10 years of experience.",
            socialLink: "#", 
            email: "ceo@kreativedesign.com",
            website: "https://www.kreativedesign.com",
            icon: Target
          },
          {
            name: "Waleed Ali",
            role: "Managing Director",
            image: "https://ui-avatars.com/api/?name=Waleed+Ali&size=200&background=0D0D0D&color=fff",
            bio: "Managing operations, driving business growth, and ensuring 100% client satisfaction.",
            socialLink: "#",
            email: "md@kreativedesign.com",
            website: "#",
            icon: Briefcase
          }
        ]
      });
    }

    // Listen for Live Updates
    const handleUpdate = () => {
      const updatedBrain = JSON.parse(localStorage.getItem("websiteThemeConfig"));
      if (updatedBrain) {
        setTeamData({
          teamTitle: updatedBrain.teamTitle || "Meet The Team",
          teamSubtitle: updatedBrain.teamSubtitle || "The creative minds behind Kreative Design Studio.",
          teamMembers: updatedBrain.teamMembers || teamData.teamMembers
        });
      }
    };
    window.addEventListener("themeUpdated", handleUpdate);
    return () => window.removeEventListener("themeUpdated", handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 lg:py-32 px-6 relative overflow-hidden">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[170px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 lg:mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
            {teamData.teamTitle}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            {teamData.teamSubtitle}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {teamData.teamMembers.map((member, index) => {
            const Icon = member.icon || Users;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group relative bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-10 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-purple-800 shadow-[0_0_40px_rgba(168,85,247,0.2)] flex-shrink-0 group-hover:scale-105 transition duration-300">
                    <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover bg-[#0a0a0a] border-2 border-[#050505]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3 mx-auto sm:mx-0 group-hover:bg-purple-500/20 transition">
                      <Icon size={18} className="text-purple-400" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">{member.name}</h3>
                    <p className="text-purple-400 font-medium text-sm mt-1">{member.role}</p>
                    <p className="text-gray-400 text-sm mt-4 leading-relaxed group-hover:text-gray-300 transition-colors">{member.bio}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-6 pt-6 border-t border-white/5">
                      <a href={member.socialLink} target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-purple-500/20 hover:text-purple-400 transition text-gray-400 hover:scale-110 duration-300">
                        <Share2 size={20} />
                      </a>
                      <a href={`mailto:${member.email}`} className="p-2.5 bg-white/5 rounded-xl hover:bg-purple-500/20 hover:text-purple-400 transition text-gray-400 hover:scale-110 duration-300">
                        <Mail size={20} />
                      </a>
                      <a href={member.website} target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-purple-500/20 hover:text-purple-400 transition text-gray-400 hover:scale-110 duration-300">
                        <Globe size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to work with our experts?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Let's bring your creative vision to life with a dedicated team by your side.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]">
            Let's Talk
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Team;