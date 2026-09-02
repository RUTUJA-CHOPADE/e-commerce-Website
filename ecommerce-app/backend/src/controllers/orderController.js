const { Order, OrderItem, Cart, CartItem, Product, Payment, sequelize } = require('../models');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Shipping address is required' });
    }

    // 1. Get User's Cart
    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      transaction
    });

    if (!cart) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // 2. Get Cart Items with Products
    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product }],
      transaction
    });

    if (cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // 3. Verify stock, calculate prices
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of cartItems) {
      if (item.Product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ 
          success: false, 
          message: `Not enough stock for ${item.Product.name}` 
        });
      }

      subtotal += item.quantity * parseFloat(item.Product.price);

      orderItemsData.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.Product.price // Store historical price
      });
    }

    // 4. Calculate Totals
    const tax = subtotal * 0.10;
    const shipping = 0;
    const totalAmount = subtotal + tax + shipping;

    // 5. Create Order
    const order = await Order.create({
      user_id: req.user.id,
      total_amount: totalAmount,
      status: 'Pending',
      shipping_address: JSON.stringify(shippingAddress)
    }, { transaction });

    // 6. Create Order Items and reduce stock
    for (const item of orderItemsData) {
      item.order_id = order.id;
      await OrderItem.create(item, { transaction });

      // Reduce product stock
      const product = await Product.findByPk(item.product_id, { transaction });
      product.stock -= item.quantity;
      await product.save({ transaction });
    }

    // We don't clear cart here yet. We clear it AFTER payment success.

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create Order Error:', error);
    res.status(500).json({ success: false, message: 'Server error creating order' });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        { 
          model: OrderItem,
          include: [{ model: Product, attributes: ['name', 'image_url'] }]
        },
        { model: Payment }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get Orders Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [
        { 
          model: OrderItem,
          include: [{ model: Product, attributes: ['name', 'image_url'] }]
        },
        { model: Payment }
      ]
    });

    if (order) {
      res.status(200).json({
        success: true,
        data: order
      });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    console.error('Get Order Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching order' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};
