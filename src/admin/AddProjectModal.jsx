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

  // Load Categories
  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(savedCategories);
  }, [isOpen]);

  // Edit Mode
  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen, editProject]);

  if (!isOpen) return null;

  // Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // PDF Upload
  const handlePdf = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPdf(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!title.trim() || !category.trim()) {
      alert("Please fill all required fields");
      return;
    }

    onSave({
      title,
      category,
      description,
      image,
      pdf,
      status: "Published",
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setPdf("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="my-10 w-full max-w-xl rounded-2xl border border-white/10 bg-[#111] p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            {editProject ? "Edit Project" : "Add Project"}
          </h2>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X className="text-white" />
          </button>

        </div>

        <div className="space-y-4">

          {/* Title */}

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white outline-none focus:border-purple-500"
          />

          {/* Category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white outline-none focus:border-purple-500"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Description */}

          <textarea
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white outline-none focus:border-purple-500 resize-none"
          />

          {/* Image Upload */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <ImageIcon size={18} />
              Upload Image
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleImage}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white"
            />

            {image && (
              <img
                src={image}
                alt=""
                className="mt-3 h-40 w-full rounded-xl object-cover"
              />
            )}

          </div>

          {/* PDF Upload */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <FileText size={18} />
              Upload PDF (Optional)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={handlePdf}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white"
            />

            {pdf && (
              <p className="mt-2 text-green-400">
                PDF Selected ✓
              </p>
            )}

          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={handleClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
          >
            {editProject ? "Update Project" : "Save Project"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddProjectModal;