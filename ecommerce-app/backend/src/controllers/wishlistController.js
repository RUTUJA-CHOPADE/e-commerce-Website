const { Wishlist, Product, Category } = require('../models');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { user_id: req.user.id },
      include: [{ 
        model: Product,
        include: [{ model: Category, attributes: ['name'] }]
      }]
    });

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching wishlist' });
  }
};

// @desc    Toggle item in wishlist (Add/Remove)
// @route   POST /api/wishlist/toggle
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existingItem = await Wishlist.findOne({
      where: { user_id: req.user.id, product_id: productId }
    });

    if (existingItem) {
      // Remove it
      await existingItem.destroy();
      return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist',
        isAdded: false
      });
    } else {
      // Add it
      await Wishlist.create({
        user_id: req.user.id,
        product_id: productId
      });
      return res.status(200).json({
        success: true,
        message: 'Product added to wishlist',
        isAdded: true
      });
    }
  } catch (error) {
    console.error('Toggle Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server error updating wishlist' });
  }
};

module.exports = {
  getWishlist,
  toggleWishlist
};
