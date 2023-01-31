const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup

const PORT = Number(process.env.PORT) || 6000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');

// Methods

app.post('/login', (req, res) => {});
app.post('/logout', (req, res) => {});
app.get('/secret', (req, res) => {});

// Listener

app.listen(PORT, () => {
  console.log(`Express app listening on http://localhost:${PORT}`);
});
