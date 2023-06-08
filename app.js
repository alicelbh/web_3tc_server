const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/api/routes');
const cors = require('cors');

const app = express();

connectDB();
app.use(cors({ origin: true, credentials: true }));
app.use('/api', routes)
app.get('/', (req, res) => res.send("Ohe"));

app.use(express.json())

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
