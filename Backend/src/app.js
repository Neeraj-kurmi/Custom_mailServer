const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const path= require("path")

const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
connectDB();

const dirname=path.resolve()

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

app.use(express.static(path.join(dirname,"/Frontend/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirname,"Frontend","dist","index.html"))
})


module.exports = app;
