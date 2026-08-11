import { useState, useEffect } from "react";
import { X, ImageIcon, FileText, Wrench, Plus, Palette } from "lucide-react";

function AddProjectModal({
  isOpen,
  onClose,
  onSave,
  editProject,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [status, setStatus] = useState("Published");

  // TOOLS, GALLERY & FIELDS STATES
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  
  const availableTools = [
    "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign",
    "Figma", "Canva", "Adobe XD", "Cinema 4D", "Blender"
  ];

  const availableFields = [
    "Graphic Design", "Brand Identity", "UI/UX", "Illustration",
    "Packaging Design", "Web Design", "Motion Graphics", "3D Design"
  ];

  // Load Categories
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(savedCategories);
  }, [isOpen]);

  // Edit Mode
  useEffect(() => {
    if (!isOpen) return;

    if (editProject) {
      setTitle(editProject.title || "");
      setCategory(editProject.category || "");
      setDescription(editProject.description || "");
      setImage(editProject.image || "");
      setPdf(editProject.pdf || "");
      setStatus(editProject.status || "Published");
      setSelectedTools(editProject.tools || []);
      setSelectedFields(editProject.fields || []);
      setGalleryUrls(editProject.gallery || []);
      setGalleryFiles([]);
    } else {
      setTitle(""); setCategory(""); setDescription(""); setImage(""); setPdf("");
      setStatus("Published");
      setSelectedTools([]);
      setSelectedFields([]);
      setGalleryUrls([]);
      setGalleryFiles([]);
    }
  }, [isOpen, editProject]);

  if (!isOpen) return null;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPdf(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setGalleryUrls((prev) => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Tool Selection
  const handleToolChange = (e) => {
    const value = e.target.value;
    if (value && !selectedTools.includes(value)) {
      setSelectedTools([...selectedTools, value]);
    }
  };
  const removeTool = (toolToRemove) => {
    setSelectedTools(selectedTools.filter(t => t !== toolToRemove));
  };

  // Creative Fields Selection
  const handleFieldChange = (e) => {
    const value = e.target.value;
    if (value && !selectedFields.includes(value)) {
      setSelectedFields([...selectedFields, value]);
    }
  };
  const removeField = (fieldToRemove) => {
    setSelectedFields(selectedFields.filter(f => f !== fieldToRemove));
  };

  // Save
  const handleSubmit = () => {
    if (!title.trim() || !category.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const galleryData = galleryUrls.length > 0 ? galleryUrls : [];

    onSave({
      title,
      category,
      description,
      image,
      pdf,
      status: status,
      tools: selectedTools,
      fields: selectedFields,
      gallery: galleryData,
      featured: editProject?.featured || false, // 🟢 Preserve featured if editing
      createdAt: editProject?.createdAt || new Date().toISOString(),
    });

    window.dispatchEvent(new Event("projectsUpdated"));
    handleClose();
  };

  const handleClose = () => {
    setTitle(""); setCategory(""); setDescription(""); setImage(""); setPdf("");
    setStatus("Published"); setSelectedTools([]); setSelectedFields([]); setGalleryUrls([]); setGalleryFiles([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-sm">
      {/* 🟢 FIX: Widen the modal (max-w-4xl instead of max-w-2xl) */}
      <div className="my-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">{editProject ? "Edit Project" : "Add Project"}</h2>
            <p className="mt-1 text-sm text-gray-400">Fill the project information below.</p>
          </div>
          <button onClick={handleClose} className="rounded-xl p-2 transition hover:bg-white/10"><X className="text-white" /></button>
        </div>

        <div className="space-y-5">
          <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500">
            <option value="">Select Category</option>
            {categories.length > 0 ? categories.map((cat, index) => (<option key={cat.id || index} value={cat.name}>{cat.name}</option>)) : (<option value="" disabled>No categories found</option>)}
          </select>
          <textarea rows={5} placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full resize-none rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500" />

          {/* Tools */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2"><Wrench size={16} className="text-purple-400" /> Tools Used</label>
            <select value="" onChange={handleToolChange} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500">
              <option value="">Select a tool...</option>
              {availableTools.map((tool) => (<option key={tool} value={tool}>{tool}</option>))}
            </select>
            {selectedTools.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTools.map((tool) => (
                  <span key={tool} className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs">
                    {tool}
                    <button onClick={() => removeTool(tool)} className="hover:text-red-400 ml-1"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Creative Fields */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2"><Palette size={16} className="text-purple-400" /> Creative Fields</label>
            <select value="" onChange={handleFieldChange} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500">
              <option value="">Select a field...</option>
              {availableFields.map((field) => (<option key={field} value={field}>{field}</option>))}
            </select>
            {selectedFields.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedFields.map((field) => (
                  <span key={field} className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs">
                    {field}
                    <button onClick={() => removeField(field)} className="hover:text-red-400 ml-1"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div><label className="text-sm text-gray-400 mb-1 block">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500">
              <option value="Published">Published</option><option value="Draft">Draft</option>
            </select>
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300"><Plus size={18} /> Project Gallery (Optional)</label>
            <input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-3 text-white" />
            {galleryUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {galleryUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-[#1a1a1a]">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                    <button onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full hover:bg-red-600 transition"><X size={14} className="text-white" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300"><ImageIcon size={18} /> Cover Image</label>
            <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImage} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-3 text-white" />
            {image && <img src={image} alt="" className="mt-4 h-48 w-full rounded-2xl object-cover" />}
          </div>

          {/* PDF */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300"><FileText size={18} /> Upload PDF (Optional)</label>
            <input type="file" accept=".pdf" onChange={handlePdf} className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-3 text-white" />
            {pdf && <p className="mt-3 text-green-400">✅ PDF Selected</p>}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={handleClose} className="rounded-2xl border border-white/10 px-6 py-3 text-white transition hover:bg-white/10">Cancel</button>
          <button onClick={handleSubmit} className="rounded-2xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700">{editProject ? "Update Project" : "Save Project"}</button>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;