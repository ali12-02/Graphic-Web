import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";

import DashboardLayout from "../layout/DashboardLayout";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(saved);
  }, []);

  const saveCategories = (updated) => {
    setCategories(updated);
    localStorage.setItem(
      "categories",
      JSON.stringify(updated)
    );
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert("Category name is required.");
      return;
    }

    if (editingCategory) {
      const updated = categories.map((item) =>
        item.id === editingCategory.id
          ? {
              ...item,
              name: categoryName,
            }
          : item
      );

      saveCategories(updated);
    } else {
      const updated = [
        ...categories,
        {
          id: Date.now(),
          name: categoryName,
        },
      ];

      saveCategories(updated);
    }

    setCategoryName("");
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;

    const updated = categories.filter(
      (item) => item.id !== id
    );

    saveCategories(updated);
  };

  const filtered = categories.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      {/* Heading */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Categories
          </h1>

          <p className="mt-2 text-gray-400">
            Manage project categories
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null);
            setCategoryName("");
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition"
        >
          <Plus size={18} />
          New Category
        </button>

      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-2xl border border-white/10 bg-[#111] px-4 py-3">

        <Search size={18} className="text-gray-500" />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search category..."
          className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-gray-500"
        />

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">

        <table className="w-full">

          <thead className="border-b border-white/10 bg-[#181818]">

            <tr>

              <th className="px-6 py-4 text-left text-gray-300">
                Category
              </th>

              <th className="px-6 py-4 text-right text-gray-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="py-16 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              filtered.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-5 text-white">
                    {category.name}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-3">

                      <button
                        onClick={() =>
                          handleEdit(category)
                        }
                        className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(category.id)
                        }
                        className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">

          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
              >
                <X className="text-white" />
              </button>

            </div>

            <input
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              placeholder="Category Name"
              className="w-full rounded-xl bg-[#1b1b1b] p-3 text-white outline-none"
            />

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="rounded-xl border border-white/10 px-5 py-3 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
              >
                {editingCategory
                  ? "Update Category"
                  : "Save Category"}
              </button>

            </div>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default Categories;