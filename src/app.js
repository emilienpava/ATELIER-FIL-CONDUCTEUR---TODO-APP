const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Servir les fichiers statiques de public/
app.use(express.static(path.join(__dirname, '../public')));

// Routes API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK'
  });
});

// Rediriger la racine vers index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Gestion 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    method: req.method
  });
});

module.exports = app;
