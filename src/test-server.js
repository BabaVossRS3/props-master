// test-server.js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (_, res) => {
  console.log('Test endpoint hit');
  res.json({ status: 'success' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Test server running on ${PORT}`));