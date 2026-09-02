import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getOrders } from '../services/api';
import { User, Package, Settings, LogOut, ChevronRight, Clock, MapPin } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'account';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await getOrders();
      if (res.success) {
        setOrders(res.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Account</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              
              <div className="p-6 border-b border-gray-100 text-center">
                <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mb-4">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>

              <nav className="p-2 space-y-1">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'account' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <User className={`w-5 h-5 mr-3 ${activeTab === 'account' ? 'text-indigo-600' : 'text-gray-400'}`} />
                    Account Details
                  </div>
                  {activeTab === 'account' && <ChevronRight className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <Package className={`w-5 h-5 mr-3 ${activeTab === 'orders' ? 'text-indigo-600' : 'text-gray-400'}`} />
                    Order History
                  </div>
                  {activeTab === 'orders' && <ChevronRight className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <Settings className={`w-5 h-5 mr-3 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-400'}`} />
                    Settings
                  </div>
                  {activeTab === 'settings' && <ChevronRight className="w-4 h-4" />}
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <p className="text-gray-900 font-medium bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-gray-900 font-medium bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order History</h2>
                
                {loadingOrders ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                    <Link to="/" className="text-indigo-600 font-medium hover:text-indigo-800">Start shopping &rarr;</Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        
                        {/* Order Header */}
                        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 gap-4">
                          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                            <div>
                              <p className="text-gray-500 font-medium mb-1">Order Placed</p>
                              <p className="text-gray-900">{formatDate(order.created_at)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium mb-1">Total Amount</p>
                              <p className="text-gray-900 font-bold">₹{Number(order.total_amount).toFixed(2)}</p>
                            </div>

                            <div>
                              <p className="text-gray-500 font-medium mb-1">Order ID</p>
                              <p className="text-gray-900 font-mono">#{order.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Order Items */}
                        <div className="p-6">
                          <ul className="divide-y divide-gray-100">
                            {order.OrderItems.map((item) => (
                              <li key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                  <img src={item.Product?.image_url || 'https://via.placeholder.com/150'} alt={item.Product?.name} className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-base font-medium text-gray-900">{item.Product?.name}</h4>
                                  <div className="mt-1 flex text-sm text-gray-500 gap-4">
                                    <p>Qty: {item.quantity}</p>
                                    <p>Price: ₹{Number(item.price).toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="sm:text-right">
                                  <Link to={`/product/${item.product_id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View Product</Link>
                                </div>
                              </li>
                            ))}
                          </ul>
                          
                          {order.shipping_address && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                Shipping Address
                              </h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                {JSON.parse(order.shipping_address).firstName} {JSON.parse(order.shipping_address).lastName}<br/>
                                {JSON.parse(order.shipping_address).address}<br/>
                                {JSON.parse(order.shipping_address).city}, {JSON.parse(order.shipping_address).state} {JSON.parse(order.shipping_address).zipCode}<br/>
                                {JSON.parse(order.shipping_address).country}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Account Settings</h2>
                <p className="text-gray-500 mb-6">Manage your account preferences and settings.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Change Password</h3>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Update Password
                    </button>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-xs text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
