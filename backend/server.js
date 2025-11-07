import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', checkoutRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'VibeCart API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to VibeCart API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      checkout: '/api/checkout',
      orders: '/api/orders',
      health: '/api/health'
    },
    documentation: 'https://github.com/yourusername/vibecart'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
                     
        🛒 VibeCart API Server 🛒                                   
           
    Status: ✅ Running                                             
    Port: ${PORT}                                                   
    Environment: ${process.env.NODE_ENV || 'development'}          
    Database: MongoDB                                               

  
  🚀 Server ready at http://localhost:${PORT}
  📚 API Docs at http://localhost:${PORT}
  `);
});

export default app;