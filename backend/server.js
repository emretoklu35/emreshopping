const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 16666;

app.use(cors());
app.use(express.json());

// 🔥 Görselleri public klasörden servis et
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 🔌 Veritabanı bağlantısı
const db = new Database("./data/database.db", { verbose: console.log });

// Base URL for images - will use relative URLs in development and absolute in production
const getBaseUrl = (req) => {
  return process.env.NODE_ENV === 'production' 
    ? `${req.protocol}://${req.get('host')}` 
    : `http://localhost:${PORT}`;
};

// 🔁 Kampanyalar API
app.get("/api/campaigns", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM campaigns").all();
    const baseUrl = getBaseUrl(req);
    
    const updatedRows = rows.map((campaign) => ({
      ...campaign,
      image: `${baseUrl}/images/${campaign.image}`
    }));

    res.json(updatedRows);
  } catch (err) {
    console.error("Veritabanı hatası:", err.message);
    return res.status(500).json({ error: err.message });
  }
});


// 🔁 Slider API
app.get("/api/slider", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM slider").all();
    const baseUrl = getBaseUrl(req);
    
    const updatedRows = rows.map((item) => ({
      ...item,
      image: `${baseUrl}/images/sliders/${item.image}`
    }));
    res.json(updatedRows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 🔁 Elektronik API
app.get("/api/electronics", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM electronics").all();
    const baseUrl = getBaseUrl(req);
    
    const updatedRows = rows.map((item) => ({
      ...item,
      image: `${baseUrl}${item.url}`
    }));

    res.json(updatedRows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 🔁 Öneriler API
app.get("/api/recommendations", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM recommendations").all();
    const baseUrl = getBaseUrl(req);
    
    const updatedRows = rows.map((item) => ({
      ...item,
      image: `${baseUrl}${item.url}`
    }));
    res.json(updatedRows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 🎯 Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});