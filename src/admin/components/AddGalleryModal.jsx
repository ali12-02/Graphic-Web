import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

function AddGalleryModal({
  isOpen,
  onClose,
  onSave,
  editImage,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  // Load Categories
  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(savedCategories);
  }, [isOpen]);

  // Edit Mode
  useEffect(() => {
    if (isOpen) {
      if (editImage) {
        setTitle(editImage.title || "");
        setCategory(editImage.category || "");
        setImage(editImage.image || "");
      } else {
        setTitle("");
        setCategory("");
        setImage("");
      }
    }
  }, [isOpen, editImage]);

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

  // Save
  const handleSubmit = () => {
    if (!title || !category || !image) {
      alert("Please fill all fields.");
      return;
    }

    onSave({
      title,
      category,
      image,
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setCategory("");
    setImage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#111] p-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            {editImage ? "Edit Image" : "Add Image"}
          </h2>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X className="text-white" />
          </button>

        </div>

        <div className="space-y-5">

          {/* Image Upload */}
          <label className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-500/40 bg-[#181818] transition hover:border-purple-500">

            {image ? (
              <img
                src={image}
                alt="Preview"
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <>
                <Upload
                  size={45}
                  className="text-purple-400"
                />

                <p className="mt-4 text-gray-400">
                  Click to Upload Image
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

          </label>

          {/* Title */}
          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white outline-none focus:border-purple-500"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] p-3 text-white outline-none focus:border-purple-500"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.name}
              >
                {cat.name}
              </option>
            ))}
          </select>

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={handleClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
          >
            {editImage ? "Update Image" : "Save Image"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddGalleryModal;