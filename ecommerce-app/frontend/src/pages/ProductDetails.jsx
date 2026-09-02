import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, toggleWishlist } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Heart, Star, Truck, ShieldCheck, RefreshCw, ChevronRight, Minus, Plus, CheckCircle2, Zap } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [addingToCart, setAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        if (res.success) {
          setProduct(res.data);
          if (res.data.size) {
            setSelectedSize(res.data.size.split(',')[0].trim());
          }
          if (res.data.color) {
            setSelectedColor(res.data.color.split(',')[0].trim());
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === 'inc' && product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
    } catch (err) {
      console.error(err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product || product.stock <= 0) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    try {
      const res = await addToCart(product.id, quantity);
      if (res.success) {
        navigate('/checkout');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const res = await toggleWishlist(product.id);
      if (res.success) {
        setIsWishlisted(res.isAdded);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">Return to Home</Link>
        </div>
      </div>
    );
  }

  const sizes = product.size ? product.size.split(',') : [];
  const colors = product.color ? product.color.split(',') : [];

  // Stock status logic
  const renderStockBadge = () => {
    if (product.stock <= 0) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
          Out of Stock
        </span>
      );
    } else if (product.stock <= 5) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
          Only {product.stock} left in stock!
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
          In Stock ({product.stock} available)
        </span>
      );
    }
  };

  return (
    <div className="bg-[#fcf9f5] min-h-screen text-[#2b2b2b] pb-16">
      {/* Breadcrumbs */}
      <div className="bg-[#faf7f2] border-b border-[#ece5dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#1a3b34]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 self-center" />
            <Link to={`/category/${product.Category?.name.toLowerCase()}`} className="hover:text-[#1a3b34]">
              {product.Category?.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 self-center" />
            <span className="text-gray-900 truncate font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          
          {/* Large Image View */}
          <div className="mb-8 lg:mb-0">
            <div className="aspect-[4/5] bg-[#ede5db] rounded-3xl overflow-hidden relative border border-[#ece5dd] shadow-sm">
              <img 
                src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'} 
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
                }}
                className="object-cover w-full h-full object-center"
              />
              <button 
                onClick={handleWishlist}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-400 hover:text-red-500 hover:bg-white transition-colors focus:outline-none"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a3b34] bg-[#e3eedc] px-3 py-1 rounded-full">
                {product.Category?.name}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl mb-4 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <p className="text-sm text-gray-500 font-medium">
                {product.review_count} Verified Ratings
              </p>
            </div>

            {/* Price & Stock */}
            <div className="mb-6 flex items-baseline space-x-4">
              <p className="text-4xl font-black text-gray-900">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
              <div>{renderStockBadge()}</div>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-4">
              <p>{product.description}</p>
            </div>

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => {
                    const trimmed = s.trim();
                    return (
                      <button
                        key={trimmed}
                        onClick={() => setSelectedSize(trimmed)}
                        className={`border rounded-xl px-4 py-2.5 text-sm font-bold uppercase transition-all
                          ${selectedSize === trimmed ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' : 'border-gray-200 text-gray-800 bg-white hover:border-gray-400'}
                        `}
                      >
                        {trimmed}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => {
                    const trimmed = c.trim();
                    return (
                      <button
                        key={trimmed}
                        onClick={() => setSelectedColor(trimmed)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedColor === trimmed ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'}`}
                      >
                        {trimmed}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center w-36 border border-gray-300 rounded-xl bg-gray-50 p-1">
                <button 
                  onClick={() => handleQuantity('dec')} 
                  disabled={quantity <= 1}
                  className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-bold text-gray-900 text-base">{quantity}</span>
                <button 
                  onClick={() => handleQuantity('inc')} 
                  disabled={quantity >= product.stock}
                  className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || addingToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock <= 0 ? 'Out of Stock' : addingToCart ? 'Adding...' : 'ADD TO CART'}
              </button>

              <button 
                onClick={handleBuyNow}
                disabled={product.stock <= 0 || addingToCart}
                className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Product Benefits Checklist */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Product Guarantee & Benefits</h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-700">
                <div className="flex items-center text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> High Quality Material
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Easy 30-Day Returns
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> 100% Secure Payment
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Fast & Free Delivery
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('description')}
              className={`py-4 px-8 text-sm font-bold border-b-2 transition-colors ${activeTab === 'description' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              DESCRIPTION
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-8 text-sm font-bold border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              REVIEWS ({product.review_count})
            </button>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                <p>{product.description}</p>
                <p className="mt-3">Crafted with attention to detail and designed for comfort. Part of our featured {product.Category?.name} collection.</p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="text-gray-600 space-y-4">
                <p className="text-sm font-bold text-gray-900">Customer Ratings ({product.review_count})</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-900">Rohan S.</span>
                  </div>
                  <p className="text-xs text-gray-600">Great quality product! Fits exactly as expected and the fabric feels premium.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
