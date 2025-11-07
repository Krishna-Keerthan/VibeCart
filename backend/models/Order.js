import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    address: {
      type: String,
      required: [true, 'Delivery address is required'],
      trim: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productImage: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'cash', 'upi'],
    default: 'card'
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Generate unique order ID before validation
orderSchema.pre('validate', function(next) {
  if (!this.orderId) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.orderId = `VC-${timestamp}-${random}`;
  }
  next();
});

// Virtual for formatted order date
orderSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for item count
orderSchema.virtual('itemCount').get(function() {
  return this.items.reduce((count, item) => count + item.quantity, 0);
});

// Ensure virtuals are included in JSON
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

// Static method to get orders by session
orderSchema.statics.getOrdersBySession = function(sessionId) {
  return this.find({ sessionId }).sort({ createdAt: -1 });
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = async function(sessionId) {
  const orders = await this.find({ sessionId });
  return {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    averageOrderValue: orders.length > 0 
      ? orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length 
      : 0
  };
};

const Order = mongoose.model('Order', orderSchema);

export default Order;