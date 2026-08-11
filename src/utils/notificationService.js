// src/utils/notificationService.js

export const sendNotification = (title, description, type = "info") => {
  // 1. Purani notifications nikaalo (LocalStorage se)
  const existing = JSON.parse(localStorage.getItem("globalNotifications")) || [];
  
  // 2. Nayi notification create karo
  const newNotif = {
    id: Date.now(),
    title: title,
    description: description,
    time: new Date().toLocaleTimeString(),
    type: type, // "project", "contact", "order", "info"
    read: false
  };

  // 3. LocalStorage mein save karo
  localStorage.setItem("globalNotifications", JSON.stringify([newNotif, ...existing]));

  // 🟢🔔 4. Direct internet se "Bell Ring" sound bajao (Bina koi MP3 download kiye)
  try {
    // HTML5 Audio Object use kar rahe hain
    const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
    audio.volume = 0.4; // Volume 40% (Soft aur Premium)
    audio.play().catch((err) => {
      // Agar browser auto-play block kare to console mein error dikhega par notification kaam karega
      console.log("⚠️ Sound block hui (Browser policy):", err.message);
    });
  } catch (error) {
    console.log("❌ Audio play error:", error);
  }

  // 5. Topbar ko update karne ke liye event fire karo
  window.dispatchEvent(new Event("globalNotificationUpdated"));
};