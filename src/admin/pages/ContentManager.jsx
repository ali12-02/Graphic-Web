import { useState, useEffect } from "react";
import { Save, FileText, Globe, Layout, Smartphone, Mail, MapPin, Phone, Plus, Trash2, Image as ImageIcon, Users, Palette, Gauge, Star } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// 🟢 IMPORT CLOUD SYNC
import { uploadDataToCloud } from "../../utils/cloudSync";

function ContentManager() {
  // 🟢 DEFAULT DATA (Safe Fallback)
  const defaultContent = {
    // Hero Section
    heroTitle: "Mohsin Azeem",
    heroSubtitle: "Creative Director & Brand Identity Designer",
    heroBio: "I design brands, websites and digital experiences that leave a lasting impression.",
    heroLocation: "Faisalabad, Pakistan",
    heroWebsite: "www.kreativedesign.com",
    heroProfileImage: "https://ui-avatars.com/api/?name=Mohsin+Azeem&size=200&background=0D0D0D&color=fff",

    // Navbar
    navbarBrand: "Kreative Art & Design Studio",
    navbarHire: "Hire Me",
    navbarMenu: [
      { label: "Work", url: "/work" },
      { label: "Services", url: "/services" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
    
    // 🟢 WORK SECTION SIDED (Data retained for future, but UI hidden)
    workTitle: "Our Work",
    workSubtitle: "A showcase of our latest projects.",
    workProjects: [
      { title: "Project 1", description: "Description for project 1.", image: "/projects/project1.jpg" },
      { title: "Project 2", description: "Description for project 2.", image: "/projects/project2.jpg" },
    ],
    
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "What We Do Best",
    servicesList: [
      { title: "Brand Identity Design", description: "Creating memorable logos, color palettes, and brand guidelines." },
      { title: "Website Design", description: "Building modern, responsive, and user-friendly websites." },
      { title: "Social Media Marketing", description: "Strategic social media management to grow your audience." },
    ],
    
    // About
    aboutHeading: "About Us",
    aboutTitle: "Designing Brands That People Remember.",
    aboutText1: "Welcome to our creative world! We are a team of passionate graphic designers, dedicated to turning ideas into powerful visual stories.",
    aboutText2: "Whether you're launching a startup, upgrading your business, or simply looking to refresh your identity, we are here to help you stand out from the crowd.",
    
    // Contact
    contactEmail: "hello@kreativedesign.com",
    contactPhone: "+92 300 7617837",
    contactAddress: "Faisalabad, Pakistan",
    contactBtnText: "Send Message",
    
    // Footer
    footerBrand: "Kreative Art & Design Studio",
    footerTagline: "Where Creativity Meets Professionalism.",
    footerCopyright: "© 2026 Kreative Art & Design Studio. All rights reserved.",
    footerColumns: [
      { title: "Explore", links: [{ label: "Work", url: "/work" }, { label: "Services", url: "/services" }] },
      { title: "Company", links: [{ label: "About", url: "/about" }, { label: "Contact", url: "/contact" }] },
    ],

    // Team
    teamTitle: "Meet The Team",
    teamSubtitle: "The creative minds behind Kreative Design Studio.",
    teamMembers: [
      {
        name: "Mohsin Azeem",
        role: "CEO & Creative Director",
        bio: "Leading the creative vision with over 10 years of experience.",
        image: "https://ui-avatars.com/api/?name=Mohsin+Azeem&size=200&background=0D0D0D&color=fff",
        email: "ceo@kreativedesign.com",
        socialLink: "#"
      },
      {
        name: "Waleed Ali",
        role: "Managing Director",
        bio: "Managing operations, driving business growth, and ensuring 100% client satisfaction.",
        image: "https://ui-avatars.com/api/?name=Waleed+Ali&size=200&background=0D0D0D&color=fff",
        email: "md@kreativedesign.com",
        socialLink: "#"
      }
    ],

    // 🟢 MERGED: BUTTON MANAGER DATA
    buttonConfig: {
      navWorkLabel: "Work", navWorkLink: "/work",
      navServicesLabel: "Services", navServicesLink: "/services",
      navAboutLabel: "About", navAboutLink: "/#about-section",
      navTeamLabel: "Team", navTeamLink: "/team",
      navContactLabel: "Contact", navContactLink: "/contact",
      navHireLabel: "Hire Me", navHireLink: "/contact",
      heroPortfolioLabel: "Portfolio", heroPortfolioLink: "/work",
      heroAboutLabel: "About", heroAboutLink: "/#about-section",
      heroFeaturedLabel: "Featured", heroFeaturedLink: "/#featured-projects-section",
      heroTeamLabel: "Meet Team", heroTeamLink: "/team",
      aboutTalkLabel: "Let's Talk", aboutTalkLink: "/contact",
      aboutResumeLabel: "Download Resume", aboutResumeLink: "/Mohsin-Azeem-Resume.pdf"
    },

    // 🟢 MERGED: STUDIO STATS DATA
    studioStats: {
      projects: 70,
      clients: 100,
      awards: 12,
      iconColor: "#a855f7",
      textColor: "#ffffff",
      subtitleColor: "#9ca3af",
      animationSpeed: 1.5,
      projectPercent: 80,
      clientPercent: 100,
      awardsPercent: 80
    }
  };

  const [content, setContent] = useState(defaultContent);

  // Load saved data (New Logic: Merged from everywhere)
  useEffect(() => {
    // 1. Load Website Theme Config (Hero, Navbar, etc.)
    const savedConfig = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    
    // 2. Load Button Config
    const savedButtons = JSON.parse(localStorage.getItem("buttonConfig"));

    // 3. Load Studio Stats
    const savedStats = JSON.parse(localStorage.getItem("studioStats"));

    // Merge all data into one central state
    if (savedConfig || savedButtons || savedStats) {
      setContent((prev) => ({
        ...prev,
        ...savedConfig,
        navbarMenu: savedConfig?.navbarMenu || prev.navbarMenu,
        servicesList: savedConfig?.servicesList || prev.servicesList,
        footerColumns: savedConfig?.footerColumns || prev.footerColumns,
        workProjects: savedConfig?.workProjects || prev.workProjects,
        teamMembers: savedConfig?.teamMembers || prev.teamMembers,
        buttonConfig: { ...prev.buttonConfig, ...savedButtons },
        studioStats: { ...prev.studioStats, ...savedStats },
      }));
    }
  }, []);

  // 🟢 FIX: handleSave ko async banaya aur cloud sync add kiya
  const handleSave = async () => {
    // 1. Local save
    localStorage.setItem("websiteThemeConfig", JSON.stringify(content));
    localStorage.setItem("buttonConfig", JSON.stringify(content.buttonConfig));
    localStorage.setItem("studioStats", JSON.stringify(content.studioStats));

    window.dispatchEvent(new Event("themeUpdated"));
    window.dispatchEvent(new Event("buttonsUpdated"));
    window.dispatchEvent(new Event("statsUpdated"));
    
    // 2. 🟢 Cloud Sync (Upload to GitHub)
    alert("Saving to local and uploading to cloud...");
    const success = await uploadDataToCloud(content);
    
    if (success) {
      alert("✅ Data Saved Locally & Synced to Cloud! (All devices will now see this)");
    } else {
      alert("⚠️ Saved Locally, but Cloud Sync failed. Check your GitHub Token.");
    }
  };

  // 🟢 DYNAMIC ARRAY HANDLERS
  const addNavbarItem = () => { setContent({...content, navbarMenu: [...content.navbarMenu, { label: "New Link", url: "/new-url" }]}); };
  const removeNavbarItem = (index) => { const newMenu = content.navbarMenu.filter((_, i) => i !== index); setContent({ ...content, navbarMenu: newMenu }); };
  const updateNavbarItem = (index, field, value) => { const newMenu = [...content.navbarMenu]; newMenu[index][field] = value; setContent({ ...content, navbarMenu: newMenu }); };

  const addService = () => { setContent({...content, servicesList: [...content.servicesList, { title: "New Service", description: "Description here..." }]}); };
  const removeService = (index) => { const newList = content.servicesList.filter((_, i) => i !== index); setContent({ ...content, servicesList: newList }); };
  const updateService = (index, field, value) => { const newList = [...content.servicesList]; newList[index][field] = value; setContent({ ...content, servicesList: newList }); };

  // 🟢 REMOVED: Work Project Handlers (Since we hid the section)
  // const addWorkProject = () => { ... };
  // const removeWorkProject = (index) => { ... };
  // const updateWorkProject = (index, field, value) => { ... };

  const addFooterColumn = () => { setContent({...content, footerColumns: [...content.footerColumns, { title: "New Column", links: [{ label: "New Link", url: "#" }] }]}); };
  const removeFooterColumn = (index) => { const newCols = content.footerColumns.filter((_, i) => i !== index); setContent({ ...content, footerColumns: newCols }); };
  const addFooterLink = (colIndex) => { const newCols = [...content.footerColumns]; newCols[colIndex].links.push({ label: "New Link", url: "#" }); setContent({ ...content, footerColumns: newCols }); };
  const removeFooterLink = (colIndex, linkIndex) => { const newCols = [...content.footerColumns]; newCols[colIndex].links = newCols[colIndex].links.filter((_, i) => i !== linkIndex); setContent({ ...content, footerColumns: newCols }); };
  const updateFooterLink = (colIndex, linkIndex, field, value) => { const newCols = [...content.footerColumns]; newCols[colIndex].links[linkIndex][field] = value; setContent({ ...content, footerColumns: newCols }); };

  const addTeamMember = () => { setContent({...content, teamMembers: [...content.teamMembers, { name: "New Member", role: "Role", bio: "Bio...", image: "https://ui-avatars.com/api/?name=Member&background=0D0D0D&color=fff", email: "email@example.com", socialLink: "#" }]}); };
  const removeTeamMember = (index) => { const newList = content.teamMembers.filter((_, i) => i !== index); setContent({ ...content, teamMembers: newList }); };
  const updateTeamMember = (index, field, value) => { const newList = [...content.teamMembers]; newList[index][field] = value; setContent({ ...content, teamMembers: newList }); };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      <div className="h-screen flex-shrink-0"><Sidebar /></div>
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <div className="flex-shrink-0 z-10"><Topbar /></div>
        <main className="flex-1 overflow-y-auto relative">
          <div className="sticky top-0 z-20 bg-[#050505] px-8 py-6 border-b border-white/5 flex items-center justify-between shadow-lg">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-2">
                <Globe size={28} className="text-purple-400" /> Central Brain
              </h1>
              <p className="mt-2 text-gray-400">Control EVERYTHING (Content, Buttons & Stats) from one place.</p>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-purple-900/30">
              <Save size={18} /> Save Central Brain
            </button>
          </div>

          <div className="p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* HERO SECTION */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Layout size={20} className="text-purple-400" /> Hero Section</h3>
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-400">Main Title</label><input type="text" value={content.heroTitle} onChange={(e) => setContent({...content, heroTitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Subtitle</label><input type="text" value={content.heroSubtitle} onChange={(e) => setContent({...content, heroSubtitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Bio Text</label><textarea rows="2" value={content.heroBio} onChange={(e) => setContent({...content, heroBio: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Location</label><input type="text" value={content.heroLocation} onChange={(e) => setContent({...content, heroLocation: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Website URL</label><input type="text" value={content.heroWebsite} onChange={(e) => setContent({...content, heroWebsite: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Profile Image URL</label><input type="text" value={content.heroProfileImage} onChange={(e) => setContent({...content, heroProfileImage: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                </div>
              </div>

              {/* NAVBAR MENU */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Globe size={20} className="text-purple-400" /> Navbar Menu</h3>
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-400">Brand Name</label><input type="text" value={content.navbarBrand} onChange={(e) => setContent({...content, navbarBrand: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div className="border-t border-white/5 pt-4 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-gray-400">Menu Links</p>
                      <button onClick={addNavbarItem} className="flex items-center gap-1 text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full hover:bg-purple-600/40 transition"><Plus size={14} /> Add Link</button>
                    </div>
                    <div className="space-y-3">
                      {content.navbarMenu.map((item, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                          <div className="flex-1 min-w-[120px]"><input type="text" value={item.label} onChange={(e) => updateNavbarItem(index, 'label', e.target.value)} placeholder="Label" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-1 min-w-[120px]"><input type="text" value={item.url} onChange={(e) => updateNavbarItem(index, 'url', e.target.value)} placeholder="/url" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <button onClick={() => removeNavbarItem(index)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SERVICES LIST */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:col-span-2">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Smartphone size={20} className="text-purple-400" /> Services List</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm text-gray-400">Page Title</label><input type="text" value={content.servicesTitle} onChange={(e) => setContent({...content, servicesTitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                    <div><label className="text-sm text-gray-400">Page Subtitle</label><input type="text" value={content.servicesSubtitle} onChange={(e) => setContent({...content, servicesSubtitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-gray-400">Services Cards</p>
                      <button onClick={addService} className="flex items-center gap-1 text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full hover:bg-purple-600/40 transition"><Plus size={14} /> Add Service</button>
                    </div>
                    <div className="space-y-3">
                      {content.servicesList.map((service, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                          <div className="flex-1 min-w-[200px]"><input type="text" value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} placeholder="Title" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-[2] min-w-[200px]"><input type="text" value={service.description} onChange={(e) => updateService(index, 'description', e.target.value)} placeholder="Description" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <button onClick={() => removeService(index)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 🟢 BUTTON MANAGER (Embedded inside Brain) */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:col-span-2">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Layout size={20} className="text-purple-400" /> Global Button Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-3">Navbar Buttons</h4>
                    <div className="space-y-3">
                      <div className="flex gap-2"><input type="text" value={content.buttonConfig.navHireLabel} onChange={(e) => setContent({...content, buttonConfig: {...content.buttonConfig, navHireLabel: e.target.value}})} placeholder="Hire Label" className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-3">Hero & About Buttons</h4>
                    <div className="space-y-3">
                      <div className="flex gap-2"><input type="text" value={content.buttonConfig.heroPortfolioLabel} onChange={(e) => setContent({...content, buttonConfig: {...content.buttonConfig, heroPortfolioLabel: e.target.value}})} placeholder="Portfolio Label" className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                      <div className="flex gap-2"><input type="text" value={content.buttonConfig.aboutTalkLabel} onChange={(e) => setContent({...content, buttonConfig: {...content.buttonConfig, aboutTalkLabel: e.target.value}})} placeholder="Talk Label" className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🟢 STUDIO STATS (Embedded inside Brain) */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:col-span-2">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Gauge size={20} className="text-purple-400" /> Studio Stats & Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className="text-sm text-gray-400">Projects</label><input type="number" value={content.studioStats.projects} onChange={(e) => setContent({...content, studioStats: {...content.studioStats, projects: parseInt(e.target.value)}})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Clients</label><input type="number" value={content.studioStats.clients} onChange={(e) => setContent({...content, studioStats: {...content.studioStats, clients: parseInt(e.target.value)}})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Awards</label><input type="number" value={content.studioStats.awards} onChange={(e) => setContent({...content, studioStats: {...content.studioStats, awards: parseInt(e.target.value)}})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400 flex items-center gap-2"><Palette size={14} className="text-purple-400" /> Circle Color</label><input type="color" value={content.studioStats.iconColor} onChange={(e) => setContent({...content, studioStats: {...content.studioStats, iconColor: e.target.value}})} className="w-full h-10 bg-[#0a0a0a] border border-white/10 rounded-xl cursor-pointer" /></div>
                  <div><label className="text-sm text-gray-400 flex items-center gap-2"><Star size={14} className="text-yellow-400" /> Text Color</label><input type="color" value={content.studioStats.textColor} onChange={(e) => setContent({...content, studioStats: {...content.studioStats, textColor: e.target.value}})} className="w-full h-10 bg-[#0a0a0a] border border-white/10 rounded-xl cursor-pointer" /></div>
                  <div><label className="text-sm text-gray-400">Speed (sec)</label><input type="number" step="0.1" value={content.studioStats.animationSpeed} onChange={(e) => setContent({...content, studioStats: {...content.studioStats, animationSpeed: parseFloat(e.target.value)}})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                </div>
              </div>

              {/* TEAM SECTION */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:col-span-2">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Users size={20} className="text-purple-400" /> Team Section</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm text-gray-400">Page Title</label><input type="text" value={content.teamTitle} onChange={(e) => setContent({...content, teamTitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                    <div><label className="text-sm text-gray-400">Page Subtitle</label><input type="text" value={content.teamSubtitle} onChange={(e) => setContent({...content, teamSubtitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-gray-400">Team Members</p>
                      <button onClick={addTeamMember} className="flex items-center gap-1 text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full hover:bg-purple-600/40 transition"><Plus size={14} /> Add Member</button>
                    </div>
                    <div className="space-y-3">
                      {content.teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                          <div className="flex-1 min-w-[140px]"><label className="text-[10px] text-gray-500 uppercase tracking-wider">Name</label><input type="text" value={member.name} onChange={(e) => updateTeamMember(index, 'name', e.target.value)} placeholder="Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-1 min-w-[140px]"><label className="text-[10px] text-gray-500 uppercase tracking-wider">Role</label><input type="text" value={member.role} onChange={(e) => updateTeamMember(index, 'role', e.target.value)} placeholder="Role" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-1 min-w-[200px]"><label className="text-[10px] text-gray-500 uppercase tracking-wider">Bio</label><input type="text" value={member.bio} onChange={(e) => updateTeamMember(index, 'bio', e.target.value)} placeholder="Short Bio" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-1 min-w-[140px]"><label className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1"><ImageIcon size={12} className="text-purple-400" /> Image URL</label><input type="text" value={member.image} onChange={(e) => updateTeamMember(index, 'image', e.target.value)} placeholder="Image URL" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-1 min-w-[140px]"><label className="text-[10px] text-gray-500 uppercase tracking-wider">Email</label><input type="text" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} placeholder="Email" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <div className="flex-1 min-w-[140px]"><label className="text-[10px] text-gray-500 uppercase tracking-wider">Social Link</label><input type="text" value={member.socialLink} onChange={(e) => updateTeamMember(index, 'socialLink', e.target.value)} placeholder="Social URL" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" /></div>
                          <button onClick={() => removeTeamMember(index)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition mt-4"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ABOUT PAGE */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><FileText size={20} className="text-purple-400" /> About Page</h3>
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-400">Heading</label><input type="text" value={content.aboutHeading} onChange={(e) => setContent({...content, aboutHeading: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Main Title</label><input type="text" value={content.aboutTitle} onChange={(e) => setContent({...content, aboutTitle: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Paragraph 1</label><textarea rows="2" value={content.aboutText1} onChange={(e) => setContent({...content, aboutText1: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Paragraph 2</label><textarea rows="2" value={content.aboutText2} onChange={(e) => setContent({...content, aboutText2: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                </div>
              </div>

              {/* CONTACT PAGE */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Mail size={20} className="text-purple-400" /> Contact Details</h3>
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-400">Email Address</label><input type="text" value={content.contactEmail} onChange={(e) => setContent({...content, contactEmail: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Phone Number</label><input type="text" value={content.contactPhone} onChange={(e) => setContent({...content, contactPhone: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Address</label><input type="text" value={content.contactAddress} onChange={(e) => setContent({...content, contactAddress: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Send Button Text</label><input type="text" value={content.contactBtnText} onChange={(e) => setContent({...content, contactBtnText: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                </div>
              </div>

              {/* 🟢 WORK / PORTFOLIO SECTION HIDDEN (SIDED) */}
              {/* 
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:col-span-2">
                ...
              </div> 
              */}

              {/* FOOTER */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:col-span-2">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-[50px] pointer-events-none"></div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-4"><Layout size={20} className="text-purple-400" /> Footer</h3>
                <div className="space-y-6">
                  <div><label className="text-sm text-gray-400">Brand Name</label><input type="text" value={content.footerBrand} onChange={(e) => setContent({...content, footerBrand: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Tagline</label><input type="text" value={content.footerTagline} onChange={(e) => setContent({...content, footerTagline: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm text-gray-400">Copyright Text</label><input type="text" value={content.footerCopyright} onChange={(e) => setContent({...content, footerCopyright: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-gray-400">Footer Columns & Links</p>
                      <button onClick={addFooterColumn} className="flex items-center gap-1 text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full hover:bg-purple-600/40 transition"><Plus size={14} /> Add Column</button>
                    </div>
                    <div className="space-y-4">
                      {content.footerColumns.map((col, colIndex) => (
                        <div key={colIndex} className="bg-black/40 p-4 rounded-xl border border-white/5">
                          <div className="flex items-center justify-between mb-3">
                            <input type="text" value={col.title} onChange={(e) => {
                              const newCols = [...content.footerColumns];
                              newCols[colIndex].title = e.target.value;
                              setContent({ ...content, footerColumns: newCols });
                            }} placeholder="Column Title" className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none mr-3" />
                            <button onClick={() => removeFooterColumn(colIndex)} className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition"><Trash2 size={16} /></button>
                          </div>
                          <div className="space-y-2 pl-4 border-l border-white/10">
                            {col.links.map((link, linkIndex) => (
                              <div key={linkIndex} className="flex flex-wrap items-center gap-3 bg-black/60 p-2 rounded-lg">
                                <div className="flex-1 min-w-[100px]"><input type="text" value={link.label} onChange={(e) => updateFooterLink(colIndex, linkIndex, 'label', e.target.value)} placeholder="Label" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-1 text-white text-sm outline-none" /></div>
                                <div className="flex-1 min-w-[100px]"><input type="text" value={link.url} onChange={(e) => updateFooterLink(colIndex, linkIndex, 'url', e.target.value)} placeholder="/url" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-1 text-white text-sm outline-none" /></div>
                                <button onClick={() => removeFooterLink(colIndex, linkIndex)} className="text-red-400 hover:text-red-500 p-1 hover:bg-red-500/10 rounded-lg transition"><Trash2 size={14} /></button>
                              </div>
                            ))}
                            <button onClick={() => addFooterLink(colIndex)} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2 transition"><Plus size={12} /> Add Link</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContentManager;