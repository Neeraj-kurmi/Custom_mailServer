const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

module.exports = app;
