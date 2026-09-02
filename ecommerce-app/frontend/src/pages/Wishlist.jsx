import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, toggleWishlist } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Heart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      if (res.success) {
        setWishlistItems(res.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await toggleWishlist(productId);
      if (res.success && !res.isAdded) {
        setWishlistItems(wishlistItems.filter(item => item.product_id !== productId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Found something you like? Tap on the heart icon next to the item to add it to your wishlist!
        </p>
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          DISCOVER PRODUCTS
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 text-red-500 mr-3 fill-red-500" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Wishlist
          </h1>
          <span className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
            {wishlistItems.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative group">
              <ProductCard product={item.Product} />
              <button
                onClick={() => handleRemove(item.product_id)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white text-red-500 hover:bg-red-50 hover:text-red-600 shadow-md transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                title="Remove from wishlist"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
