const { Cart, CartItem, Product } = require('../models');

// Helper function to get or create cart for a user
const getOrCreateCart = async (userId) => {
  let [cart] = await Cart.findOrCreate({
    where: { user_id: userId }
  });
  return cart;
};

// Helper function to calculate totals
const calculateTotals = async (cartId) => {
  const items = await CartItem.findAll({
    where: { cart_id: cartId },
    include: [{ model: Product, attributes: ['price', 'stock'] }]
  });

  let subtotal = 0;
  items.forEach(item => {
    subtotal += item.quantity * parseFloat(item.Product.price);
  });

  const tax = subtotal * 0.10;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    
    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ 
        model: Product,
        attributes: ['id', 'name', 'price', 'image_url', 'stock', 'size', 'color'] 
      }]
    });

    const totals = await calculateTotals(cart.id);

    res.status(200).json({
      success: true,
      data: {
        cartId: cart.id,
        items: cartItems,
        ...totals
      }
    });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching cart' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough stock available' });
    }

    const cart = await getOrCreateCart(req.user.id);

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });

    if (existingItem) {
      // Increase quantity
      const newQuantity = existingItem.quantity + parseInt(quantity);
      if (newQuantity > product.stock) {
        return res.status(400).json({ success: false, message: 'Requested quantity exceeds stock' });
      }
      
      existingItem.quantity = newQuantity;
      await existingItem.save();
    } else {
      // Create new cart item
      await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        quantity: parseInt(quantity)
      });
    }

    // Return updated cart
    const updatedCart = await getCart(req, res); // This will handle the res.json
    return; // Stop execution here as getCart already sent the response
  } catch (error) {
    console.error('Add To Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error adding to cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    const cart = await getOrCreateCart(req.user.id);
    const cartItem = await CartItem.findOne({
      where: { id: itemId, cart_id: cart.id },
      include: [{ model: Product, attributes: ['stock'] }]
    });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in your cart' });
    }

    if (quantity > cartItem.Product.stock) {
      return res.status(400).json({ success: false, message: 'Requested quantity exceeds stock' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    await getCart(req, res);
  } catch (error) {
    console.error('Update Cart Item Error:', error);
    res.status(500).json({ success: false, message: 'Server error updating cart item' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await getOrCreateCart(req.user.id);
    
    const cartItem = await CartItem.findOne({
      where: { id: itemId, cart_id: cart.id }
    });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in your cart' });
    }

    await cartItem.destroy();
    
    await getCart(req, res);
  } catch (error) {
    console.error('Remove Cart Item Error:', error);
    res.status(500).json({ success: false, message: 'Server error removing cart item' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    
    await CartItem.destroy({
      where: { cart_id: cart.id }
    });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error clearing cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
