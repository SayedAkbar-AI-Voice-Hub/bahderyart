
import React, { useState, useEffect, useCallback } from 'react';
import { ARTWORKS } from '../constants';
import { Artwork } from '../types';
import { saveImage, getImage, clearAllImages } from '../db';

// Simple hash function for password verification
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// Credentials
const ADMIN_PASSWORD_HASH = hashPassword("bahadery2026");
const ADMIN_USERNAME = "bahaderyart";

const ImageManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState<'artworks' | 'site'>('artworks');
  const [items, setItems] = useState<Artwork[]>([]);
  const [siteImages, setSiteImages] = useState<Record<string, string>>({});

  // Unified load function that handles IndexedDB
  const loadData = useCallback(async () => {
    const savedItems = localStorage.getItem('bahadery_art_collection');
    const savedSiteMeta = localStorage.getItem('bahadery_art_images_meta');

    let currentItems: Artwork[] = savedItems ? JSON.parse(savedItems) : ARTWORKS;
    let currentSiteImages: Record<string, string> = savedSiteMeta ? JSON.parse(savedSiteMeta) : {};

    // For any items marked as 'indexeddb', fetch the actual image
    const hydratedItems = await Promise.all(
      currentItems.map(async (item) => {
        if (item.imageUrl === 'indexeddb') {
          const actualImage = await getImage(item.id);
          return { ...item, imageUrl: actualImage || '' };
        }
        return item;
      })
    );

    const hydratedSiteImages: Record<string, string> = {};
    const siteKeys = Object.keys(currentSiteImages);
    for (const key of siteKeys) {
      if (currentSiteImages[key] === 'indexeddb') {
        const actualImage = await getImage(key);
        hydratedSiteImages[key] = actualImage || '';
      } else {
        hydratedSiteImages[key] = currentSiteImages[key];
      }
    }

    setItems(hydratedItems);
    setSiteImages(hydratedSiteImages);
  }, []);

  // 1. Check if user is authenticated on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('bahadery_admin_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // 2. Global event listener to open manager from footer/about page
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-bahadery-admin', handleOpenEvent);
    return () => window.removeEventListener('open-bahadery-admin', handleOpenEvent);
  }, []);

  // 3. Load data when opened
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, loadData]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputHash = hashPassword(passwordInput);

    if (usernameInput === ADMIN_USERNAME && inputHash === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      sessionStorage.setItem('bahadery_admin_auth', 'authenticated');
      setShowError(false);
      setPasswordInput('');
      setUsernameInput('');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
    sessionStorage.removeItem('bahadery_admin_auth');
    setPasswordInput('');
    setUsernameInput('');
  };

  const persistData = async (newItems: Artwork[], newSiteImages: Record<string, string>) => {
    // metadata storage with markers
    const itemsForMetadata = newItems.map(item => {
      if (item.imageUrl && item.imageUrl.startsWith('data:')) {
        return { ...item, imageUrl: 'indexeddb' };
      }
      return item;
    });

    localStorage.setItem('bahadery_art_collection', JSON.stringify(itemsForMetadata));

    const siteMarkers: Record<string, string> = {};
    Object.keys(newSiteImages).forEach(key => {
      if (newSiteImages[key].startsWith('data:')) {
        siteMarkers[key] = 'indexeddb';
      } else {
        siteMarkers[key] = newSiteImages[key];
      }
    });
    localStorage.setItem('bahadery_art_images_meta', JSON.stringify(siteMarkers));

    setItems([...newItems]);
    setSiteImages({ ...newSiteImages });
  };

  const handleAddItem = () => {
    const newId = `custom-${Date.now()}`;
    const newItem: Artwork = {
      id: newId,
      title: 'New Artwork',
      category: 'original',
      imageUrl: '',
      year: new Date().getFullYear().toString(),
      price: undefined,
      isSoldOut: false,
      showInStore: false
    };
    const updated = [newItem, ...items];
    persistData(updated, siteImages);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Delete this artwork?')) {
      const filtered = items.filter(item => item.id !== id);
      persistData(filtered, siteImages);
    }
  };

  const updateArtwork = (id: string, updates: Partial<Artwork>) => {
    const updated = items.map(item => item.id === id ? { ...item, ...updates } : item);
    persistData(updated, siteImages);
  };

  // --- Drag and Drop Handlers ---
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedItemIndex];

    // Remove from old position and insert at new position
    newItems.splice(draggedItemIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setDraggedItemIndex(null);
    persistData(newItems, siteImages);
  };

  const handleFileUpload = async (id: string, file: File, isSiteImage = false) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;

      // Save to IndexedDB
      await saveImage(id, base64);

      if (isSiteImage) {
        const updatedSiteImages = { ...siteImages, [id]: base64 };
        persistData(items, updatedSiteImages);
      } else {
        const updatedItems = items.map(item => item.id === id ? { ...item, imageUrl: base64 } : item);
        persistData(updatedItems, siteImages);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const clearAll = async () => {
    if (confirm('RESET ALL? This will clear all custom uploads.')) {
      localStorage.removeItem('bahadery_art_collection');
      localStorage.removeItem('bahadery_art_images_meta');
      localStorage.removeItem('bahadery_art_titles');
      await clearAllImages();
      window.location.reload();
    }
  };

  // RENDER LOGIC
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-[50] text-[8px] uppercase tracking-[0.4em] text-black/10 hover:text-black transition-all bg-transparent border-none p-0 m-0 cursor-pointer font-bold opacity-0 hover:opacity-100"
        title="Admin Login"
      >
        Dev Manager
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#f9faff] flex items-center justify-center p-6 animate-fadeIn">
        <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-12 max-w-[480px] w-full mt-[-10vh]">
          <form onSubmit={handleLoginSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-[#1a1c3d] font-bold text-lg">Username</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                autoFocus
                className="w-full px-8 py-5 border-2 border-[#5c55fc] rounded-full text-lg outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#5c55fc]/20 transition-all font-medium text-black"
                placeholder="Username"
                required
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[#1a1c3d] font-bold text-lg">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-8 py-5 bg-[#fcfdfe] border border-gray-100 rounded-full text-lg outline-none placeholder:text-gray-400 focus:border-[#5c55fc] transition-all font-medium text-black"
                placeholder="Password"
                required
              />
            </div>
            {showError && <p className="text-red-500 text-sm text-center font-medium animate-pulse">Invalid credentials.</p>}
            <button type="submit" className="w-full py-5 bg-[#5c55fc] text-white rounded-full text-xl font-bold hover:bg-[#4a42f5] active:scale-[0.98] transition-all shadow-[0_10px_30px_-10px_rgba(92,85,252,0.5)] mt-4">Log in</button>
            <div className="text-center space-y-4 pt-4">
              <button type="button" onClick={() => setIsOpen(false)} className="text-[#5c55fc] font-bold text-lg hover:underline">Back to Website</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-white overflow-y-auto p-6 sm:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8 border-b border-gray-100 pb-10">
          <div>
            <h2 className="serif text-5xl italic mb-2">Portfolio Manager</h2>
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.3em] font-medium">Manage your artwork galleries and special page photos</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <button onClick={handleLogout} className="flex-1 lg:flex-none text-[10px] bg-red-50 text-red-600 px-8 py-4 hover:bg-red-100 tracking-widest uppercase transition-all font-bold border border-red-200">🔒 Logout</button>
            <button onClick={handleClose} className="flex-1 lg:flex-none text-[10px] bg-black text-white px-12 py-4 hover:opacity-80 tracking-widest uppercase transition-all shadow-xl font-bold">Save & Exit</button>
          </div>
        </div>

        <div className="flex gap-12 border-b border-gray-100 mb-10">
          <button onClick={() => setActiveTab('artworks')} className={`pb-4 text-[11px] tracking-[0.3em] uppercase font-bold transition-all border-b-2 ${activeTab === 'artworks' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>Manage Artworks ({items.length})</button>
          <button onClick={() => setActiveTab('site')} className={`pb-4 text-[11px] tracking-[0.3em] uppercase font-bold transition-all border-b-2 ${activeTab === 'site' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>Site Content</button>
        </div>

        {activeTab === 'artworks' ? (
          <>
            <div className="mb-10 flex justify-end">
              <button onClick={handleAddItem} className="text-[10px] bg-green-600 text-white px-10 py-4 hover:bg-green-700 tracking-widest uppercase transition-all shadow-lg font-bold rounded-sm">+ Add New Artwork</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {items.map((art, index) => (
                <div
                  key={art.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`border border-gray-100 p-8 bg-white shadow-sm flex flex-col group hover:shadow-2xl transition-all relative rounded-sm cursor-move ${draggedItemIndex === index ? 'opacity-40 scale-95' : ''}`}
                >
                  <div className="absolute top-4 left-4 text-gray-300 group-hover:text-black transition-colors" title="Drag to reorder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" /></svg>
                  </div>

                  <button onClick={() => handleDeleteItem(art.id)} className="absolute top-4 right-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all p-2 rounded-md shadow-sm z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <div className="space-y-5 mb-8">
                    <input type="text" value={art.title || ''} onChange={(e) => updateArtwork(art.id, { title: e.target.value })} className="w-full text-sm font-medium border-b-2 border-gray-100 py-2 outline-none bg-gray-50/50 px-2" placeholder="Artwork Name" />
                    <div className="grid grid-cols-2 gap-6">
                      <select value={art.category} onChange={(e) => updateArtwork(art.id, { category: e.target.value as any })} className="text-[11px] border-b-2 border-gray-100 py-2 outline-none uppercase font-bold bg-gray-50/50 px-2">
                        <option value="original">Original</option>
                        <option value="limited">Limited Edition</option>
                        <option value="postcard">Postcard</option>
                        <option value="indoor">Indoor</option>
                      </select>
                      <input type="text" value={art.year || ''} onChange={(e) => updateArtwork(art.id, { year: e.target.value })} className="text-[11px] border-b-2 border-gray-100 py-2 outline-none bg-gray-50/50 px-2" placeholder="Year" />
                    </div>
                    <div className="space-y-4 p-4 bg-gray-50/50 rounded-md">
                      <input type="number" value={art.price || ''} onChange={(e) => updateArtwork(art.id, { price: e.target.value ? parseFloat(e.target.value) : undefined })} className="w-full text-[11px] border-b-2 border-transparent py-1 outline-none" placeholder="Price (AED/€)" />
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!art.isSoldOut} onChange={(e) => updateArtwork(art.id, { isSoldOut: e.target.checked })} className="w-4 h-4 accent-black" /><span className="text-[10px] uppercase font-bold text-gray-500">Sold</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!art.showInStore} onChange={(e) => updateArtwork(art.id, { showInStore: e.target.checked })} className="w-4 h-4 accent-blue-600" /><span className="text-[10px] uppercase font-bold text-blue-600">Store</span></label>
                      </div>
                    </div>
                  </div>
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center mb-6 overflow-hidden relative rounded-sm">
                    {art.imageUrl ? <img src={art.imageUrl} className="w-full h-full object-cover" alt="Preview" /> : <span className="text-[10px] text-gray-400 italic uppercase">No Image</span>}
                  </div>
                  <label className="cursor-pointer bg-black text-white px-4 py-4 text-[10px] text-center hover:bg-gray-800 transition-all uppercase font-bold rounded-sm">
                    {art.imageUrl ? 'Change Image' : 'Upload Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(art.id, e.target.files[0])} />
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="serif text-3xl italic">About You (Artist Portrait)</h3>
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden border flex items-center justify-center">
                {siteImages['site-about-portrait'] ? <img src={siteImages['site-about-portrait']} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-400 uppercase italic">Default Portrait</span>}
              </div>
              <label className="block w-full cursor-pointer bg-black text-white px-4 py-4 text-[10px] text-center uppercase font-bold rounded-sm">
                Upload Portrait
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload('site-about-portrait', e.target.files[0], true)} />
              </label>
            </div>
          </div>
        )}
        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
          <button onClick={clearAll} className="text-[9px] text-red-300 hover:text-red-500 tracking-[0.4em] uppercase">Dangerous: Reset All Website Content</button>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
