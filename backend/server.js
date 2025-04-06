const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', aiRoutes);
app.get('/api/test', (req, res) => {
  res.send('Backend is working!');
});


app.listen(PORT, () => {
  console.log(`🚀 Server is Running on http://localhost:${PORT}`);
});
