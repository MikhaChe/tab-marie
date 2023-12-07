import express from 'express';
import cors from 'cors';
import router from './router.js';
// import corsMiddleWare from './middleware/cors.middleware.js';

const PORT = 5000;


const app = express();

app.use(cors());
// app.use(corsMiddleWare);
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => console.log('The server has been started on port: ' + PORT));

const getRow = async () => {
  
}







