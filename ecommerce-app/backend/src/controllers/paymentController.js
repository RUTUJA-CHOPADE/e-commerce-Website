const { Order, Payment, Cart, CartItem, sequelize } = require('../models');

// @desc    Process mock payment
// @route   POST /api/payments
// @access  Private
const processPayment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { orderId, paymentMethod } = req.body;

    if (!orderId || !paymentMethod) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Order ID and payment method are required' });
    }

    // 1. Get Order
    const order = await Order.findOne({
      where: { id: orderId, user_id: req.user.id },
      transaction
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.status !== 'Pending') {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Order has already been processed' });
    }

    // 2. Mock Payment Processing
    // In a real app, you would integrate Stripe/PayPal here
    const payment = await Payment.create({
      order_id: order.id,
      payment_method: paymentMethod,
      amount: order.total_amount,
      status: 'SUCCESS',
      transaction_id: `MOCK_TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    }, { transaction });

    // 3. Update Order Status
    order.status = 'Confirmed';
    await order.save({ transaction });

    // 4. Clear User's Cart
    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      transaction
    });

    if (cart) {
      await CartItem.destroy({
        where: { cart_id: cart.id },
        transaction
      });
    }

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        orderId: order.id,
        transactionId: payment.transaction_id,
        status: order.status
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Payment Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing payment' });
  }
};

module.exports = {
  processPayment
};
