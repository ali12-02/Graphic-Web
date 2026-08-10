import { useState, useEffect } from "react";
import { X, ImageIcon, FileText } from "lucide-react";

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

  // ✅ Load Categories Correctly (Strings se Array banaya)
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
    } else {
      setTitle("");
      setCategory("");
      setDescription("");
      setImage("");
      setPdf("");
    }
  }, [isOpen, editProject]);

  if (!isOpen) return null;

  // Upload Image
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Upload PDF
  const handlePdf = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPdf(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Save
  const handleSubmit = () => {
    if (!title.trim() || !category.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    onSave({
      title,
      category,
      description,
      image,
      pdf,
      status: editProject?.status || "Published",
      featured: editProject?.featured || false,
      createdAt:
        editProject?.createdAt ||
        new Date().toISOString(),
    });

    // Notify dashboard
    window.dispatchEvent(
      new Event("projectsUpdated")
    );

    handleClose();
  };

  // Close Modal
  const handleClose = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setPdf("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="my-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111111] p-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {editProject ? "Edit Project" : "Add Project"}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Fill the project information below.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-xl p-2 transition hover:bg-white/10"
          >
            <X className="text-white" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500"
          />

          {/* ✅ FIXED: Category Dropdown (Sahi tarah se render hoga) */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))
            ) : (
              <option value="" disabled>No categories found</option>
            )}
          </select>

          {/* Description */}
          <textarea
            rows={5}
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none transition focus:border-purple-500"
          />

          {/* Image */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <ImageIcon size={18} />
              Upload Image
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleImage}
              className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-3 text-white"
            />
            {image && (
              <img
                src={image}
                alt=""
                className="mt-4 h-48 w-full rounded-2xl object-cover"
              />
            )}
          </div>

          {/* PDF */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <FileText size={18} />
              Upload PDF (Optional)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdf}
              className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-3 text-white"
            />
            {pdf && (
              <p className="mt-3 text-green-400">
                ✅ PDF Selected
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-2xl border border-white/10 px-6 py-3 text-white transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-2xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            {editProject ? "Update Project" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;