import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, FileText, Image, CheckCircle, ArrowRight, ArrowLeft, Loader2, Crop, Plus, Wrench, Palette } from 'lucide-react';
import Cropper from 'react-easy-crop';

function AddProject() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    status: 'Published',
    tools: [],
    fields: [],
  });

  const availableTools = [
    "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign",
    "Figma", "Canva", "Adobe XD", "Cinema 4D", "Blender"
  ];

  const availableFields = [
    "Graphic Design", "Brand Identity", "UI/UX", "Illustration",
    "Packaging Design", "Web Design", "Motion Graphics", "3D Design"
  ];

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [pixelDimensions, setPixelDimensions] = useState({ width: 0, height: 0 });
  const [finalImageDataUrl, setFinalImageDataUrl] = useState(null);
  
  const [aspectRatio, setAspectRatio] = useState('16/9'); 
  
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(savedCategories);
  }, []);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const API_KEY = '9af14ef2dc4f9ee0be3163ef7299f1c2'; 
    formData.append('key', API_KEY);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Image upload failed');
    }

    const data = await response.json();
    return data.data.url;
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      image.onerror = reject;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsCropping(false);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setPixelDimensions({ width: 0, height: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToolChange = (e) => {
    const value = e.target.value;
    if (value && !formData.tools.includes(value)) {
      setFormData({ ...formData, tools: [...formData.tools, value] });
    }
  };

  const removeTool = (toolToRemove) => {
    setFormData({ ...formData, tools: formData.tools.filter(t => t !== toolToRemove) });
  };

  const handleFieldChange = (e) => {
    const value = e.target.value;
    if (value && !formData.fields.includes(value)) {
      setFormData({ ...formData, fields: [...formData.fields, value] });
    }
  };

  const removeField = (fieldToRemove) => {
    setFormData({ ...formData, fields: formData.fields.filter(f => f !== fieldToRemove) });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    if (croppedAreaPixels) {
      setPixelDimensions({
        width: Math.round(croppedAreaPixels.width),
        height: Math.round(croppedAreaPixels.height)
      });
    }
  };

  const applyCrop = async () => {
    try {
      if (!croppedAreaPixels) {
        alert("Please select a crop area first.");
        return;
      }
      const croppedImageUrl = await getCroppedImg(imagePreview, croppedAreaPixels);
      setFinalImageDataUrl(croppedImageUrl);
      setIsCropping(false);
      setImagePreview(croppedImageUrl);
    } catch (e) {
      console.error(e);
      alert("Crop failed. Please try again.");
    }
  };

  const cancelCrop = () => {
    setIsCropping(false);
    setImagePreview(null);
    setImageFile(null);
    setFinalImageDataUrl(null);
    setPixelDimensions({ width: 0, height: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      let fileToUpload = null;

      if (finalImageDataUrl) {
        const res = await fetch(finalImageDataUrl);
        const blob = await res.blob();
        fileToUpload = new File([blob], "cropped_image.jpg", { type: "image/jpeg" });
      } else if (imageFile) {
        fileToUpload = imageFile;
      }

      if (fileToUpload) {
        imageUrl = await uploadToImgBB(fileToUpload);
      }

      const galleryUrls = [];
      for (const file of galleryFiles) {
        const url = await uploadToImgBB(file);
        galleryUrls.push(url);
      }

      let pdfUrl = null;
      if (pdfFile) {
        pdfUrl = await uploadToImgBB(pdfFile);
      }

      const newProject = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        title: formData.title,
        category: formData.category,
        description: formData.description,
        image: imageUrl, 
        gallery: galleryUrls,
        pdf: pdfUrl,
        status: formData.status,
        tools: formData.tools || [],
        fields: formData.fields || [],
        featured: false, // 🟢 New projects are not featured by default
        createdAt: new Date().toISOString(),
      };

      const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
      savedProjects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(savedProjects));

      setLoading(false);
      alert('✅ Project published successfully!');
      navigate('/dashboard/projects');

    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Upload failed: ' + error.message);
      setLoading(false);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFinalImageDataUrl(null);
    setIsCropping(false);
    setPixelDimensions({ width: 0, height: 0 });
  };

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (!imagePreview) {
        alert("Please upload a Project Cover Image first!");
        return;
      }
      if (!formData.title.trim() || !formData.category.trim()) {
        alert("Please fill in Title and Category!");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-[#050505] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
        
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-white/5">
          <div className="flex gap-3">
            <button onClick={() => goToStep(1)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer hover:opacity-80 ${currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>1. Cover</button>
            <button onClick={() => goToStep(2)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer hover:opacity-80 ${currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>2. Details</button>
            <button onClick={() => goToStep(3)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer hover:opacity-80 ${currentStep === 3 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>3. Publish</button>
          </div>
          <button onClick={() => navigate('/dashboard/projects')} className="text-gray-400 hover:text-white transition hover:bg-white/10 p-2 rounded-full"><X size={22} /></button>
        </div>

        <div className="p-8 sm:p-10">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Project Cover <span className="text-red-400 text-sm font-normal">*</span></h2>
                  {imagePreview && !isCropping && (
                    <button onClick={() => setIsCropping(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition"><Crop size={16} /> Adjust Cover</button>
                  )}
                </div>
                <p className="text-gray-400 text-sm">Choose a cover image that best represents your project.</p>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-700/50 hover:border-purple-500/50 rounded-xl p-10 text-center transition-all duration-300 cursor-pointer bg-[#161616] h-80 flex flex-col items-center justify-center group">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" required />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                      <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-purple-500/20"><Image className="w-8 h-8 text-purple-400" /></div>
                      <span className="text-gray-200 font-medium">Upload Cover Image</span>
                      <span className="text-gray-500 text-xs mt-2">PNG, JPG, WEBP (Max 32MB)</span>
                    </label>
                  </div>
                ) : isCropping ? (
                  <div className="flex flex-col gap-4 h-auto">
                    <div className="relative h-80 rounded-xl overflow-hidden border border-white/10 bg-black">
                      <Cropper image={imagePreview} crop={crop} zoom={zoom} aspect={aspectRatio === 'FREE' ? undefined : eval(aspectRatio)} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} style={{ containerStyle: { height: '100%', width: '100%' } }} />
                    </div>
                    <div className="flex flex-row items-center justify-between bg-[#161616] p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#0a0a0a] px-4 py-2.5 rounded-lg border border-white/10">
                          <label className="text-xs text-gray-400 font-medium">Shape:</label>
                          <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="bg-[#0a0a0a] text-white text-xs border-none outline-none cursor-pointer [&>option]:bg-[#1f1f1f] [&>option]:text-white">
                            <option value="FREE">Free</option><option value="1/1">Square</option><option value="16/9">Landscape</option><option value="4/5">Portrait</option>
                          </select>
                        </div>
                        <div className="group cursor-default bg-[#0a0a0a] px-4 py-2.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs whitespace-nowrap">
                          <span className="text-gray-400">R:</span><span className="text-gray-200 group-hover:text-purple-400 transition-colors font-medium">{aspectRatio.replace('/', ':')}</span><span className="text-gray-600">|</span><span className="text-gray-200 group-hover:text-purple-400 transition-colors font-medium">{pixelDimensions.width}px <span className="text-gray-600">x</span> {pixelDimensions.height}px</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={cancelCrop} className="px-6 py-2.5 bg-[#0a0a0a] hover:bg-white/10 border border-white/10 text-white text-xs font-medium rounded-lg transition">Cancel</button>
                        <button onClick={applyCrop} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition shadow-lg shadow-purple-900/30">Apply</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group/image h-80 rounded-xl overflow-hidden border border-purple-500/20 bg-[#0a0a0a]">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={removeImage} className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 rounded-full transition-all shadow-lg shadow-red-900/50"><X className="w-4 h-4 text-white" /></button>
                  </div>
                )}
              </div>
              
              <div className="space-y-6 bg-[#161616] p-6 rounded-2xl border border-white/5">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Project Title <span className="text-red-400">*</span></label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., EcoTrack Dashboard" className="w-full p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Category <span className="text-red-400">*</span></label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all [&>option]:bg-[#1f1f1f] [&>option]:text-white appearance-none" required>
                    <option value="">Select a category...</option>
                    {categories.length > 0 ? categories.map((cat, index) => (<option key={cat.id || index} value={cat.name}>{cat.name}</option>)) : (<option value="" disabled>No categories found.</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                    <Wrench size={16} className="text-purple-400" /> Tools Used <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                  </label>
                  <select value="" onChange={handleToolChange} className="w-full p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all">
                    <option value="">Select a tool...</option>
                    {availableTools.map((tool) => (
                      <option key={tool} value={tool}>{tool}</option>
                    ))}
                  </select>
                  {formData.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tools.map((tool) => (
                        <span key={tool} className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs">
                          {tool}
                          <button onClick={() => removeTool(tool)} className="hover:text-red-400 ml-1"><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                    <Palette size={16} className="text-purple-400" /> Creative Fields <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                  </label>
                  <select value="" onChange={handleFieldChange} className="w-full p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all">
                    <option value="">Select a field...</option>
                    {availableFields.map((field) => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                  {formData.fields.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.fields.map((field) => (
                        <span key={field} className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs">
                          {field}
                          <button onClick={() => removeField(field)} className="hover:text-red-400 ml-1"><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Short Description <span className="text-red-400">*</span></label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="A brief summary of your project..." rows="4" className="w-full p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none transition-all resize-none" required />
                </div>
              </div>
            </div>
          )}

          {/* ============ STEP 2 ============ */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-white">Project Preview</h2>
                <p className="text-gray-400 text-sm">Here's how your cover will look.</p>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-[#161616] p-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg object-cover aspect-video" />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center text-gray-500 bg-[#0a0a0a] rounded-lg">No cover image selected</div>
                  )}
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <h3 className="text-white text-lg font-medium">{formData.title || "Untitled Project"}</h3>
                    <p className="text-gray-400 text-sm mt-1">{formData.category || "No Category"}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-white mb-3">Project Gallery <span className="text-sm text-gray-400 font-normal">(Optional)</span></h3>
                  <div className="border-2 border-dashed border-gray-700/50 hover:border-purple-500/50 rounded-xl p-6 text-center transition-all duration-300 cursor-pointer bg-[#161616]">
                    <input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="hidden" id="gallery-upload" />
                    <label htmlFor="gallery-upload" className="cursor-pointer flex flex-col items-center">
                      <Plus size={24} className="text-gray-400 mb-2" />
                      <span className="text-gray-300">Click to upload multiple images</span>
                    </label>
                  </div>
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-[#1a1a1a]">
                          <img src={preview} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                          <button onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full hover:bg-red-600 transition"><X size={14} className="text-white" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#161616] p-6 rounded-2xl border border-white/5 space-y-6 lg:col-span-1 h-fit">
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">Project Settings</h3>
                
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all [&>option]:bg-[#1f1f1f] [&>option]:text-white">
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase mb-2">PDF Document <span className="text-gray-600 font-normal">(Optional)</span></label>
                  <div className="flex items-center gap-3 border border-white/10 rounded-xl p-3 bg-[#0a0a0a] cursor-pointer hover:border-purple-500/50 transition">
                    <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdf-upload" />
                    <label htmlFor="pdf-upload" className="cursor-pointer flex items-center gap-3 w-full">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className={pdfFile ? "text-green-400 text-sm truncate" : "text-gray-400 text-sm"}>{pdfFile ? pdfFile.name : "Upload PDF document"}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ STEP 3 ============ */}
          {currentStep === 3 && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle className="w-10 h-10 text-green-500" /></div>
              <h2 className="text-3xl font-bold text-white">Ready to Publish?</h2>
              <p className="text-gray-400 max-w-md">You are all set! Review your project details below and hit the publish button.</p>
              <div className="bg-[#161616] p-6 rounded-2xl border border-white/5 w-full max-w-md text-left space-y-3 shadow-sm">
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-400 text-sm">Title</span><span className="text-white font-medium truncate max-w-[200px]">{formData.title}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-400 text-sm">Category</span><span className="text-white font-medium">{formData.category}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-400 text-sm">Status</span><span className="text-purple-400 font-medium">{formData.status}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-400 text-sm">Tools</span><span className="text-white font-medium">{formData.tools.length} Selected</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-400 text-sm">Fields</span><span className="text-white font-medium">{formData.fields.length} Selected</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-400 text-sm">Gallery</span><span className="text-white font-medium">{galleryPreviews.length} Images</span></div>
                <div className="flex justify-between"><span className="text-gray-400 text-sm">Cover Image</span><span className="text-green-400 text-sm font-medium">✅ Cropped & Uploaded</span></div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
            <button onClick={currentStep === 1 ? () => navigate('/dashboard/projects') : goToPrevStep} className="px-6 py-3 text-gray-400 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition">
              {currentStep === 1 ? "Cancel" : <span className="flex items-center gap-2"><ArrowLeft size={18} /> Back</span>}
            </button>
            {currentStep < 3 ? (
              <button onClick={goToNextStep} className="px-8 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition flex items-center gap-2 shadow-lg shadow-white/5">
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 min-w-[150px] ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-900/30'}`}>
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</> : 'Publish Project'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;