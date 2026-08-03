import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../layout/DashboardLayout";

import AddMessageModal from "../components/AddMessageModal";
import MessageTable from "../components/MessageTable";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);

  // Load Messages
  const loadMessages = () => {
    const saved =
      JSON.parse(localStorage.getItem("featuredMessages")) || [];

    setMessages(saved);
  };

  useEffect(() => {
    loadMessages();

    window.addEventListener(
      "messagesUpdated",
      loadMessages
    );

    return () => {
      window.removeEventListener(
        "messagesUpdated",
        loadMessages
      );
    };
  }, []);

  // Save / Update
  const handleSave = (message) => {
    let updated = [];

    if (editingMessage) {
      updated = messages.map((item) =>
        item.id === editingMessage.id
          ? {
              ...item,
              ...message,
              id: editingMessage.id,
            }
          : item
      );
    } else {
      updated = [
        ...messages,
        {
          id: Date.now(),
          text: message.text,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    setMessages(updated);

    localStorage.setItem(
      "featuredMessages",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("messagesUpdated")
    );

    setEditingMessage(null);
    setIsModalOpen(false);
  };
    // Delete
  const handleDelete = (id) => {
    const updated = messages.filter(
      (item) => item.id !== id
    );

    setMessages(updated);

    localStorage.setItem(
      "featuredMessages",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("messagesUpdated")
    );
  };

  // Edit
  const handleEdit = (message) => {
    setEditingMessage(message);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setEditingMessage(null);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Featured Messages
          </h1>

          <p className="mt-2 text-gray-400">
            Manage scrolling messages for your website.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMessage(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Add Message
        </button>
      </div>

      <MessageTable
        messages={messages}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
            <AddMessageModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        editMessage={editingMessage}
      />
    </DashboardLayout>
  );
}

export default Messages;