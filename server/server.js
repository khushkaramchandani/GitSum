require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_API = 'https://api.github.com';

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to build headers with the server's GitHub PAT
const getHeaders = () => {
  const token = process.env.GITHUB_TOKEN;
  console.log(`[DEBUG] Read token length: ${token ? token.length : 0}`);
  return token ? { Authorization: `token ${token}` } : {};
};

// --- Proxy Routes for GitHub API ---

// Health check / Root route
app.get('/', (req, res) => {
  res.json({ message: 'GitSum Proxy Server is running!' });
});

// Get User Profile
app.get('/api/github/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get User Repositories
app.get('/api/github/users/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const { per_page, sort, direction } = req.query;
    
    // Pass query parameters to the GitHub API request
    const params = new URLSearchParams();
    if (per_page) params.append('per_page', per_page);
    if (sort) params.append('sort', sort);
    if (direction) params.append('direction', direction);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos${qs}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Get User Events
app.get('/api/github/users/:username/events', async (req, res) => {
  try {
    const { username } = req.params;
    const { per_page } = req.query;

    const qs = per_page ? `?per_page=${per_page}` : '';
    const response = await axios.get(`${GITHUB_API}/users/${username}/events${qs}`, { headers: getHeaders() });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
