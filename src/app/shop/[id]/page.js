'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, serverTimestamp } from 'firebase/database';
import { ShoppingCart, MapPin, Phone, Search, X, Navigation, Store, CheckCircle, Package } from 'lucide-react';

export default function ShopPage() {
  const params = useParams();
  const userId = params.id;
  const dbRef = useRef(null); 

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [shopSettings, setShopSettings] = useState({
    name: 'Loading...',
    phone: '',
    address: '',
    deliveryFee: 0,
    minOrder: 0,
    isActive: true,
    logo: null,
    currency: 'Rs'
  });
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);
  
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    location: null 
  });

  // --- INIT ---
  useEffect(() => {
    if (!userId) return;

    const initShop = async () => {
      try {
        const res = await fetch(`/api/shop-config?id=${userId}`);
        if (!res.ok) throw new Error("Store unavailable.");
        const data = await res.json();
        
        setShopSettings(prev => ({
            ...prev,
            name: data.shopName || prev.name,
        }));

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
      if (getApps().some(app => app.name === appName)) {
        shopApp = getApp(appName);
      } else {
        shopApp = initializeApp(firebaseConfig, appName);
      }
      
      const db = getDatabase(shopApp);
      dbRef.current = db;

      // SETTINGS LISTENER
      onValue(ref(db, 'settings'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const rawSettings = Array.isArray(data) ? data[0] : Object.values(data)[0]; 
            if (rawSettings) {
                const business = rawSettings.business || {};
                const online = rawSettings.onlineStore || {};
                const user = rawSettings.user || {};

                setShopSettings(prev => ({
                    ...prev,
                    name: online.displayName || business.businessName || "Online Store",
                    phone: online.phone || business.phoneNo || user.phoneNo || "",
                    address: business.address || "",
                    logo: business.logo || null,
                    deliveryFee: Number(online.deliveryFee || 0),
                    minOrder: Number(online.minOrder || 0),
                    isActive: online.isActive ?? true,
                    currency: business.currency || 'Rs'
                }));
            }
        }
      });

      // PRODUCTS LISTENER
      onValue(ref(db, 'products'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productList = Object.values(data).filter(p => p && p.name && !p._deleted);
          setProducts(productList);
          setFilteredProducts(productList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      });

    } catch (err) {
      setError("Connection failed.");
      setLoading(false);
    }
  };

  // --- FILTERING ---
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

  // --- 🚨 CRITICAL LOGIC: BATCH HANDLING ---
  const getProductDetails = (item) => {
      let totalStock = 0;
      let activePrice = Number(item.sellPrice || 0);
      let originalPrice = Number(item.retailPrice || 0);

      // Agar Batches hain, toh unhe scan karo
      if (item.batchCode && Array.isArray(item.batchCode) && item.batchCode.length > 0) {
          let batchStockSum = 0;
          let maxBatchPrice = 0;
          let hasActiveBatch = false;

          item.batchCode.forEach(batch => {
              const qty = Number(batch.quantity || 0);
              const price = Number(batch.sellPrice || 0);

              // Sirf un batches ko gino jinme stock hai
              if (qty > 0) {
                  batchStockSum += qty;
                  hasActiveBatch = true;
                  // Sabse mehnga price uthao (Safety ke liye)
                  if (price > maxBatchPrice) maxBatchPrice = price;
              }
          });

          // Agar batches mein stock mila, to Root values ko overwrite karo
          if (hasActiveBatch) {
              totalStock = batchStockSum;
              if (maxBatchPrice > 0) activePrice = maxBatchPrice;
          } 
          // Agar batches hain par sab khaali (0 qty) hain, to stock 0 ho jayega
          else if (item.batchCode.length > 0) {
              totalStock = 0; 
          }
      } else {
          // Fallback: Agar batches nahi hain, Root values use karo
          totalStock = Number(item.quantity || 0);
      }

      return {
          price: activePrice,
          originalPrice: originalPrice,
          stock: totalStock,
          urdu: item.nameInUrdu
      };
  };

  // --- CART ACTIONS ---
  const addToCart = (product) => {
    const { price, stock } = getProductDetails(product);

    if (price <= 0) {
        alert("Price invalid. Cannot add.");
        return;
    }

    setCart(prev => {
      const currentQty = prev[product.id]?.qty || 0;
      if (currentQty >= stock) {
        alert("Out of Stock!");
        return prev;
      }
      return {
        ...prev,
        [product.id]: { 
            ...product, 
            qty: currentQty + 1, 
            finalPrice: price // Snapshot price
        }
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
  const finalTotal = cartTotal + shopSettings.deliveryFee;

  // --- LOCATION & ORDER ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCustomer(prev => ({
          ...prev,
          location: {
            lat: latitude,
            lng: longitude,
            mapLink: `https://www.google.com/maps?q=${latitude},${longitude}`
          }
        }));
      },
      () => alert("Permission denied for location")
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!dbRef.current) return alert("Connection Error");

    if (cartTotal < shopSettings.minOrder) {
        alert(`Minimum order must be ${shopSettings.currency} ${shopSettings.minOrder}`);
        return;
    }

    setIsOrderPlacing(true);

    try {
      const cleanItems = {};
      Object.values(cart).forEach(item => {
        cleanItems[item.id] = {
            id: item.id,
            name: item.name,
            nameInUrdu: item.nameInUrdu || "",
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

      await push(ref(dbRef.current, 'orders'), orderData);
      
      alert("Order Placed Successfully!");
      setCart({});
      setIsCartOpen(false);
      setCustomer({ name: '', phone: '', address: '', location: null });
    } catch (err) {
      console.error(err);
      alert("Order Failed.");
    } finally {
      setIsOrderPlacing(false);
    }
  };

  // --- RENDER ---
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><span className="loading loading-spinner text-blue-600 loading-lg"></span></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold">{error}</div>;

  if (!shopSettings.isActive) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
            <Store size={64} className="text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Store Closed</h1>
            <p className="text-gray-500">Currently not accepting orders.</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-800">
      
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    {shopSettings.logo ? (
                        <img src={shopSettings.logo} alt="Logo" className="w-10 h-10 rounded-full object-contain bg-white border" />
                    ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {shopSettings.name.charAt(0)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h1 className="font-bold text-gray-900 leading-tight truncate">{shopSettings.name}</h1>
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
                    placeholder="Search products..." 
                    className="w-full bg-gray-100 text-sm pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
      </header>

      {/* PRODUCTS */}
      <main className="max-w-2xl mx-auto p-4 grid grid-cols-2 gap-3">
        {filteredProducts.map((item) => {
            const { price, originalPrice, stock, urdu } = getProductDetails(item);
            const qtyInCart = cart[item.id]?.qty || 0;
            const isOutOfStock = stock <= 0;
            
            const hasDiscount = originalPrice > price;
            const discountPct = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

            return (
                <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full relative overflow-hidden">
                   
                   {hasDiscount && (
                       <span className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg z-0">
                           {discountPct}% OFF
                       </span>
                   )}

                   <div>
                       <div className="flex items-baseline gap-2 mb-1 mt-2">
                            <span className="font-black text-blue-600 text-lg">{shopSettings.currency} {price}</span>
                            {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
                            )}
                       </div>
                       
                       <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">{item.name}</h3>
                       {urdu && <p className="text-xs text-gray-400 font-bold text-right mb-2" dir="rtl">{urdu}</p>}
                   </div>

                   {isOutOfStock ? (
                       <div className="w-full bg-gray-100 text-gray-400 text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1">
                           <Package size={12} /> Out of Stock
                       </div>
                   ) : qtyInCart > 0 ? (
                       <div className="flex items-center justify-between bg-gray-900 text-white rounded-xl p-1 shadow-md">
                           <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg font-bold text-lg">-</button>
                           <span className="text-sm font-bold">{qtyInCart}</span>
                           <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-lg font-bold text-lg">+</button>
                       </div>
                   ) : (
                       <button onClick={() => addToCart(item)} className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-bold py-2 rounded-xl transition-all active:scale-95">
                           Add
                       </button>
                   )}
                </div>
            );
        })}
      </main>

      {/* FLOATING TOTAL */}
      {!isCartOpen && Object.keys(cart).length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-20">
              <button onClick={() => setIsCartOpen(true)} className="w-full bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex justify-between items-center transform transition-all active:scale-95">
                  <div className="flex items-center gap-3">
                      <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {Object.values(cart).reduce((a, b) => a + b.qty, 0)}
                      </div>
                      <div className="text-left">
                          <p className="text-[10px] text-gray-300 uppercase font-bold tracking-wider">Total Payable</p>
                          <p className="font-bold text-lg leading-none">{shopSettings.currency} {finalTotal}</p>
                      </div>
                  </div>
                  <span className="font-bold text-sm flex items-center gap-2">View Cart <Navigation size={14} className="rotate-90" /></span>
              </button>
          </div>
      )}

      {/* CART OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="font-black text-xl text-gray-800">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-100"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.values(cart).map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            {item.nameInUrdu && <p className="text-xs text-gray-400 text-right">{item.nameInUrdu}</p>}
                            <p className="text-xs text-gray-400">{shopSettings.currency} {item.finalPrice} x {item.qty}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-800">{shopSettings.currency} {item.finalPrice * item.qty}</span>
                            <div className="flex items-center bg-gray-100 rounded-lg h-8 border border-gray-200">
                                <button onClick={() => removeFromCart(item.id)} className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-red-500 font-bold">-</button>
                                <button onClick={() => addToCart(item)} className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-green-500 font-bold">+</button>
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
                                <input required type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
                                <input required type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
                                <textarea required placeholder="Full Address (House #, Street, City)" rows="2" className="w-full p-3 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} />
                                
                                <button type="button" onClick={handleGetLocation} className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${customer.location ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
                                    {customer.location ? <><CheckCircle size={14} /> GPS Location Saved</> : <><Navigation size={14} /> Share GPS Location</>}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2 text-sm">
                            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{shopSettings.currency} {cartTotal}</span></div>
                            <div className="flex justify-between text-gray-500"><span>Delivery Fee</span><span>{shopSettings.currency} {shopSettings.deliveryFee}</span></div>
                            <div className="flex justify-between text-gray-900 font-black text-lg border-t pt-2 mt-2"><span>Total</span><span>{shopSettings.currency} {finalTotal}</span></div>
                        </div>
                    </form>
                )}
            </div>

            <div className="p-4 border-t bg-white safe-area-bottom">
                {Object.keys(cart).length > 0 && (
                    <button form="checkout-form" type="submit" disabled={isOrderPlacing} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        {isOrderPlacing ? <span className="loading loading-spinner"></span> : `Place Order • ${shopSettings.currency} ${finalTotal}`}
                    </button>
                )}
            </div>
        </div>
      )}
    </div>
  );
}


