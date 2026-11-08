
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Receive logs from C++
app.post('/api/logs', (req, res) => {
    if(req.body.log) {
        fs.appendFileSync('received_logs.txt', req.body.log + '\n');
    }
    res.json({ success: true });
});

// Send logs to HTML Website
app.get('/api/logs', (req, res) => {
    if (!fs.existsSync('received_logs.txt')) fs.writeFileSync('received_logs.txt', '');
    res.json({ logs: fs.readFileSync('received_logs.txt', 'utf8').split('\n').filter(Boolean) });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
