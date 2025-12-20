'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, serverTimestamp } from 'firebase/database';
import { ShoppingCart, MapPin, Phone, Search, X, Navigation, Store } from 'lucide-react';

export default function ShopPage() {
  const params = useParams();
  const userId = params.id;

  // --- STATE MANAGEMENT ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data States
  const [shopSettings, setShopSettings] = useState(null); // Delivery fee, Name etc.
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Order States
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);
  
  // Checkout Form
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    location: null // { lat, lng, mapLink }
  });

  // --- 1. INITIALIZATION ---
  useEffect(() => {
    if (!userId) return;

    const initShop = async () => {
      try {
        // Step 1: Get Config from your Next.js API
        const res = await fetch(`/api/shop-config?id=${userId}`);
   console.log(res)
        if (!res.ok) throw new Error("Shop not found or offline");
        const data = await res.json();
        
        // Step 2: Connect to Client Firebase
        connectToRealtimeDB(data.config, userId);
      } catch (err) {
        console.error("Init Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    initShop();
  }, [userId]);

  const connectToRealtimeDB = (firebaseConfig, shopId) => {
    try {
      const appName = `shop-${shopId}`;
      let shopApp = getApps().find(app => app.name === appName) || initializeApp(firebaseConfig, appName);
      const db = getDatabase(shopApp);

      // Listener 1: Settings (Shop Info)
      onValue(ref(db, 'settings'), (snapshot) => {
        const data = snapshot.val();
        // Array or Object handling
        const settingsObj = Array.isArray(data) ? data[0] : data; 
        
        if (settingsObj) {
            setShopSettings({
                name: settingsObj.onlineStore?.displayName || settingsObj.business?.businessName || "Online Store",
                phone: settingsObj.onlineStore?.phone || settingsObj.business?.phoneNo || "",
                address: settingsObj.business?.address || "",
                deliveryFee: Number(settingsObj.onlineStore?.deliveryFee || 0),
                minOrder: Number(settingsObj.onlineStore?.minOrder || 0),
                isActive: settingsObj.onlineStore?.isActive ?? true,
                logo: settingsObj.business?.logo || null
            });
        }
      });

      // Listener 2: Products
      onValue(ref(db, 'products'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert Object/Array to Clean List
          // Important: Filter out deleted items or items with 0 price if needed
          const productList = Object.values(data).filter(p => p && !p._deleted); // Assuming soft delete logic exists or just raw
          
          setProducts(productList);
          setFilteredProducts(productList);

          // Extract Unique Categories (Agar category field nahi hai to generic bana lenge)
          // Data structure mein category nahi thi, toh hum mock ya existing logic use karenge
          // Assuming 'category' field might verify later, otherwise just 'All'
          const uniqueCats = ['All', ...new Set(productList.map(p => p.category || 'General').filter(Boolean))];
          setCategories(uniqueCats);
        } else {
          setProducts([]);
        }
        setLoading(false);
      });

    } catch (err) {
      setError("Connection Failed");
      setLoading(false);
    }
  };

  // --- 2. FILTERING LOGIC ---
  useEffect(() => {
    let result = products;

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.nameInUrdu?.includes(q)
      );
    }

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => (p.category || 'General') === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  // --- 3. CART ACTIONS ---
  const addToCart = (product) => {
    setCart(prev => {
      const currentQty = prev[product.id]?.qty || 0;
      // Stock Check (using top level quantity)
      if (currentQty >= product.quantity) {
        alert("Sorry, no more stock available!");
        return prev;
      }
      return {
        ...prev,
        [product.id]: { ...product, qty: currentQty + 1 }
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId].qty > 1) {
        newCart[productId].qty -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.sellPrice * item.qty), 0);
  const finalTotal = cartTotal + (shopSettings?.deliveryFee || 0);

  // --- 4. LOCATION & ORDER ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCustomer(prev => ({
          ...prev,
          location: {
            lat: latitude,
            lng: longitude,
            mapLink: `https://www.google.com/maps?q=${latitude},${longitude}`
          }
        }));
      },
      (error) => {
        alert("Unable to retrieve your location. Please allow permissions.");
      }
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartTotal < (shopSettings?.minOrder || 0)) {
        alert(`Minimum order amount is Rs ${shopSettings.minOrder}`);
        return;
    }

    setIsOrderPlacing(true);

    try {
      const appName = `shop-${userId}`;
      const shopApp = getApp(appName);
      const db = getDatabase(shopApp);

      // Clean Items (Security: Remove Purchase Price)
      const cleanItems = {};
      Object.values(cart).forEach(item => {
        cleanItems[item.id] = {
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.sellPrice,
            // Only keeping necessary fields
        };
      });

      const orderData = {
        customer: {
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            location: customer.location || null
        },
        items: cleanItems,
        subtotal: cartTotal,
        deliveryFee: shopSettings.deliveryFee,
        total: finalTotal,
        status: 'pending',
        timestamp: serverTimestamp(),
        source: 'online_store'
      };

      await push(ref(db, 'orders'), orderData);
      
      alert("Order Placed Successfully! 🎉");
      setCart({});
      setIsCartOpen(false);
      setCustomer({ name: '', phone: '', address: '', location: null });
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Check internet connection.");
    } finally {
      setIsOrderPlacing(false);
    }
  };

  // --- RENDER ---
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold px-4 text-center">{error}</div>;

  if (!shopSettings?.isActive) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
            <Store size={64} className="text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Store Currently Closed</h1>
            <p className="text-gray-500">This shop is not accepting online orders right now.</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    {shopSettings.logo ? (
                        <img src={shopSettings.logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border" />
                    ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {shopSettings.name.charAt(0)}
                        </div>
                    )}
                    <div>
                        <h1 className="font-bold text-gray-900 leading-tight">{shopSettings.name}</h1>
                        <a href={`tel:${shopSettings.phone}`} className="text-xs text-blue-600 flex items-center gap-1">
                            <Phone size={10} /> {shopSettings.phone}
                        </a>
                    </div>
                </div>
                
                {/* Cart Icon */}
                <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition">
                    <ShoppingCart className="text-gray-700" size={24} />
                    {Object.keys(cart).length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                            {Object.values(cart).reduce((a, b) => a + b.qty, 0)}
                        </span>
                    )}
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search items..." 
                    className="w-full bg-gray-100 text-sm pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
      </header>

      {/* CATEGORIES */}
      {/* <div className="bg-white border-b border-gray-100 overflow-x-auto">
         <div className="max-w-2xl mx-auto flex gap-2 p-3 min-w-max">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    {cat}
                </button>
            ))}
         </div>
      </div> */}

      {/* PRODUCT LIST */}
      <main className="max-w-2xl mx-auto p-4 grid grid-cols-2 gap-3">
        {filteredProducts.map((item) => {
            const qtyInCart = cart[item.id]?.qty || 0;
            const isOutOfStock = item.quantity <= 0;

            return (
                <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                   <div>
                       {/* Discount Badge if retail > sell */}
                       {item.retailPrice > item.sellPrice && (
                           <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block">
                               {(100 - (item.sellPrice / item.retailPrice * 100)).toFixed(0)}% OFF
                           </span>
                       )}
                       
                       <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">{item.name}</h3>
                       {item.nameInUrdu && <p className="text-xs text-gray-400 font-arabic mb-2 text-right">{item.nameInUrdu}</p>}
                       
                       <div className="flex items-baseline gap-2 mb-3">
                            <span className="font-black text-blue-600">Rs {item.sellPrice}</span>
                            {item.retailPrice > item.sellPrice && (
                                <span className="text-xs text-gray-400 line-through">Rs {item.retailPrice}</span>
                            )}
                       </div>
                   </div>

                   {isOutOfStock ? (
                       <div className="w-full bg-gray-100 text-gray-400 text-xs font-bold py-2 rounded-xl text-center">Out of Stock</div>
                   ) : qtyInCart > 0 ? (
                       <div className="flex items-center justify-between bg-gray-900 text-white rounded-xl p-1">
                           <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg font-bold">-</button>
                           <span className="text-sm font-bold">{qtyInCart}</span>
                           <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg font-bold">+</button>
                       </div>
                   ) : (
                       <button onClick={() => addToCart(item)} className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 text-sm font-bold py-2 rounded-xl transition-colors">
                           Add to Cart
                       </button>
                   )}
                </div>
            );
        })}
      </main>

      {/* FLOATING CART BUTTON (When Closed) */}
      {!isCartOpen && Object.keys(cart).length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-20">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex justify-between items-center"
              >
                  <div className="flex items-center gap-3">
                      <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {Object.values(cart).reduce((a, b) => a + b.qty, 0)}
                      </div>
                      <div className="text-left">
                          <p className="text-xs text-gray-300 uppercase font-bold">Total</p>
                          <p className="font-bold text-lg leading-none">Rs {finalTotal}</p>
                      </div>
                  </div>
                  <span className="font-bold text-sm flex items-center gap-1">View Cart <Navigation size={14} className="rotate-90" /></span>
              </button>
          </div>
      )}

      {/* CHECKOUT MODAL (Full Screen) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="font-black text-xl text-gray-800">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-gray-500">
                    <X size={20} />
                </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.keys(cart).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <ShoppingCart size={48} className="mb-2 opacity-20" />
                        <p>Cart is empty</p>
                        <button onClick={() => setIsCartOpen(false)} className="text-blue-600 text-sm font-bold mt-2">Go Shopping</button>
                    </div>
                ) : (
                    Object.values(cart).map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                            <div>
                                <p className="font-bold text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-400">Rs {item.sellPrice} x {item.qty}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-800">Rs {item.sellPrice * item.qty}</span>
                                <div className="flex items-center bg-gray-100 rounded-lg h-8">
                                    <button onClick={() => removeFromCart(item.id)} className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-red-500">-</button>
                                    <button onClick={() => addToCart(item)} className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-green-500">+</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {/* Checkout Form */}
                {Object.keys(cart).length > 0 && (
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="mt-8 space-y-5">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-3 text-sm uppercase flex items-center gap-2">
                                <MapPin size={16} /> Delivery Details
                            </h3>
                            
                            <div className="space-y-3">
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full p-3 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={customer.name}
                                    onChange={e => setCustomer({...customer, name: e.target.value})}
                                />
                                <input 
                                    required
                                    type="tel" 
                                    placeholder="Phone Number (WhatsApp preferred)" 
                                    className="w-full p-3 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={customer.phone}
                                    onChange={e => setCustomer({...customer, phone: e.target.value})}
                                />
                                <textarea 
                                    required
                                    placeholder="Complete Address (House #, Street, Area)" 
                                    rows="2"
                                    className="w-full p-3 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={customer.address}
                                    onChange={e => setCustomer({...customer, address: e.target.value})}
                                />
                                
                                <button 
                                    type="button"
                                    onClick={handleGetLocation}
                                    className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${customer.location ? 'bg-green-100 text-green-700' : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-50'}`}
                                >
                                    {customer.location ? <><MapPin size={14} /> Location Saved</> : <><Navigation size={14} /> Share GPS Location</>}
                                </button>
                                {customer.location && <p className="text-[10px] text-green-600 text-center">We will use this to find your exact location on map.</p>}
                            </div>
                        </div>

                        {/* Bill Summary */}
                        <div className="space-y-2 pt-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>Rs {cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery Fee</span>
                                <span>Rs {shopSettings.deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-gray-900 font-black text-lg border-t pt-2 mt-2">
                                <span>Total Payable</span>
                                <span>Rs {finalTotal}</span>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t bg-white">
                {Object.keys(cart).length > 0 && (
                    <button 
                        form="checkout-form"
                        type="submit"
                        disabled={isOrderPlacing}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                        {isOrderPlacing ? <span className="loading loading-spinner"></span> : `Confirm Order • Rs ${finalTotal}`}
                    </button>
                )}
            </div>
        </div>
      )}
    </div>
  );
}


