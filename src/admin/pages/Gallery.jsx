import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import DashboardLayout from "../layout/DashboardLayout";

import GalleryTable from "../components/GalleryTable";
import AddGalleryModal from "../components/AddGalleryModal";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  // Load Gallery
  useEffect(() => {
    const savedGallery =
      JSON.parse(localStorage.getItem("gallery")) || [];

    setGallery(savedGallery);
  }, []);

  // Save / Update
  const handleSave = (image) => {
    let updatedGallery;

    if (editingImage) {
      updatedGallery = gallery.map((item) =>
        item.id === editingImage.id
          ? {
              ...image,
              id: editingImage.id,
            }
          : item
      );
    } else {
      updatedGallery = [
        ...gallery,
        {
          ...image,
          id: Date.now(),
        },
      ];
    }

    setGallery(updatedGallery);

    localStorage.setItem(
      "gallery",
      JSON.stringify(updatedGallery)
    );

    setEditingImage(null);
    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = (id) => {
    const updatedGallery = gallery.filter(
      (item) => item.id !== id
    );

    setGallery(updatedGallery);

    localStorage.setItem(
      "gallery",
      JSON.stringify(updatedGallery)
    );
  };

  // Edit
  const handleEdit = (image) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  // Search
  const filteredGallery = gallery.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Gallery
          </h1>

          <p className="mt-2 text-gray-400">
            Manage gallery images
          </p>
        </div>

        <button
          onClick={() => {
            setEditingImage(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Add Image
        </button>

      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-2xl border border-white/10 bg-[#111] px-4 py-3">

        <Search
          size={18}
          className="text-gray-500"
        />

        <input
          type="text"
          placeholder="Search image..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
        />

      </div>

      {/* Table */}
      <GalleryTable
        gallery={filteredGallery}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Modal */}
      <AddGalleryModal
        isOpen={isModalOpen}
        onClose={() => {
          setEditingImage(null);
          setIsModalOpen(false);
        }}
        onSave={handleSave}
        editImage={editingImage}
      />
    </DashboardLayout>
  );
}

export default Gallery;