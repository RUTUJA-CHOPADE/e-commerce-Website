import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a3b34] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#28544a]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#e8d5ce]" />
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                LUMORA
              </span>
            </Link>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm mb-6">
              Curated luxury fashion, beauty, and home lifestyle products designed for modern living. Live beautifully, shop effortlessly.
            </p>
            <div className="flex space-x-4 text-xs font-semibold text-[#e8d5ce]">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/category/women" className="hover:text-white transition-colors">Women's Apparel</Link></li>
              <li><Link to="/category/men" className="hover:text-white transition-colors">Men's Fashion</Link></li>
              <li><Link to="/category/beauty" className="hover:text-white transition-colors">Skincare & Beauty</Link></li>
              <li><Link to="/category/home & living" className="hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link to="/search?q=accessories" className="hover:text-white transition-colors">Luxe Accessories</Link></li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">Collections</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/search" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/search?q=sale" className="hover:text-white transition-colors">Spring Sale</Link></li>
              <li><Link to="/search?sort=popular" className="hover:text-white transition-colors">Bestsellers</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Curated Edit</Link></li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-400">
          <p>&copy; {new Date().getFullYear()} LUMORA Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
