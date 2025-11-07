import Order from '../models/Order.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

// @desc    Process checkout and create order
// @route   POST /api/checkout
// @access  Public
export const processCheckout = async (req, res, next) => {
  try {
    const { sessionId, customerInfo } = req.body;
    
    // Validate required fields
    if (!sessionId || !customerInfo) {
      const error = new Error('Session ID and customer information are required');
      error.status = 400;
      throw error;
    }
    
    const { name, email, address } = customerInfo;
    
    if (!name || !email || !address) {
      const error = new Error('Name, email, and address are required');
      error.status = 400;
      throw error;
    }
    
    // Get cart items
    const cartItems = await CartItem.find({ sessionId }).populate('product');
    
    if (cartItems.length === 0) {
      const error = new Error('Cart is empty');
      error.status = 400;
      throw error;
    }
    
    // Verify stock availability for all items
    for (const item of cartItems) {
      if (!item.product.isAvailable(item.quantity)) {
        const error = new Error(`Insufficient stock for ${item.product.name}`);
        error.status = 400;
        error.product = item.product.name;
        error.available = item.product.stock;
        error.requested = item.quantity;
        throw error;
      }
    }
    
    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0
    );
    
    // Create order items
    const orderItems = cartItems.map(item => ({
      product: item.product._id,
      productName: item.product.name,
      productImage: item.product.image,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.quantity * item.price
    }));
    
    // Create order
    const order = await Order.create({
      sessionId,
      customerInfo: {
        name,
        email,
        address,
        phone: customerInfo.phone || ''
      },
      items: orderItems,
      totalAmount,
      status: 'pending',
      paymentStatus: 'completed',
      paymentMethod: customerInfo.paymentMethod || 'card',
      notes: customerInfo.notes || ''
    });
    
    // Update product stock (uncomment if you want inventory tracking)
    // for (const item of cartItems) {
    //   await Product.findByIdAndUpdate(item.product._id, {
    //     $inc: { stock: -item.quantity }
    //   });
    // }
    
    // Clear cart after successful checkout
    await CartItem.clearCart(sessionId);
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order.orderId,
      total: parseFloat(totalAmount.toFixed(2)),
      timestamp: order.createdAt,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order history
// @route   GET /api/orders/:sessionId
// @access  Public
export const getOrderHistory = async (req, res, next) => {
  try {
    const orders = await Order.getOrdersBySession(req.params.sessionId);
    const stats = await Order.getOrderStats(req.params.sessionId);
    
    res.json({
      success: true,
      count: orders.length,
      stats,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by order ID
// @route   GET /api/orders/details/:orderId
// @access  Public
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate('items.product');
    
    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      throw error;
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};