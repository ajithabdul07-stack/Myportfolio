import { useState } from 'react';
import { Search, Heart, Info, Zap, X } from 'lucide-react';

export default function ProductRecommendation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Audio', price: 79.99, image: '🎧', keywords: ['headphones', 'audio', 'wireless', 'music', 'sound'] },
    { id: 2, name: 'USB-C Cable', category: 'Cables', price: 12.99, image: '🔌', keywords: ['cable', 'usb', 'charger', 'connector', 'charging'] },
    { id: 3, name: 'Phone Case', category: 'Protection', price: 19.99, image: '📱', keywords: ['case', 'phone', 'protection', 'cover', 'mobile'] },
    { id: 4, name: 'Laptop Stand', category: 'Office', price: 39.99, image: '💻', keywords: ['stand', 'laptop', 'desk', 'ergonomic', 'office'] },
    { id: 5, name: 'Wireless Mouse', category: 'Input', price: 29.99, image: '🖱️', keywords: ['mouse', 'wireless', 'input', 'peripherals', 'computer'] },
    { id: 6, name: 'Mechanical Keyboard', category: 'Input', price: 49.99, image: '⌨️', keywords: ['keyboard', 'mechanical', 'typing', 'input', 'gaming'] },
    { id: 7, name: 'USB Hub', category: 'Connectivity', price: 24.99, image: '🔗', keywords: ['hub', 'usb', 'connectivity', 'ports', 'expansion'] },
    { id: 8, name: 'Monitor Light', category: 'Lighting', price: 34.99, image: '💡', keywords: ['light', 'monitor', 'desk', 'lighting', 'led'] },
    { id: 9, name: 'Fast Charger', category: 'Charging', price: 15.99, image: '🔋', keywords: ['charger', 'fast', 'charging', 'power', 'battery'] },
    { id: 10, name: 'Desk Lamp Pro', category: 'Lighting', price: 44.99, image: '🏮', keywords: ['lamp', 'desk', 'lighting', 'brightness', 'office'] },
  ];

  const getRecommendedProducts = () => {
    if (searchTerm.trim() === '') return [];

    const searchLower = searchTerm.toLowerCase();
    
    const matched = products.filter(product =>
      product.keywords.some(keyword => keyword.includes(searchLower) || searchLower.includes(keyword)) ||
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );

    return matched;
  };

  const getRelatedProducts = () => {
    if (searchTerm.trim() === '') return [];

    const recommended = getRecommendedProducts();
    const recommendedIds = new Set(recommended.map(p => p.id));


    return products.filter(product => !recommendedIds.has(product.id)).slice(0, 5);
  };

  const recommendedProducts = getRecommendedProducts();
  const relatedProducts = getRelatedProducts();

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const ProductCard = ({ product, size = 'large' }) => (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition border-2 border-gray-100 hover:border-blue-300 overflow-hidden group ${size === 'small' ? 'p-3' : 'p-5'}`}>
      <div className={`bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg text-center group-hover:scale-110 transition ${size === 'small' ? 'p-4 text-4xl' : 'p-8 text-6xl'}`}>
        {product.image}
      </div>
      <div className={size === 'small' ? 'mt-2' : 'mt-4'}>
        <h4 className={`font-bold text-gray-800 ${size === 'small' ? 'text-sm' : 'text-lg'}`}>{product.name}</h4>
        <p className={`mb-2 font-medium ${size === 'small' ? 'text-xs' : 'text-sm'}`} style={{ color: '#56A5EC' }}>{product.category}</p>
        <div className="flex items-center justify-between">
          <p className={`font-bold ${size === 'small' ? 'text-sm' : 'text-2xl'}`} style={{ color: '#56A5EC' }}>₹{product.price.toFixed(2)}</p>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="transition transform hover:scale-110"
          >
            <Heart
              size={size === 'small' ? 16 : 24}
              className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-300'}
            />
          </button>
        </div>
        {size !== 'small' && (
          <button
            className="w-full text-white py-2 rounded-lg font-semibold transition hover:shadow-lg mt-3"
            style={{ backgroundColor: '#56A5EC' }}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
     
      <header className="sticky top-0 z-40 bg-white shadow-md border-b-4" style={{ borderColor: '#56A5EC' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Zap className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#56A5EC' }}>Recommendation System</h1>
          </div>
          
          <button
            onClick={() => setShowAbout(true)}
            className="text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold border-2"
            style={{ borderColor: '#56A5EC', color: '#56A5EC', backgroundColor: 'white' }}
          >
            <Info size={20} />
            <span className="hidden sm:inline">About</span>
          </button>
        </div>
      </header>

      
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 border-2" style={{ borderColor: '#56A5EC' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#56A5EC' }}>About SmartFind</h2>
            
            <div className="space-y-5 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#56A5EC' }}>Project Description</h3>
                <p className="text-sm leading-relaxed">A modern product search and recommendation system inspired by PlayStore. Shows recommended products before and after search results.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#56A5EC' }}>Technologies Used</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li><strong>React:</strong> UI framework</li>
                  <li><strong>Hooks (useState):</strong> State management</li>
                  <li><strong>Tailwind CSS:</strong> Styling</li>
                  <li><strong>Lucide React:</strong> Icons</li>
                  <li><strong>Smart Filtering:</strong> Keyword-based matching</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#56A5EC' }}>Features</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Real-time search with recommendations</li>
                  <li>Top recommendations section</li>
                  <li>Search results display</li>
                  <li>Related products suggestions</li>
                  <li>PlayStore-style layout</li>
                  <li>Add/remove favorites</li>
                  <li>White & #56A5EC theme</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="mt-8 w-full text-white py-2 rounded-lg font-semibold transition hover:shadow-lg"
              style={{ backgroundColor: '#56A5EC' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
      
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Recommendation System</h2>
          <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
        </div>

      
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-4 top-4" size={24} style={{ color: '#56A5EC' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border-2 rounded-xl focus:outline-none transition text-lg shadow-sm"
              style={{ borderColor: '#56A5EC' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-4"
              >
                <X size={24} style={{ color: '#56A5EC' }} />
              </button>
            )}
          </div>
        </div>


        {searchTerm && (
          <>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span style={{ color: '#56A5EC' }} className="text-3xl">⭐</span>
                Recommended For You
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} size="large" />
                ))}
              </div>
            </div>

            
            {recommendedProducts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span style={{ color: '#56A5EC' }} className="text-3xl">🔍</span>
                  Search Results ({recommendedProducts.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {recommendedProducts.map(product => (
                    <ProductCard key={product.id} product={product} size="large" />
                  ))}
                </div>
              </div>
            )}

          
            {relatedProducts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span style={{ color: '#56A5EC' }} className="text-3xl">💡</span>
                  You Might Also Like
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {relatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} size="small" />
                  ))}
                </div>
              </div>
            )}

         
            {recommendedProducts.length === 0 && (
              <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-dashed" style={{ borderColor: '#56A5EC' }}>
                <p className="text-2xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-500">Try searching for: keyboard, headphones, charging, desk, wireless, light, case, etc.</p>
              </div>
            )}
          </>
        )}

     
        {!searchTerm && (
          <>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              
                Featured Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} size="large" />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                
                Explore All Products
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} size="small" />
                ))}
              </div>
            </div>
          </>
        )}

    
        {favorites.length > 0 && (
          <div className="fixed bottom-8 right-8 bg-white rounded-full shadow-lg p-4 border-2" style={{ borderColor: '#56A5EC' }}>
            <div className="flex items-center gap-2">
              <Heart size={24} className="fill-red-500 text-red-500" />
              <span className="font-bold text-lg" style={{ color: '#56A5EC' }}>{favorites.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}