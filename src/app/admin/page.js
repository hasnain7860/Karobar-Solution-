"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [globalFeatures, setGlobalFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // UI States
  const [editingClient, setEditingClient] = useState(null);
  const [showFeatureManager, setShowFeatureManager] = useState(false);
  const [saving, setSaving] = useState(false);

  // New Feature Input State
  const [newFeatureInput, setNewFeatureInput] = useState({ id: "", label: "" });

  // --- 1. AUTH & INITIAL FETCH ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        fetchAllData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Clients
      const clientSnap = await getDocs(collection(db, "client"));
      setClients(clientSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // 2. Fetch Global Features (Store in a separate doc 'settings/features')
      const featureDoc = await getDoc(doc(db, "settings", "features"));
      if (featureDoc.exists()) {
        setGlobalFeatures(featureDoc.data().list || []);
      } else {
        // Agar pehli baar hai to default create kar do
        const defaultFeatures = [
            { id: 'module_inventory', label: 'Inventory Management' },
            { id: 'module_sales', label: 'Sales / POS' },
            { id: 'module_accounting', label: 'Accounting' },
            { id: 'module_qr_shopping', label: 'QR Code Store' },
            { id: 'ui_credit_pro', label: 'Majid Credit View' },
        ];
        await setDoc(doc(db, "settings", "features"), { list: defaultFeatures });
        setGlobalFeatures(defaultFeatures);
      }
    } catch (err) {
      alert("Error fetching data: " + err.message);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, email, password); } 
    catch (err) { setError("Login failed: " + err.message); }
  };

  // --- 2. GLOBAL FEATURE MANAGEMENT ---
  const handleAddGlobalFeature = async () => {
      if (!newFeatureInput.id || !newFeatureInput.label) return alert("ID aur Label dono likho");
      
      const updatedList = [...globalFeatures, newFeatureInput];
      
      try {
          await setDoc(doc(db, "settings", "features"), { list: updatedList });
          setGlobalFeatures(updatedList);
          setNewFeatureInput({ id: "", label: "" });
      } catch (err) {
          alert("Error adding feature: " + err.message);
      }
  };

  const handleDeleteGlobalFeature = async (idToDelete) => {
      if(!confirm("Are you sure? Is feature ko delete karne se clients ke pas option gayab ho jayega.")) return;
      const updatedList = globalFeatures.filter(f => f.id !== idToDelete);
      try {
          await setDoc(doc(db, "settings", "features"), { list: updatedList });
          setGlobalFeatures(updatedList);
      } catch (err) {
          alert("Error deleting: " + err.message);
      }
  };

  // --- 3. SAVE CLIENT LOGIC ---
  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!editingClient.id) return alert("Client ID (Doc ID) is missing!");

    setSaving(true);
    try {
      const docRef = doc(db, "client", editingClient.id);
      
      // Prepare Data
      const dataToSave = {
        name: editingClient.name || "",
        email: editingClient.email || "",
        role: editingClient.role || "seller",
        planId: editingClient.planId || "free",
        subscriptionStatus: editingClient.subscriptionStatus || "active",
        onlineStoreEnabled: editingClient.onlineStoreEnabled === true,
        
        // Admin Object
        AdminFirebaseObject: editingClient.AdminFirebaseObject || "",

        // Shadow Creds (Proper Structure)
        shadowCreds: {
            email: editingClient.shadowEmail || editingClient.email, // Prefer specific shadow email, fallback to main
            password: editingClient.shadowPassword || ""
        },

        // Config with UI Mode & Features
        clientConfig: {
            ui_mode: editingClient.ui_mode || "unified",
            theme_color: editingClient.theme_color || "#000000",
            features: editingClient.features || {} 
        }
      };

      // Password Logic (Only update if typed)
      if (editingClient.new_password_input) {
          dataToSave.password = editingClient.new_password_input;
      }

      await setDoc(docRef, dataToSave, { merge: true });
      
      alert("Client Saved Successfully!");
      setEditingClient(null);
      fetchAllData(); 
      
    } catch (err) {
      alert("Error saving: " + err.message);
    }
    setSaving(false);
  };

  // Toggle Feature Helper
  const toggleClientFeature = (featureId) => {
      const currentFeatures = editingClient.features || {};
      setEditingClient({
          ...editingClient,
          features: { ...currentFeatures, [featureId]: !currentFeatures[featureId] }
      });
  };

  // New Client Template
  const handleCreateNew = () => {
      setEditingClient({
          id: "",
          name: "",
          email: "",
          role: "seller",
          planId: "monthly_1000",
          subscriptionStatus: "active",
          onlineStoreEnabled: false,
          ui_mode: "unified",
          features: {},
          isNew: true,
          shadowPassword: "",
          shadowEmail: ""
      });
  };

  // --- RENDER ---
  if (loading) return <div className="p-10 bg-gray-900 text-white min-h-screen flex justify-center items-center">Loading Admin System...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded border border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">Karobar Admin</h1>
          {error && <div className="bg-red-900/50 p-2 mb-4 text-sm text-red-200">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-3 bg-gray-700 rounded text-white" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full p-3 bg-gray-700 rounded text-white" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // --- EDIT FORM ---
  if (editingClient) {
    // Prep data for editing view
    if (!editingClient.features && editingClient.clientConfig?.features) editingClient.features = editingClient.clientConfig.features;
    if (!editingClient.ui_mode && editingClient.clientConfig?.ui_mode) editingClient.ui_mode = editingClient.clientConfig.ui_mode;
    
    // Prep shadow creds for inputs
    if (editingClient.shadowCreds) {
        if (!editingClient.shadowPassword) editingClient.shadowPassword = editingClient.shadowCreds.password;
        if (!editingClient.shadowEmail) editingClient.shadowEmail = editingClient.shadowCreds.email;
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded border border-gray-700 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400">
                {editingClient.isNew ? "Create New Client" : `Edit: ${editingClient.name}`}
            </h2>
            <button onClick={() => setEditingClient(null)} className="text-gray-400 hover:text-white">Cancel</button>
          </div>

          <form onSubmit={handleSaveClient} className="space-y-6">
            
            {/* 1. Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/20 p-4 rounded border border-gray-700">
              <div className="col-span-2"><h3 className="text-blue-400 font-bold mb-2 text-sm uppercase">Identity</h3></div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Doc ID</label>
                <input type="text" value={editingClient.id} onChange={e => setEditingClient({...editingClient, id: e.target.value})} disabled={!editingClient.isNew} className={`w-full p-2 bg-gray-700 rounded border border-gray-600 ${!editingClient.isNew ? 'opacity-50' : 'text-yellow-300'}`} placeholder="unique_id" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Business Name</label>
                <input type="text" value={editingClient.name} onChange={e => setEditingClient({...editingClient, name: e.target.value})} className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Main Email</label>
                <input type="text" value={editingClient.email} onChange={e => setEditingClient({...editingClient, email: e.target.value})} className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Role</label>
                <select value={editingClient.role} onChange={e => setEditingClient({...editingClient, role: e.target.value})} className="w-full p-2 bg-gray-700 rounded border border-gray-600">
                  <option value="seller">Seller</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* 2. Credentials & Shadow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-900/10 p-4 rounded border border-red-900/30">
                <div className="col-span-2 flex justify-between items-center">
                    <h3 className="text-red-400 font-bold text-sm uppercase">Security & Login</h3>
                    <a href="https://bcrypt-generator.com/" target="_blank" rel="noreferrer" className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold flex items-center gap-1">
                       🔑 Open Hash Generator
                    </a>
                </div>
                
                {/* Main Password */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Main Password (Hash)</label>
                    <input 
                        type="text" 
                        placeholder="Paste new hash here to update" 
                        value={editingClient.new_password_input || ""}
                        onChange={e => setEditingClient({...editingClient, new_password_input: e.target.value})}
                        className="w-full p-2 bg-gray-900 border border-red-800 rounded text-red-100 font-mono text-xs"
                    />
                </div>

                {/* Shadow Creds */}
                <div className="space-y-2 p-3 bg-gray-900/50 rounded border border-gray-700">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Shadow Credentials (Backup)</p>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Shadow Email"
                            value={editingClient.shadowEmail || editingClient.email || ""}
                            onChange={e => setEditingClient({...editingClient, shadowEmail: e.target.value})}
                            className="w-full p-1.5 bg-gray-800 border border-gray-600 rounded text-xs mb-1"
                        />
                         <input 
                            type="text" 
                            placeholder="Shadow Password (Plain Text)"
                            value={editingClient.shadowPassword || ""}
                            onChange={e => setEditingClient({...editingClient, shadowPassword: e.target.value})}
                            className="w-full p-1.5 bg-gray-800 border border-gray-600 rounded text-xs text-yellow-500"
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Admin Firebase Object</label>
                    <textarea 
                        rows={2}
                        value={editingClient.AdminFirebaseObject}
                        onChange={e => setEditingClient({...editingClient, AdminFirebaseObject: e.target.value})}
                        className="w-full p-2 bg-black text-green-500 font-mono text-xs rounded border border-gray-700"
                        placeholder='"{ apiKey: ... }"'
                    />
                </div>
            </div>

            {/* 3. Features Configuration (Dynamic) */}
            <div className="bg-green-900/10 p-4 rounded border border-green-900/30">
                <h3 className="text-green-400 font-bold mb-4 text-sm uppercase">Software Features</h3>
                
                <div className="mb-6">
                    <label className="block text-sm text-white mb-2 font-bold">UI Mode</label>
                    <select 
                        value={editingClient.ui_mode || "unified"}
                        onChange={e => setEditingClient({...editingClient, ui_mode: e.target.value})}
                        className="w-full md:w-1/2 p-2 bg-gray-800 rounded border border-green-600 text-white"
                    >
                        <option value="unified">Unified (Rizwan)</option>
                        <option value="split">Split (Majid)</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Fixed Features */}
                    <div onClick={() => setEditingClient({...editingClient, onlineStoreEnabled: !editingClient.onlineStoreEnabled})} className={`p-2 rounded border cursor-pointer select-none flex justify-between items-center ${editingClient.onlineStoreEnabled ? 'bg-green-600 border-green-400' : 'bg-gray-800 border-gray-600 opacity-50'}`}>
                        <span className="text-xs font-bold">Online Store / Web</span>
                        <div className={`w-3 h-3 rounded-full ${editingClient.onlineStoreEnabled ? 'bg-white' : 'bg-gray-500'}`}></div>
                    </div>

                    {/* Dynamic Global Features */}
                    {globalFeatures.map(feature => {
                        const isActive = editingClient.features?.[feature.id];
                        return (
                            <div 
                                key={feature.id}
                                onClick={() => toggleClientFeature(feature.id)}
                                className={`p-2 rounded border cursor-pointer select-none flex justify-between items-center ${isActive ? 'bg-blue-600 border-blue-400' : 'bg-gray-800 border-gray-600 opacity-50'}`}
                            >
                                <span className="text-xs font-bold">{feature.label}</span>
                                <div className="text-white text-xs font-bold">{isActive ? "✓" : ""}</div>
                            </div>
                        );
                    })}
                </div>
                {globalFeatures.length === 0 && <p className="text-xs text-gray-500 mt-2">No global features defined. Use "Manage Features" on dashboard.</p>}
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                <button type="button" onClick={() => setEditingClient(null)} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 font-bold rounded">
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- LIST VIEW & FEATURE MANAGER ---
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 gap-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            Karobar Control Center
          </h1>
          <div className="flex gap-2 flex-wrap justify-end">
              <button onClick={() => setShowFeatureManager(!showFeatureManager)} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-sm">
                {showFeatureManager ? "Close Manager" : "Manage System Features"}
              </button>
              <button onClick={handleCreateNew} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded text-sm">+ New Client</button>
              <button onClick={() => signOut(auth)} className="px-4 py-2 text-red-400 border border-red-900 rounded text-sm hover:bg-red-900/20">Logout</button>
          </div>
        </div>

        {/* FEATURE MANAGER DRAWER */}
        {showFeatureManager && (
            <div className="bg-gray-800 p-6 rounded border border-purple-500 mb-8 shadow-xl animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Global Features System</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input 
                        type="text" placeholder="Feature ID (e.g. module_qr)" 
                        value={newFeatureInput.id} onChange={e => setNewFeatureInput({...newFeatureInput, id: e.target.value})}
                        className="bg-gray-900 p-2 rounded border border-gray-600"
                    />
                    <input 
                        type="text" placeholder="Label (e.g. QR Shopping)" 
                        value={newFeatureInput.label} onChange={e => setNewFeatureInput({...newFeatureInput, label: e.target.value})}
                        className="bg-gray-900 p-2 rounded border border-gray-600"
                    />
                    <button onClick={handleAddGlobalFeature} className="bg-purple-600 hover:bg-purple-500 font-bold rounded p-2">Add Feature</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {globalFeatures.map(f => (
                        <div key={f.id} className="bg-gray-900 p-2 rounded flex justify-between items-center border border-gray-700">
                            <span className="text-xs font-mono text-gray-300">{f.label}</span>
                            <button onClick={() => handleDeleteGlobalFeature(f.id)} className="text-red-500 hover:text-red-400 font-bold px-2">×</button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* CLIENT LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className={`bg-gray-800 rounded border-l-4 p-5 relative group shadow-lg hover:bg-gray-750 transition-all ${client.role === 'Admin' ? 'border-purple-500' : 'border-blue-500'}`}>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingClient(client)} className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white font-bold">Edit</button>
              </div>

              <h3 className="text-lg font-bold truncate pr-10">{client.name || "Unknown"}</h3>
              <p className="text-xs text-gray-500 mb-2">{client.id}</p>
              
              <div className="flex gap-2 mb-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${client.subscriptionStatus === 'active' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {client.subscriptionStatus}
                  </span>
                  <span className="text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded uppercase">
                    {client.clientConfig?.ui_mode === 'split' ? 'Majid Mode' : 'Rizwan Mode'}
                  </span>
              </div>
              
              {/* Feature Tags (Only show active ones) */}
              <div className="flex flex-wrap gap-1 mt-2 h-12 overflow-hidden content-start">
                  {client.onlineStoreEnabled && <span className="text-[9px] bg-green-900/40 text-green-400 px-1 rounded border border-green-800">Store</span>}
                  {globalFeatures.map(f => (
                      client.clientConfig?.features?.[f.id] ? 
                      <span key={f.id} className="text-[9px] bg-blue-900/40 text-blue-300 px-1 rounded border border-blue-800">{f.label}</span> : null
                  ))}
              </div>
            </div>
          ))}
          {clients.length === 0 && !loading && <div className="col-span-full text-center py-20 text-gray-500">No clients found.</div>}
        </div>
      </div>
    </div>
  );
}


