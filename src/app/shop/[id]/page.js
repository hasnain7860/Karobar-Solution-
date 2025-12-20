'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, serverTimestamp } from 'firebase/database';
import { ShoppingCart, MapPin, Phone, Search, X, Navigation, Store, CheckCircle } from 'lucide-react';

export default function ShopPage() {
  const params = useParams();
  const userId = params.id;

  // --- REFS (For Stability) ---
  const dbRef = useRef(null); 

  // --- STATE MANAGEMENT ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data States
  const [shopSettings, setShopSettings] = useState({
    name: 'Loading Store...',
    phone: '',
    address: '',
    deliveryFee: 0,
    minOrder: 0,
    isActive: true,
    logo: null
  });
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
    location: null 
  });

  // --- 1. INITIALIZATION ---
  useEffect(() => {
    if (!userId) return;

    const initShop = async () => {
      try {
        // Step 1: Get Config from Next.js API
        const res = await fetch(`/api/shop-config?id=${userId}`);
        if (!res.ok) throw new Error("Store is currently offline or not found.");
        const data = await res.json();
        
        // Initial Settings from API (Fallback)
        setShopSettings(prev => ({
            ...prev,
            name: data.shopName || prev.name,
            phone: data.phone || prev.phone,
            address: data.address || prev.address
        }));

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
      let shopApp;
      
      // Prevent Duplicate App Initialization
      if (getApps().some(app => app.name === appName)) {
        shopApp = getApp(appName);
      } else {
        shopApp = initializeApp(firebaseConfig, appName);
      }
      
      const db = getDatabase(shopApp);
      dbRef.current = db; // Store DB reference securely

      // Listener 1: Settings (Live Updates)
      onValue(ref(db, 'settings'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Check if settings is array or object
            const settingsObj = Array.isArray(data) ? data[0] : data;
            
            if (settingsObj) {
                setShopSettings(prev => ({
                    ...prev,
                    // Priority: Online Store Config > Business Config > API Config
                    name: settingsObj.onlineStore?.displayName || settingsObj.business?.businessName || prev.name,
                    phone: settingsObj.onlineStore?.phone || settingsObj.business?.phoneNo || prev.phone,
                    address: settingsObj.business?.address || prev.address,
                    deliveryFee: Number(settingsObj.onlineStore?.deliveryFee || 0),
                    minOrder: Number(settingsObj.onlineStore?.minOrder || 0),
                    isActive: settingsObj.onlineStore?.isActive ?? true,
                    logo: settingsObj.business?.logo || null
                }));
            }
        }
      });

      // Listener 2: Products
      onValue(ref(db, 'products'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Robust Filtering: Ensure price exists
          const productList = Object.values(data).filter(p => p && !p._deleted);
          setProducts(productList);
          setFilteredProducts(productList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      });

    } catch (err) {
      setError("Failed to connect to store database.");
      setLoading(false);
    }
  };

  // --- 2. FILTERING LOGIC ---
  useEffect(() => {
    let result = products;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.nameInUrdu?.includes(q)
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, products]);

  // --- 3. HELPER: PRICE FINDER ---
  // Brutal Fix: Price ka naam kuch bhi ho, ye dhoond lega
  const getPrice = (item) => {
    return Number(item.sellPrice || item.price || item.retailPrice || 0);
  };

  // --- 4. CART ACTIONS ---
  const addToCart = (product) => {
    const price = getPrice(product);
    if (price <= 0) {
        alert("This item cannot be added (Price Invalid)");
        return;
    }

    setCart(prev => {
      const currentQty = prev[product.id]?.qty || 0;
      // Stock Check
      if (product.quantity && currentQty >= product.quantity) {
        alert("Sorry, Maximum stock reached!");
        return prev;
      }
      return {
        ...prev,
        [product.id]: { ...product, qty: currentQty + 1, finalPrice: price }
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

  const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.finalPrice * item.qty), 0);
  const finalTotal = cartTotal + (shopSettings.deliveryFee || 0);

  // --- 5. LOCATION & ORDER ---
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
      (error) => alert("Unable to get location. Please allow permissions.")
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // DB Connection Check
    if (!dbRef.current) {
        alert("Connection Error: Refresh the page and try again.");
        return;
    }

    if (cartTotal < shopSettings.minOrder) {
        alert(`Minimum order amount is Rs ${shopSettings.minOrder}`);
        return;
    }

    setIsOrderPlacing(true);

    try {
      // Data Cleaning
      const cleanItems = {};
      Object.values(cart).forEach(item => {
        cleanItems[item.id] = {
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.finalPrice,
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

      // Direct DB Reference Use
      await push(ref(dbRef.current, 'orders'), orderData);
      
      alert("✅ Order Placed Successfully!");
      setCart({});
      setIsCartOpen(false);
      setCustomer({ name: '', phone: '', address: '', location: null });
    } catch (err) {
      console.error("Order Failed:", err);
      alert("Failed to place order: " + err.message);
    } finally {
      setIsOrderPlacing(false);
    }
  };

  // --- RENDER ---
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold px-4 text-center">{error}</div>;

  if (!shopSettings.isActive) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
            <Store size={64} className="text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Store Closed</h1>
            <p className="text-gray-500">Not accepting orders right now.</p>
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
                
                <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition">
                    <ShoppingCart className="text-gray-700" size={24} />
                    {Object.keys(cart).length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                            {Object.values(cart).reduce((a, b) => a + b.qty, 0)}
                        </span>
                    )}
                </button>
            </div>

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

      {/* PRODUCT LIST */}
      <main className="max-w-2xl mx-auto p-4 grid grid-cols-2 gap-3">
        {filteredProducts.map((item) => {
            const price = getPrice(item); // Using Helper
            const qtyInCart = cart[item.id]?.qty || 0;
            const isOutOfStock = (item.quantity || 0) <= 0;

            return (
                <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                   <div>
                       {/* Price Display */}
                       <div className="flex items-baseline gap-2 mb-3">
                            <span className="font-black text-blue-600">Rs {price}</span>
                            {item.retailPrice > price && (
                                <span className="text-xs text-gray-400 line-through">Rs {item.retailPrice}</span>
                            )}
                       </div>
                       
                       <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">{item.name}</h3>
                       {item.nameInUrdu && <p className="text-xs text-gray-400 font-arabic mb-2 text-right">{item.nameInUrdu}</p>}
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

      {/* CART BUTTON */}
      {!isCartOpen && Object.keys(cart).length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-20">
              <button onClick={() => setIsCartOpen(true)} className="w-full bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex justify-between items-center">
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

      {/* CART MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="font-black text-xl text-gray-800">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-gray-500"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.values(cart).map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-400">Rs {item.finalPrice} x {item.qty}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-800">Rs {item.finalPrice * item.qty}</span>
                            <div className="flex items-center bg-gray-100 rounded-lg h-8">
                                <button onClick={() => removeFromCart(item.id)} className="w-8 h-full flex items-center justify-center text-gray-600">-</button>
                                <button onClick={() => addToCart(item)} className="w-8 h-full flex items-center justify-center text-gray-600">+</button>
                            </div>
                        </div>
                    </div>
                ))}

                {Object.keys(cart).length > 0 && (
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="mt-8 space-y-5">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-3 text-sm uppercase flex items-center gap-2">
                                <MapPin size={16} /> Delivery Details
                            </h3>
                            <div className="space-y-3">
                                <input required type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-blue-200 text-sm" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
                                <input required type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-blue-200 text-sm" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
                                <textarea required placeholder="Address" rows="2" className="w-full p-3 rounded-lg border border-blue-200 text-sm" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} />
                                <button type="button" onClick={handleGetLocation} className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 ${customer.location ? 'bg-green-100 text-green-700' : 'bg-white border border-blue-200 text-blue-600'}`}>
                                    {customer.location ? <><CheckCircle size={14} /> Location Saved</> : <><Navigation size={14} /> Share GPS Location</>}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 pt-2 text-sm">
                            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>Rs {cartTotal}</span></div>
                            <div className="flex justify-between text-gray-500"><span>Delivery Fee</span><span>Rs {shopSettings.deliveryFee}</span></div>
                            <div className="flex justify-between text-gray-900 font-black text-lg border-t pt-2 mt-2"><span>Total</span><span>Rs {finalTotal}</span></div>
                        </div>
                    </form>
                )}
            </div>

            <div className="p-4 border-t bg-white">
                {Object.keys(cart).length > 0 && (
                    <button form="checkout-form" type="submit" disabled={isOrderPlacing} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
                        {isOrderPlacing ? <span className="loading loading-spinner"></span> : `Confirm Order • Rs ${finalTotal}`}
                    </button>
                )}
            </div>
        </div>
      )}
    </div>
  );
}


