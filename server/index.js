const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
app.use(cors());

app.use(bodyParser.json());

const usersFile = path.join(__dirname, 'users.json');

// Initialize users file with default user (username: 'user', password: 'pass')
const initializeUsersFile = () => {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify({ user: 'pass' })); // Plain text password
    }
};
initializeUsersFile();

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        const users = JSON.parse(fs.readFileSync(usersFile));

        if (users[username] && users[username] === password) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error reading users file:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Home route (protected)
app.get('/home', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});