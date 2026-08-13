// src/utils/cloudSync.js

// 🟢 APNI VALUES YAHAN SET HO CHUKI HAIN
const GITHUB_USERNAME = "ali12-02";                    
const GITHUB_TOKEN = "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";  
const GIST_ID = "09d530bdcdd6f17d144c058e1f8cfc1";     

// Data Upload karne ka function
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

// Data Download karne ka function
export const downloadDataFromCloud = async () => {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    if (!response.ok) return null;

    const gistData = await response.json();
    // Extract content from the gist
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