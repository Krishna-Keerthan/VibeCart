import Product from '../models/Product.js';

// @desc    Get all products with optional filtering
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res, next) => {
  try {
    const { category, featured, minPrice, maxPrice, sort, search } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort options
    let sortOptions = {};
    if (sort === 'price-asc') sortOptions.price = 1;
    else if (sort === 'price-desc') sortOptions.price = -1;
    else if (sort === 'name') sortOptions.name = 1;
    else if (sort === 'rating') sortOptions.rating = -1;
    else sortOptions.createdAt = -1;
    
    const products = await Product.find(query).sort(sortOptions);
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.findByCategory(req.params.category);
    
    res.json({
      success: true,
      category: req.params.category,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search products
// @route   GET /api/products/search/:query
// @access  Public
export const searchProducts = async (req, res, next) => {
  try {
    const searchQuery = req.params.query;
    
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { tags: { $in: [new RegExp(searchQuery, 'i')] } },
        { brand: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    
    res.json({
      success: true,
      query: searchQuery,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured/list
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const products = await Product.find({ featured: true }).limit(limit);
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories
// @route   GET /api/products/categories/list
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};