import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';

const Category = () => {
  const { id } = useParams(); // URL param (e.g. 'men', 'women', 'men's t-shirts')
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [minRating, setMinRating] = useState('');

  const rawParam = id ? decodeURIComponent(id) : 'All Products';
  const isMen = rawParam.toLowerCase() === 'men';
  const isWomen = rawParam.toLowerCase() === 'women';

  const pageTitle = isMen 
    ? "MEN'S COLLECTION" 
    : isWomen 
    ? "WOMEN'S COLLECTION" 
    : rawParam.toUpperCase();

  const availableSizes = isMen || isWomen ? ['S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11'] : ['S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', 'One Size'];
  const availableColors = ['Black', 'White', 'Blue', 'Navy', 'Grey', 'Beige', 'Brown', 'Green', 'Pink', 'Red', 'Cream'];

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    setSelectedSubCat('');
  }, [rawParam]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const params = {
          category: selectedSubCat || rawParam,
          sort,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          size: selectedSize || undefined,
          color: selectedColor || undefined,
          rating: minRating || undefined
        };

        const res = await getProducts(params);
        if (res.success) setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [rawParam, selectedSubCat, sort, minPrice, maxPrice, selectedSize, selectedColor, minRating]);

  const resetFilters = () => {
    setSelectedSubCat('');
    setSort('newest');
    setMinPrice('');
    setMaxPrice('');
    setSelectedSize('');
    setSelectedColor('');
    setMinRating('');
  };

  // Filter sub-categories relevant to current section
  const relevantCategories = categories.filter(c => {
    if (isMen) return c.name.startsWith("Men's");
    if (isWomen) return c.name.startsWith("Women's");
    return true;
  });

  return (
    <div className="bg-[#fcf9f5] min-h-screen text-[#2b2b2b]">
      {/* Breadcrumbs */}
      <div className="bg-[#faf7f2] border-b border-[#ece5dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#1a3b34]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 self-center" />
            <span className="text-gray-900 font-semibold">{pageTitle}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          
          {/* Left Filters Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 mb-8 lg:mb-0">
            <div className="bg-[#faf7f2] p-6 rounded-3xl border border-[#ede5db] sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e5dcd1]">
                <h3 className="font-serif font-bold text-gray-900 text-lg flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2 text-[#1a3b34]" /> Filters
                </h3>
                <button 
                  onClick={resetFilters} 
                  className="text-xs text-[#1a3b34] hover:text-[#275249] flex items-center font-bold"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </button>
              </div>

              {/* Sub-Category Filter */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Sub-Category</h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 text-sm">
                  <button
                    onClick={() => setSelectedSubCat('')}
                    className={`block w-full text-left px-2 py-1.5 rounded-lg transition-colors ${!selectedSubCat ? 'bg-indigo-600 text-white font-bold' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    All {pageTitle}
                  </button>
                  {relevantCategories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedSubCat(c.name)}
                      className={`block w-full text-left px-2 py-1.5 rounded-lg transition-colors ${selectedSubCat === c.name ? 'bg-indigo-600 text-white font-bold' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Price Range (₹)</h4>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${selectedSize === sz ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(selectedColor === col ? '' : col)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all ${selectedColor === col ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Minimum Rating</h4>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5★ & Above</option>
                  <option value="4.0">4.0★ & Above</option>
                  <option value="3.5">3.5★ & Above</option>
                </select>
              </div>

            </div>
          </div>

          {/* Right Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200 gap-4">
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  {selectedSubCat || pageTitle}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Showing <span className="font-bold text-gray-900">{products.length}</span> items
                </p>
              </div>
              
              {/* Sort By Dropdown */}
              <div className="flex items-center text-sm bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-500 mr-2 font-medium">Sort By:</span>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price Low to High</option>
                  <option value="price_desc">Price High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 h-[360px] rounded-2xl"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No products match your filter criteria</h3>
                <p className="text-gray-500 text-sm mb-6">Try clearing some filters or searching for another term.</p>
                <button
                  onClick={resetFilters}
                  className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Category;
