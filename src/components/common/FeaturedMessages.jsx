import { useEffect, useState } from "react";

function FeaturedMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = () => {
      const saved =
        JSON.parse(localStorage.getItem("featuredMessages")) || [];

      setMessages(saved);
    };

    loadMessages();

    window.addEventListener("messagesUpdated", loadMessages);

    return () => {
      window.removeEventListener(
        "messagesUpdated",
        loadMessages
      );
    };
  }, []);

  if (messages.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#090909] py-5">
      <div className="flex whitespace-nowrap">

        <div className="animate-[marquee_30s_linear_infinite] flex items-center">

          {[...messages, ...messages, ...messages].map(
            (item, index) => (
              <div
                key={index}
                className="mx-10 flex items-center"
              >
                <span className="text-xl text-violet-500">
                  ✦
                </span>

                <span className="ml-4 text-lg font-medium tracking-wide text-white">
                  {item.text}
                </span>
              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
}

export default FeaturedMessages;