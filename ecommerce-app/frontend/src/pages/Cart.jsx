import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, cartCount } = useCart();

  const handleUpdateQuantity = (itemId, currentQty, type) => {
    if (type === 'dec' && currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    }
    if (type === 'inc') {
      updateQuantity(itemId, currentQty + 1);
    }
  };

  if (loading && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our latest products and start shopping!
        </p>
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Your Cart <span className="text-lg font-medium text-gray-500 font-normal">({cartCount} items)</span>
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex py-6 px-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-xl overflow-hidden sm:w-32 sm:h-32">
                      <img
                        src={item.Product?.image_url || 'https://via.placeholder.com/150'}
                        alt={item.Product?.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2">
                            <Link to={`/product/${item.Product?.id}`} className="hover:text-indigo-600">
                              {item.Product?.name}
                            </Link>
                          </h3>
                          <p className="ml-4 whitespace-nowrap text-lg">
                            ₹{Number(item.Product?.price).toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-1 flex text-sm">
                          {item.Product?.color && (
                            <p className="text-gray-500 border-r border-gray-200 pr-2">
                              {item.Product.color}
                            </p>
                          )}
                          {item.Product?.size && (
                            <p className="text-gray-500 pl-2">
                              Size: {item.Product.size.split(',')[0]}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex-1 flex items-end justify-between text-sm">
                        
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 'dec')}
                            disabled={loading || item.quantity <= 1}
                            className="p-2 text-gray-500 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium text-gray-900 border-x border-gray-200 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 'inc')}
                            disabled={loading || item.quantity >= item.Product?.stock}
                            className="p-2 text-gray-500 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            disabled={loading}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5 sm:mr-2" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h2>

              <dl className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900 font-medium">₹{Number(cart.subtotal).toFixed(2)}</dd>
                </div>
                
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900 font-medium">
                    {cart.shipping === 0 ? <span className="text-green-600 font-semibold">Free</span> : `₹${Number(cart.shipping).toFixed(2)}`}
                  </dd>
                </div>
                
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <dt>Estimated Tax (10%)</dt>
                  <dd className="text-gray-900 font-medium">₹{Number(cart.tax).toFixed(2)}</dd>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-2xl font-extrabold text-gray-900">₹{Number(cart.total).toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <Link
                  to="/checkout"
                  className="w-full bg-indigo-600 border border-transparent rounded-xl shadow-sm py-4 px-4 text-base font-medium text-white hover:bg-indigo-700 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
