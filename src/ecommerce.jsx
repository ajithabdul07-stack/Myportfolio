import { useState } from 'react';
import { Search, ShoppingCart, Trash2, Check, Info } from 'lucide-react';

export default function Ecommerce() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: '🎧' },
    { id: 2, name: 'USB-C Cable', price: 12.99, category: 'Accessories', image: '🔌' },
    { id: 3, name: 'Phone Case', price: 19.99, category: 'Accessories', image: '📱' },
    { id: 4, name: 'Laptop Stand', price: 39.99, category: 'Office', image: '💻' },
    { id: 5, name: 'Wireless Mouse', price: 29.99, category: 'Electronics', image: '🖱️' },
    { id: 6, name: 'Keyboard', price: 49.99, category: 'Electronics', image: '⌨️' },
    { id: 7, name: 'USB Hub', price: 24.99, category: 'Accessories', image: '🔗' },
    { id: 8, name: 'Monitor Light', price: 34.99, category: 'Office', image: '💡' },
    { id: 9, name: 'Phone Charger', price: 15.99, category: 'Accessories', image: '🔋' },
    { id: 10, name: 'Desk Lamp', price: 44.99, category: 'Office', image: '🏮' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      setPurchaseSuccess(true);
      setCart([]);
      setTimeout(() => setPurchaseSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
  
      <header className="bg-white border-b-2 border-blue-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">Ecommerce</h1>
          
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

    
      {purchaseSuccess && (
        <div className="bg-green-100 border-l-4 border-green-600 p-4 mx-4 mt-4 rounded-lg flex items-center gap-3">
          <Check className="text-green-600" size={24} />
          <div>
            <p className="font-semibold text-green-800">Purchase Successful!</p>
            <p className="text-green-700 text-sm">Thank you for your order. It will be delivered soon!</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
       
          {showAbout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">About TechHub</h2>
                
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Project Description</h3>
                    <p className="text-sm">A modern e-commerce platform for tech accessories and office equipment with real-time search, filtering, and shopping cart functionality.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Technologies Used</h3>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li><strong>React:</strong> UI library for building components</li>
                      <li><strong>Hooks (useState):</strong> State management</li>
                      <li><strong>Tailwind CSS:</strong> Utility-first styling</li>
                      <li><strong>Lucide React:</strong> Icons (Search, Cart, Trash, etc.)</li>
                      <li><strong>Express Js</strong> For Backend</li>
                      <li><strong>Mysql</strong> For Database</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Features</h3>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Real-time product search & filter</li>
                      <li>Add/remove products from cart</li>
                      <li>Quantity management</li>
                      <li>Cart total calculation</li>
                      <li>Checkout simulation with success notification</li>
                      <li>Responsive mobile-friendly design</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setShowAbout(false)}
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}

      
          <div className={`${showCart ? 'hidden lg:block' : ''} lg:col-span-3`}>
        
            <div className="mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 text-blue-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
                <button
                  onClick={() => setShowAbout(true)}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Info size={20} />
                  <span className="hidden sm:inline">About</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition border-2 border-blue-100 overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 text-center text-6xl">
                      {product.image}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-sm text-blue-600 mb-2 font-medium">{product.category}</p>
                      <p className="text-2xl font-bold text-blue-600 mb-4">₹{product.price.toFixed(2)}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found. Try a different search!</p>
                </div>
              )}
            </div>
          </div>

      
          <div className={`${!showCart && 'hidden lg:block'} lg:col-span-1`}>
            <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 sticky top-24 overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Shopping Cart
                </h2>
              </div>

              <div className="p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                      {cart.map(item => (
                        <div key={item.id} className="border-2 border-blue-100 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{item.name}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-blue-600 font-semibold mb-2">₹{item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-blue-100 text-blue-600 w-6 h-6 rounded hover:bg-blue-200 transition text-sm"
                            >
                              −
                            </button>
                            <span className="flex-1 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-blue-100 text-blue-600 w-6 h-6 rounded hover:bg-blue-200 transition text-sm"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 border-blue-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                      >
                        Buy Now
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}