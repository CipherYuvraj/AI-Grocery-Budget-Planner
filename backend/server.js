const express = require('express');
const axios  = require('axios');
const cors = require('cors');
const aiRoutes = require('./routes/ai');
require('dotenv').config();


const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json()); // ✅ This line is CRUCIAL for reading JSON body
app.use('/api', aiRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Server is Running on http://localhost:${PORT}`);
});
