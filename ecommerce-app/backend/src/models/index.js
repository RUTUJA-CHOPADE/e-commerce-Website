const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');
const Wishlist = require('./Wishlist');

// Define Relationships

// User - Cart (1:1)
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Cart - CartItem (1:N)
Cart.hasMany(CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// Product - CartItem (1:N)
Product.hasMany(CartItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Category - Product (1:N)
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// User - Order (1:N)
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Order - OrderItem (1:N)
Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Product - OrderItem (1:N)
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Order - Payment (1:1)
Order.hasOne(Payment, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });

// User - Wishlist (1:N)
User.hasMany(Wishlist, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });

// Product - Wishlist (1:N)
Product.hasMany(Wishlist, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
  Wishlist
};
