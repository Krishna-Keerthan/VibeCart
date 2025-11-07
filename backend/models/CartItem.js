import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: [true, 'Session ID is required'],
    index: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
}, {
  timestamps: true
});

// Compound index for sessionId and product
cartItemSchema.index({ sessionId: 1, product: 1 }, { unique: true });

// Virtual for subtotal
cartItemSchema.virtual('subtotal').get(function() {
  return this.quantity * this.price;
});

// Ensure virtuals are included in JSON
cartItemSchema.set('toJSON', { virtuals: true });
cartItemSchema.set('toObject', { virtuals: true });

// Static method to get cart total
cartItemSchema.statics.getCartTotal = async function(sessionId) {
  const items = await this.find({ sessionId });
  return items.reduce((total, item) => total + (item.quantity * item.price), 0);
};

// Static method to get cart count
cartItemSchema.statics.getCartCount = async function(sessionId) {
  const items = await this.find({ sessionId });
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Static method to clear cart
cartItemSchema.statics.clearCart = function(sessionId) {
  return this.deleteMany({ sessionId });
};

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
