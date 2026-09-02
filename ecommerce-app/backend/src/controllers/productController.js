const { Op } = require('sequelize');
const { Product, Category } = require('../models');

// @desc    Get all products (with pagination, filtering, search)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;

    let whereClause = {};
    let categoryWhere = {};

    // 1. Search (Name, Description, or Category Name)
    if (req.query.search) {
      const searchTerm = `%${req.query.search}%`;
      whereClause[Op.or] = [
        { name: { [Op.like]: searchTerm } },
        { description: { [Op.like]: searchTerm } }
      ];
    }

    // 2. Category / Gender Filter
    if (req.query.category) {
      const catParam = req.query.category.trim().toLowerCase();
      if (catParam.includes('women')) {
        categoryWhere.name = {
          [Op.or]: [
            { [Op.like]: "Women's%" },
            'Women'
          ]
        };
      } else if (catParam.includes('men')) {
        categoryWhere.name = {
          [Op.or]: [
            { [Op.like]: "Men's%" },
            'Men'
          ]
        };
      } else {
        categoryWhere.name = req.query.category.trim();
      }
    }

    // 3. Price Filter (minPrice & maxPrice)
    if (req.query.minPrice || req.query.maxPrice) {
      whereClause.price = {};
      if (req.query.minPrice) whereClause.price[Op.gte] = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) whereClause.price[Op.lte] = parseFloat(req.query.maxPrice);
    }

    // 4. Size Filter
    if (req.query.size) {
      whereClause.size = { [Op.like]: `%${req.query.size}%` };
    }

    // 5. Color Filter
    if (req.query.color) {
      whereClause.color = { [Op.like]: `%${req.query.color}%` };
    }

    // 6. Rating Filter
    if (req.query.rating) {
      whereClause.rating = { [Op.gte]: parseFloat(req.query.rating) };
    }

    // Include Category Options
    const includeOptions = [{
      model: Category,
      attributes: ['id', 'name'],
      where: Object.keys(categoryWhere).length > 0 ? categoryWhere : undefined,
      required: Object.keys(categoryWhere).length > 0
    }];

    // 7. Sorting Options
    let orderOption = [['created_at', 'DESC']]; // Default newest
    if (req.query.sort) {
      const sortParam = req.query.sort;
      if (sortParam === 'price_asc') {
        orderOption = [['price', 'ASC']];
      } else if (sortParam === 'price_desc') {
        orderOption = [['price', 'DESC']];
      } else if (sortParam === 'rating') {
        orderOption = [['rating', 'DESC']];
      } else if (sortParam === 'newest') {
        orderOption = [['created_at', 'DESC']];
      } else if (sortParam === 'popular') {
        orderOption = [['review_count', 'DESC']];
      }
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      limit,
      offset,
      order: orderOption
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    
    if (product) {
      res.status(200).json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error('Get Product Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching product' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { category_id, name, description, price, stock, size, color, image_url } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
    }

    const product = await Product.create({
      category_id,
      name,
      description: description || '',
      price: parseFloat(price),
      stock: parseInt(stock) || 10,
      size: size || 'Standard',
      color: color || 'Default',
      image_url: image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      rating: 5.0,
      review_count: 1
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ success: false, message: 'Server error creating product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct
};
