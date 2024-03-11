const express =require('express');
const mongoose = require('mongoose');
const { PORT, DB_URL } = require('./src/configs/config');
const authRoutes = require('./src/routes/authRoutes');
const bodyParser = require('body-parser');




const app=express()
app.use(bodyParser.json());

mongoose.connect(DB_URL).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));


authRoutes(app);

app.listen(PORT,()=>{
    console.log
    (`server is running at port ${PORT}`)
})
