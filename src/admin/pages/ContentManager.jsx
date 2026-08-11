import { useState, useEffect } from "react";
import { Save, FileText, Globe, Layout, Smartphone, Mail, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

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
    
    // Work
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
  };

  const [content, setContent] = useState(defaultContent);

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (saved) {
      // ✅ Safely merge saved data with defaults to prevent undefined errors
      setContent({
        ...defaultContent,
        ...saved,
        navbarMenu: saved.navbarMenu || defaultContent.navbarMenu,
        servicesList: saved.servicesList || defaultContent.servicesList,
        footerColumns: saved.footerColumns || defaultContent.footerColumns,
        workProjects: saved.workProjects || defaultContent.workProjects,
      });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("websiteThemeConfig", JSON.stringify(content));
    window.dispatchEvent(new Event("themeUpdated"));
    alert("✅ All Content Updated Successfully!");
  };

  // 🟢 DYNAMIC ARRAY HANDLERS
  const addNavbarItem = () => {
    setContent({
      ...content,
      navbarMenu: [...content.navbarMenu, { label: "New Link", url: "/new-url" }],
    });
  };
  const removeNavbarItem = (index) => {
    const newMenu = content.navbarMenu.filter((_, i) => i !== index);
    setContent({ ...content, navbarMenu: newMenu });
  };
  const updateNavbarItem = (index, field, value) => {
    const newMenu = [...content.navbarMenu];
    newMenu[index][field] = value;
    setContent({ ...content, navbarMenu: newMenu });
  };

  const addService = () => {
    setContent({
      ...content,
      servicesList: [...content.servicesList, { title: "New Service", description: "Description here..." }],
    });
  };
  const removeService = (index) => {
    const newList = content.servicesList.filter((_, i) => i !== index);
    setContent({ ...content, servicesList: newList });
  };
  const updateService = (index, field, value) => {
    const newList = [...content.servicesList];
    newList[index][field] = value;
    setContent({ ...content, servicesList: newList });
  };

  const addWorkProject = () => {
    setContent({
      ...content,
      workProjects: [...content.workProjects, { title: "New Project", description: "Description...", image: "/projects/fallback.jpg" }],
    });
  };
  const removeWorkProject = (index) => {
    const newList = content.workProjects.filter((_, i) => i !== index);
    setContent({ ...content, workProjects: newList });
  };
  const updateWorkProject = (index, field, value) => {
    const newList = [...content.workProjects];
    newList[index][field] = value;
    setContent({ ...content, workProjects: newList });
  };

  const addFooterColumn = () => {
    setContent({
      ...content,
      footerColumns: [...content.footerColumns, { title: "New Column", links: [{ label: "New Link", url: "#" }] }],
    });
  };
  const removeFooterColumn = (index) => {
    const newCols = content.footerColumns.filter((_, i) => i !== index);
    setContent({ ...content, footerColumns: newCols });
  };
  const addFooterLink = (colIndex) => {
    const newCols = [...content.footerColumns];
    newCols[colIndex].links.push({ label: "New Link", url: "#" });
    setContent({ ...content, footerColumns: newCols });
  };
  const removeFooterLink = (colIndex, linkIndex) => {
    const newCols = [...content.footerColumns];
    newCols[colIndex].links = newCols[colIndex].links.filter((_, i) => i !== linkIndex);
    setContent({ ...content, footerColumns: newCols });
  };
  const updateFooterLink = (colIndex, linkIndex, field, value) => {
    const newCols = [...content.footerColumns];
    newCols[colIndex].links[linkIndex][field] = value;
    setContent({ ...content, footerColumns: newCols });
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      <div className="h-screen flex-shrink-0"><Sidebar /></div>
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <div className="flex-shrink-0 z-10"><Topbar /></div>
        <main className="flex-1 overflow-y-auto relative">
          <div className="sticky top-0 z-20 bg-[#050505] px-8 py-6 border-b border-white/5 flex items-center justify-between shadow-lg">
            <div>
              <h1 className="text-4xl font-bold text-white">Content Manager</h1>
              <p className="mt-2 text-gray-400">Manage texts, links, and dynamic lists for the entire website.</p>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-purple-900/30">
              <Save size={18} /> Save All Content
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
                  <div><label className="text-sm text-gray-400">Hire Button Text</label><input type="text" value={content.navbarHire} onChange={(e) => setContent({...content, navbarHire: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" /></div>
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