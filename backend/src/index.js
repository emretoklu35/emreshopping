const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// Express uygulamasını başlat
const app = express();

// Middleware'ler
app.use(cors(config.corsOptions));
app.use(express.json());

// Statik dosyaları servis et
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// API rotaları
app.use('/api', apiRoutes);

// 404 hatası
app.use(notFound);

// Hata işleme
app.use(errorHandler);

// Sunucuyu başlat
app.listen(config.port, () => {
  console.log(`✅ Backend server is running at http://localhost:${config.port}`);
}); 