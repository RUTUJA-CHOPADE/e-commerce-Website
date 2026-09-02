import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import { toggleWishlist } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingCart, setAddingCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const res = await toggleWishlist(product.id);
      if (res.success) {
        setIsWishlisted(res.isAdded);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setAddingCart(true);
    try {
      const res = await addToCart(product.id, 1);
      if (res.success) {
        setAddedSuccess(true);
        setTimeout(() => setAddedSuccess(false), 1500);
      }
    } catch (err) {
      console.error('Add to cart error:', err);
    } finally {
      setAddingCart(false);
    }
  };

  return (
    <div className="group relative bg-[#f7f3ee] border border-[#eee6dd] rounded-3xl p-3.5 transition-all duration-300 hover:shadow-xl hover:border-[#dcd0c4] flex flex-col h-full">
      
      {/* Wishlist Heart Icon */}
      <button 
        onClick={handleWishlistClick}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
        title="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#ede5db] mb-3">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
          }}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Rating Badge */}
        {product.rating > 4.6 && (
          <div className="absolute top-3 left-3 bg-[#1a3b34] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Curated
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <Link to={`/product/${product.id}`} className="block group-hover:text-[#1a3b34] transition-colors">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[11px] text-gray-500 font-medium mb-3">{product.Category?.name || 'Lifestyle'}</p>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-base font-extrabold text-[#1a3b34]">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>

          <button 
            onClick={handleAddToCart}
            disabled={addingCart || product.stock <= 0}
            className={`p-2.5 rounded-2xl transition-all shadow-sm flex items-center justify-center ${addedSuccess ? 'bg-green-700 text-white' : 'bg-[#1a3b34] hover:bg-[#28544a] text-white'} disabled:opacity-50`}
            title="Add to Cart"
          >
            {addedSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
