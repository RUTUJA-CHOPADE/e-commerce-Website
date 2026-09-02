import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../services/api';
import { ShieldCheck, Truck, ChevronRight } from 'lucide-react';

const Checkout = () => {
  const { cart, loading } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const res = await createOrder(orderData);
      
      if (res.success) {
        // Redirect to payment with order ID
        navigate('/payment', { state: { orderId: res.data.id, amount: res.data.total_amount } });
      } else {
        setError(res.message || 'Failed to create order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Something went wrong during checkout.');
      setIsSubmitting(false);
    }
  };

  if (loading || !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <div className="flex items-center text-sm font-medium text-gray-500 mt-4 md:mt-0">
            <span className="text-indigo-600">Shipping</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Payment</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Success</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-7 xl:col-span-8 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Truck className="w-6 h-6 text-indigo-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                    <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                    <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street address</label>
                    <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <input type="text" id="state" name="state" required value={formData.state} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                    <input type="text" id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h3>
                
                <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto mb-6 pr-2">
                  {cart.items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img src={item.Product?.image_url || 'https://via.placeholder.com/150'} alt={item.Product?.name} className="w-full h-full object-center object-cover" />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.Product?.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Qty {item.quantity}</p>
                      </div>
                      <div className="ml-4 flex items-center">
                        <p className="text-sm font-medium text-gray-900">${(Number(item.Product?.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900 font-medium">₹{Number(cart.subtotal).toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="text-gray-900 font-medium">{cart.shipping === 0 ? 'Free' : `₹${Number(cart.shipping).toFixed(2)}`}</dd>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <dt>Estimated Tax</dt>
                    <dd className="text-gray-900 font-medium">₹{Number(cart.tax).toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <dt className="text-base font-bold text-gray-900">Total to Pay</dt>
                    <dd className="text-2xl font-extrabold text-indigo-600">₹{Number(cart.total).toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 border border-transparent rounded-xl shadow-sm py-4 px-4 text-base font-medium text-white hover:bg-indigo-700 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'CONTINUE TO PAYMENT'}
                  </button>
                </div>
                
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                  Safe & Secure Checkout
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
