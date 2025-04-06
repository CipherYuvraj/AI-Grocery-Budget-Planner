const express = require('express');
const cors = require('cors');
const app = express();
const aiRoutes = require('./routes/ai');
const PORT = 5000;

app.use(cors());
app.use(express.json()); // ✅ This line is CRUCIAL for reading JSON body

app.use('/api', aiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is Running on http://localhost:${PORT}`);
});
