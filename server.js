const express =require('express');
const mongoose = require('mongoose');
const { PORT, DB_URL } = require('./src/configs/config');



const app=express()

mongoose.connect(DB_URL).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT,()=>{
    console.log
    (`server is running at port 3000`)
})