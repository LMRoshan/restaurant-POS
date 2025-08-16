import express from 'express';
const app = express();
const port = 7000;
import connectDB from './database.js';
import Authroutes from './routes/Auth.js';
import Productroutes from './routes/Product.js';
import cors from 'cors'; 

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'authToken']  
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', Authroutes);
app.use('/api/product', Productroutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
