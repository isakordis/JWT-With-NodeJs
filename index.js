const express=require('express');
const authRoute=require('./routes/auth');
const app=express();
const postRoute=require('./routes/posts');
const mongoose=require('mongoose');
const dotenv =require('dotenv');

dotenv.config();

//Connect MongoDB 
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log('DB Connect Success'));

//Middleware
app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,()=>console.log('Started Server'));