import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Logging middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/create-checkout-session', (req, res) => {
  try {
    console.log('Received request');
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    console.log('Stripe key exists:', !!process.env.STRIPE_SECRET_KEY);

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is missing');
    }

    res.json({ test: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5174;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});