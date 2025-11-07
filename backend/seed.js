import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

const products = [
  {
    name: 'MacBook Pro 14"',
    description: 'Supercharged by M3 Pro or M3 Max chip. Up to 18 hours of battery life. Stunning Liquid Retina XDR display with 3024x1964 resolution.',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    category: 'Electronics',
    stock: 25,
    brand: 'Apple',
    rating: 4.8,
    reviews: 342,
    featured: true,
    tags: ['laptop', 'macbook', 'apple', 'professional', 'M3', 'creator']
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with premium sound quality. 30-hour battery life with quick charging. Enhanced call quality with 4 beamforming microphones.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    category: 'Electronics',
    stock: 50,
    brand: 'Sony',
    rating: 4.9,
    reviews: 1205,
    featured: true,
    tags: ['headphones', 'wireless', 'noise-cancelling', 'audio', 'premium']
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Titanium design. A17 Pro chip with 6-core GPU. Action button for customizable shortcuts. Advanced camera system with 5x optical zoom.',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500',
    category: 'Electronics',
    stock: 40,
    brand: 'Apple',
    rating: 4.7,
    reviews: 892,
    featured: true,
    tags: ['smartphone', 'iphone', 'apple', '5g', 'titanium', 'pro']
  },
  {
    name: 'Nike Air Max 270',
    description: 'Featuring Nike\'s biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks. Breathable mesh upper with modern style.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    stock: 100,
    brand: 'Nike',
    rating: 4.6,
    reviews: 567,
    featured: false,
    tags: ['sneakers', 'shoes', 'athletic', 'comfort', 'running', 'casual']
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Powerful health features. Innovative safety features. The biggest, brightest Always-On Retina display. Advanced fitness tracking and ECG app.',
    price: 429.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    category: 'Electronics',
    stock: 60,
    brand: 'Apple',
    rating: 4.8,
    reviews: 743,
    featured: true,
    tags: ['smartwatch', 'apple', 'fitness', 'health', 'wearable', 'tracker']
  },
  {
    name: 'Herschel Supply Co. Backpack',
    description: 'Classic design with modern functionality. Padded laptop sleeve fits 15" devices. Organizer pocket and signature striped lining. Water-resistant.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Fashion',
    stock: 75,
    brand: 'Herschel',
    rating: 4.5,
    reviews: 423,
    featured: false,
    tags: ['backpack', 'travel', 'school', 'laptop', 'fashion', 'everyday']
  },
  {
    name: 'Nespresso Vertuo Next',
    description: 'Premium coffee and espresso maker. One-touch brewing with 5 cup sizes. Centrifusion technology extracts every drop of flavor. Eco-friendly design.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home & Living',
    stock: 45,
    brand: 'Nespresso',
    rating: 4.4,
    reviews: 289,
    featured: false,
    tags: ['coffee', 'espresso', 'kitchen', 'appliance', 'barista', 'morning']
  },
  {
    name: 'Philips Hue Smart Bulb Starter Kit',
    description: 'Set the mood with 16 million colors. Control with voice, app, or smart home devices. Includes bridge and 4 color bulbs. Energy efficient LED technology.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    category: 'Home & Living',
    stock: 80,
    brand: 'Philips',
    rating: 4.7,
    reviews: 512,
    featured: true,
    tags: ['smart-home', 'lighting', 'led', 'alexa', 'google-home', 'rgb']
  },
  {
    name: 'Atomic Habits by James Clear',
    description: 'The #1 New York Times bestseller. Tiny changes, remarkable results. Transform your habits and reach your goals with proven strategies.',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'Books',
    stock: 150,
    brand: 'Avery',
    rating: 4.9,
    reviews: 18456,
    featured: true,
    tags: ['self-help', 'productivity', 'habits', 'bestseller', 'motivation', 'success']
  },
  {
    name: 'iPad Air 11"',
    description: 'Serious performance in a thin and light design. M2 chip delivers powerful performance. Supports Apple Pencil Pro. Stunning Liquid Retina display.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    category: 'Electronics',
    stock: 35,
    brand: 'Apple',
    rating: 4.7,
    reviews: 634,
    featured: true,
    tags: ['tablet', 'ipad', 'apple', 'drawing', 'creative', 'portable']
  },
  {
    name: 'Samsung 55" QLED 4K TV',
    description: 'Quantum Dot technology delivers stunning picture quality. 4K resolution with HDR support. Smart TV with built-in streaming apps. Gaming mode with 120Hz.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
    category: 'Electronics',
    stock: 20,
    brand: 'Samsung',
    rating: 4.6,
    reviews: 445,
    featured: false,
    tags: ['tv', 'television', '4k', 'smart-tv', 'entertainment', 'gaming']
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original jean since 1873. Straight leg fit with button fly. Premium denim construction. Classic American style that never goes out of fashion.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272454315-7f6fabf28f80?w=500',
    category: 'Fashion',
    stock: 120,
    brand: 'Levi\'s',
    rating: 4.5,
    reviews: 789,
    featured: false,
    tags: ['jeans', 'denim', 'pants', 'classic', 'casual', 'fashion']
  }
];

const seedDatabase = async () => {
  try {
    console.log('\n🌱 Starting database seeding process...\n');
    
    // Connect to MongoDB
    await connectDB();
    
    console.log('🗑️  Clearing existing products...');
    const deleteResult = await Product.deleteMany();
    console.log(`   Deleted ${deleteResult.deletedCount} existing products\n`);
    
    console.log('📦 Inserting new products...');
    const createdProducts = await Product.insertMany(products);
    
    console.log(`✅ Successfully seeded ${createdProducts.length} products!\n`);
    console.log('📋 Products added:');
    console.log('━'.repeat(70));
    
    createdProducts.forEach((product, index) => {
      const star = product.featured ? '⭐' : '  ';
      console.log(
        `${star} ${(index + 1).toString().padStart(2)}. ${product.name.padEnd(30)} ${product.price.toString().padStart(7)} (${product.category})`
      );
    });
    
    console.log('━'.repeat(70));
    console.log('\n📊 Seeding Statistics:');
    console.log(`   Total Products: ${createdProducts.length}`);
    console.log(`   Featured Products: ${createdProducts.filter(p => p.featured).length}`);
    console.log(`   Categories: ${[...new Set(createdProducts.map(p => p.category))].join(', ')}`);
    console.log(`   Total Stock: ${createdProducts.reduce((sum, p) => sum + p.stock, 0)} items`);
    console.log(`   Total Value: ${createdProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}`);
    
    console.log('\n🎉 Database seeding completed successfully!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();