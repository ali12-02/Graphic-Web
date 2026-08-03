import { Pencil, Trash2 } from "lucide-react";

function MessageTable({
  messages,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
      <table className="w-full">
        <thead className="border-b border-white/10 bg-white/5">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Message
            </th>

            <th className="w-48 px-6 py-4 text-center text-sm font-semibold text-gray-300">
              Created
            </th>

            <th className="w-44 px-6 py-4 text-center text-sm font-semibold text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="py-14 text-center text-gray-500"
              >
                No featured messages found.
              </td>
            </tr>
          ) : (
            messages.map((message) => (
              <tr
                key={message.id}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                <td className="px-6 py-5 text-white">
                  {message.text}
                </td>

                <td className="px-6 py-5 text-center text-gray-400">
                  {new Date(
                    message.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        onEdit(message)
                      }
                      className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(message.id)
                      }
                      className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
                    >
                      <Trash2 size={17} />
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

export default MessageTable;