import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, User, Search, Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#faf7f2] border-b border-[#ece5dd] sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button & Brand */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-[#efe8df] lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link to="/" className="flex items-center space-x-2 group">
              <Sparkles className="w-6 h-6 text-[#1a3b34] group-hover:rotate-12 transition-transform" />
              <span className="font-serif text-2xl font-bold tracking-widest text-[#1a3b34]">
                LUMORA
              </span>
            </Link>
          </div>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <Link to="/search" className="hover:text-[#1a3b34] transition-colors">Shop</Link>
            <Link to="/category/women" className="hover:text-[#1a3b34] transition-colors">Women</Link>
            <Link to="/category/men" className="hover:text-[#1a3b34] transition-colors">Men</Link>
            <Link to="/category/beauty" className="hover:text-[#1a3b34] transition-colors">Beauty</Link>
            <Link to="/category/home & living" className="hover:text-[#1a3b34] transition-colors">Home & Living</Link>
            <Link to="/search?q=sale" className="text-[#c27866] font-semibold hover:text-[#1a3b34] transition-colors">Deals</Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Search Input / Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search curated items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-44 sm:w-60 bg-white border border-[#dcd3c8] rounded-full px-4 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#1a3b34]"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-xs text-gray-500 hover:text-gray-900">
                    ✕
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#1a3b34] hover:bg-[#efe8df] rounded-full transition-colors"
                  title="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Auth Dropdown */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center p-2 text-[#1a3b34] hover:bg-[#efe8df] rounded-full transition-colors">
                  <User className="w-5 h-5" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-2xl shadow-xl py-2 border border-[#eee7de] hidden group-hover:block transition-all z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#fbf8f5]">My Profile</Link>
                  <Link to="/profile?tab=orders" className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#fbf8f5]">Order History</Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#fbf8f5]">Saved Wishlist</Link>
                  <Link to="/add-product" className="block px-4 py-2 text-xs text-[#1a3b34] font-bold hover:bg-[#fbf8f5]">+ Add Product</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="text-xs font-bold text-[#1a3b34] hover:text-[#c27866] transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="p-2 text-[#1a3b34] hover:bg-[#efe8df] rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1a3b34] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#faf7f2] border-t border-[#ece5dd] px-4 pt-3 pb-6 space-y-3">
          <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-gray-800">Shop All</Link>
          <Link to="/category/women" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-gray-800">Women</Link>
          <Link to="/category/men" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-gray-800">Men</Link>
          <Link to="/category/beauty" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-gray-800">Beauty</Link>
          <Link to="/category/home & living" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-gray-800">Home & Living</Link>
          {isAuthenticated ? (
            <div className="pt-4 border-t border-[#e5dcd1]">
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-gray-800">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-sm font-semibold text-red-600">Sign Out</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-[#1a3b34]">Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
