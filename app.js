// root_server.js
const express = require('express');
const session = require('express-session');

const app = express();
const sessionOptions = {
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));

// Route to register Local Server
app.post('/register', (req, res) => {
    const { username, ip } = req.body;
    req.session[username] = ip;
    res.json({ message: 'Local Server registered successfully' });
});

// Route to initiate connection and get details
app.get('/initiate-connection', (req, res) => {
    const { username } = req.query;
    const localServerIp = req.session[username];
    res.json({ rootServerIp: req.headers['x-real-ip'], localServerIp });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Root Server is running on port ${port}`);
});
