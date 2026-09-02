import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Mail, Sparkles, Star, Award, HeartHandshake, Leaf } from 'lucide-react';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts({ sort: 'newest', limit: 8 });
        if (res.success) setNewArrivals(res.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const circularCategories = [
    { name: "Women", count: "120+ Items", path: "/category/women", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80" },
    { name: "Men", count: "95+ Items", path: "/category/men", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" },
    { name: "Home & Living", count: "150+ Items", path: "/category/home & living", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80" },
    { name: "Beauty", count: "60+ Items", path: "/category/beauty", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
    { name: "Accessories", count: "70+ Items", path: "/search?q=accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="bg-[#fcf9f5] min-h-screen text-[#2b2b2b]">
      
      {/* HERO SECTION */}
      <section className="bg-[#faf7f2] pt-8 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 z-10">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 block">
                NEW SEASON COLLECTION
              </span>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-[1.15] mb-6">
                Live Beautifully.<br />
                <span className="italic">Shop Effortlessly.</span>
              </h1>
              
              <p className="text-base text-gray-600 max-w-md mb-8 leading-relaxed">
                Curated styles, quality you love, delivered straight to your door. Experience modern luxury living.
              </p>

              <div className="mb-12">
                <Link 
                  to="/search" 
                  className="inline-flex items-center bg-[#1a3b34] hover:bg-[#275249] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-md transition-all transform hover:scale-105"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>

              {/* 3 Pillar Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#ece5dd]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#f4e6d4] flex items-center justify-center text-amber-700 flex-shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Free Shipping</h4>
                    <p className="text-[10px] text-gray-500">On orders over ₹999</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#e3eedc] flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Secure Payment</h4>
                    <p className="text-[10px] text-gray-500">100% protected</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#f7e3df] flex items-center justify-center text-rose-700 flex-shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
                    <p className="text-[10px] text-gray-500">30-day return policy</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Arch & Image Column */}
            <div className="lg:col-span-6 relative flex justify-center">
              {/* Arch Background Shape */}
              <div className="relative w-[340px] sm:w-[420px] h-[460px] sm:h-[540px] bg-[#e8d5ce] rounded-t-full overflow-hidden flex items-end shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
                  alt="Lumora Featured Model" 
                  className="w-full h-[105%] object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Product Card */}
              <div className="absolute bottom-8 right-0 sm:right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-[#f0e7dd] flex items-center space-x-3 w-56 transform translate-y-4 hover:-translate-y-1 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80" 
                  alt="Luxe Handbag" 
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">Luxe Leather Tote</h4>
                  <p className="text-xs font-extrabold text-[#1a3b34] mt-0.5">₹2,999</p>
                </div>
                <Link to="/search" className="p-2 rounded-xl bg-[#1a3b34] text-white hover:bg-[#275249]">
                  +
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY (Circular Avatars) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/search" className="text-xs font-bold text-gray-700 hover:text-[#1a3b34] flex items-center">
            Browse all <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {circularCategories.map((cat, idx) => (
            <Link key={idx} to={cat.path} className="group flex flex-col items-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-3 p-1 bg-[#efe7de] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#1a3b34] transition-colors">{cat.name}</h3>
              <span className="text-[11px] text-gray-500 mt-0.5">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMO BANNER ("Spring Sale is Live! Up to 40% OFF") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 relative bg-[#1a3b34]">
          
          {/* Left Dark Teal Text Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center text-white relative z-10">
            <span className="text-xs font-bold tracking-widest text-[#e8d5ce] uppercase mb-3 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> LIMITED TIME OFFER
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mb-4 leading-tight">
              Spring Sale is Live!
            </h2>

            <p className="text-sm text-gray-200 mb-8 max-w-md">
              Enjoy up to 40% off on selected luxury collections for Men & Women.
            </p>

            <div>
              <Link 
                to="/search?q=sale" 
                className="inline-flex items-center bg-[#e8d5ce] hover:bg-[#dfc8c0] text-[#1a3b34] font-bold text-xs px-6 py-3.5 rounded-full transition-all"
              >
                Explore Deals <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Center Floating 40% OFF Circle Badge */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 rounded-full bg-[#e5a8a0] text-[#1a3b34] flex-col items-center justify-center text-center shadow-xl border-4 border-[#1a3b34]">
            <span className="text-[10px] font-bold uppercase tracking-wider">UP TO</span>
            <span className="font-serif text-2xl font-black leading-none">40%</span>
            <span className="text-[9px] font-bold">OFF</span>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-6 h-64 lg:h-auto relative">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" 
              alt="Spring Sale Flatlay" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* NEW ARRIVALS GRID */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-xs text-gray-500 mt-1">Fresh curated additions for this season</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-gray-700 hover:text-[#1a3b34] flex items-center">
            View all <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#efe7de] h-[340px] rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER BANNER ("Join the Lumora Circle") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#e8d5ce] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1a3b34] mb-4 shadow-sm">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join the Lumora Circle</h2>
          <p className="text-xs sm:text-sm text-gray-700 max-w-md mb-6">
            Be the first to know about new arrivals, exclusive offers, and lifestyle inspiration.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md bg-white rounded-full p-1.5 shadow-sm border border-[#dec6bd]">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent px-4 py-2 text-xs text-gray-800 focus:outline-none flex-1"
              required
            />
            <button 
              type="submit" 
              className="bg-[#1a3b34] hover:bg-[#275249] text-white font-bold text-xs px-6 py-2.5 rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* TRUST FOOTER BAR */}
      <section className="border-t border-[#ece4db] bg-[#faf7f2] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-gray-600">
            <div className="flex flex-col items-center">
              <Award className="w-5 h-5 text-[#1a3b34] mb-1.5" />
              <span className="font-bold text-gray-900">Quality You Can Trust</span>
              <span className="text-[10px] text-gray-500">Premium curated products</span>
            </div>

            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-[#1a3b34] mb-1.5" />
              <span className="font-bold text-gray-900">Customer Support 24/7</span>
              <span className="text-[10px] text-gray-500">Always here to help you</span>
            </div>

            <div className="flex flex-col items-center">
              <HeartHandshake className="w-5 h-5 text-[#1a3b34] mb-1.5" />
              <span className="font-bold text-gray-900">Loved by Thousands</span>
              <span className="text-[10px] text-gray-500">Happy global community</span>
            </div>

            <div className="flex flex-col items-center">
              <Leaf className="w-5 h-5 text-[#1a3b34] mb-1.5" />
              <span className="font-bold text-gray-900">Sustainable Choice</span>
              <span className="text-[10px] text-gray-500">Thoughtful shopping</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
