import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import checkoutRoutes from './api/create-checkout-session.js';

dotenv.config();

const app = express();

// Webhook endpoint must come before express.json() middleware
app.post('/api/webhooks/stripe', 
  express.raw({type: 'application/json'}),
  // your webhook handler
);

// Regular middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', checkoutRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});