import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
export const addToCart = async (req, res, next) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body;
    
    if (!sessionId || !productId) {
      const error = new Error('Session ID and Product ID are required');
      error.status = 400;
      throw error;
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    
    // Check stock availability
    if (!product.isAvailable(quantity)) {
      const error = new Error('Insufficient stock');
      error.status = 400;
      error.available = product.stock;
      throw error;
    }
    
    // Check if item already in cart
    let cartItem = await CartItem.findOne({ sessionId, product: productId });
    
    if (cartItem) {
      // Update quantity
      const newQuantity = cartItem.quantity + quantity;
      
      if (!product.isAvailable(newQuantity)) {
        const error = new Error('Cannot add more items. Insufficient stock');
        error.status = 400;
        error.available = product.stock;
        error.inCart = cartItem.quantity;
        throw error;
      }
      
      cartItem.quantity = newQuantity;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = await CartItem.create({
        sessionId,
        product: productId,
        quantity,
        price: product.price
      });
    }
    
    // Populate product details
    await cartItem.populate('product');
    
    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: cartItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get cart items
// @route   GET /api/cart/:sessionId
// @access  Public
export const getCart = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const cartItems = await CartItem.find({ sessionId }).populate('product');
    
    const total = await CartItem.getCartTotal(sessionId);
    const itemCount = await CartItem.getCartCount(sessionId);
    
    res.json({
      success: true,
      count: cartItems.length,
      itemCount,
      total: parseFloat(total.toFixed(2)),
      data: cartItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      const error = new Error('Invalid quantity');
      error.status = 400;
      throw error;
    }
    
    const cartItem = await CartItem.findById(req.params.id).populate('product');
    
    if (!cartItem) {
      const error = new Error('Cart item not found');
      error.status = 404;
      throw error;
    }
    
    // Check stock availability
    if (!cartItem.product.isAvailable(quantity)) {
      const error = new Error('Insufficient stock');
      error.status = 400;
      error.available = cartItem.product.stock;
      throw error;
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();
    
    res.json({
      success: true,
      message: 'Cart item updated',
      data: cartItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
export const removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    
    if (!cartItem) {
      const error = new Error('Cart item not found');
      error.status = 404;
      throw error;
    }
    
    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/session/:sessionId
// @access  Public
export const clearCart = async (req, res, next) => {
  try {
    await CartItem.clearCart(req.params.sessionId);
    
    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    next(error);
  }
};