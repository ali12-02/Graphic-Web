import { useEffect, useState } from "react";
import { X } from "lucide-react";

function AddMessageModal({
  isOpen,
  onClose,
  onSave,
  editMessage,
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editMessage) {
      setText(editMessage.text || "");
    } else {
      setText("");
    }
  }, [editMessage]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSave({
      text,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111] p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editMessage ? "Edit Message" : "Add Message"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Featured Message
            </label>

            <textarea
              rows={5}
              maxLength={100}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your featured message..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-[#181818] px-5 py-4 text-white outline-none transition focus:border-purple-600"
            />

            <p className="mt-2 text-right text-xs text-gray-500">
              {text.length}/100
            </p>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3 text-gray-300 transition hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              {editMessage ? "Update Message" : "Save Message"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddMessageModal;