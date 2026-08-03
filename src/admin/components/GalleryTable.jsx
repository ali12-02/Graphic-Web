import { Pencil, Trash2 } from "lucide-react";

function GalleryTable({
  gallery,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
      <table className="w-full">

        <thead className="border-b border-white/10 bg-[#181818]">
          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Image
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Title
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Category
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {gallery.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-16 text-center text-gray-500"
              >
                No images added yet.
              </td>
            </tr>
          ) : (
            gallery.map((image) => (
              <tr
                key={image.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                {/* Thumbnail */}
                <td className="px-6 py-5">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="h-16 w-24 rounded-lg object-cover border border-white/10"
                  />
                </td>

                {/* Title */}
                <td className="px-6 py-5 text-white font-medium">
                  {image.title}
                </td>

                {/* Category */}
                <td className="px-6 py-5">
                  <span className="rounded-full bg-purple-600/20 px-3 py-1 text-sm text-purple-300">
                    {image.category}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3">

                    <button
                      onClick={() => onEdit(image)}
                      className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(image.id)}
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
  );
}

export default GalleryTable;