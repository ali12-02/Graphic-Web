// src/utils/cloudSync.js

const GITHUB_USERNAME = "ali12-02";
// 🟢 Token ab .env file se uthayega
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; 
const GIST_ID = "09d530bdcdd6f17d144c058e1f8cfc1";

export const uploadDataToCloud = async (data) => {
  try {
    const response = await fetch(`https://api.github.com/gists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: "Graphic Web CMS Sync Data",
        public: false,
        files: {
          [GIST_ID]: {
            content: JSON.stringify(data, null, 2)
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub Error: ${errorText}`);
    }

    console.log("✅ Data synced to GitHub Cloud!");
    return true;
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    return false;
  }
};

export const downloadDataFromCloud = async () => {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    if (!response.ok) return null;

    const gistData = await response.json();
    if (gistData.files && gistData.files[GIST_ID]) {
      const rawContent = gistData.files[GIST_ID].content;
      return JSON.parse(rawContent);
    }
    return null;
  } catch (error) {
    console.error("❌ Download failed:", error.message);
    return null;
  }
};