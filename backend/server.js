import express from 'express';
import dotenv from 'dotenv';    
import connectDB from './config/connectionDb.js';
import router from './routes/recipe.js';
import user from './routes/user.js';
import cors from 'cors';
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT ;
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
}));
app.use(express.json());
app.use('/recipe', router);
app.use('/',user);




app.listen(PORT, console.log(`Server running on PORT ${PORT}`));