
import React, { useState, useEffect, useCallback } from 'react';
import { ARTWORKS } from '../constants';
import { Artwork } from '../types';

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

// Default password: "bahadery2026" - CHANGE THIS!
// To set a new password, hash it using hashPassword() in browser console and replace the value below
const ADMIN_PASSWORD_HASH = hashPassword("bahadery2026");

const ImageManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'artworks' | 'site'>('artworks');
  const [items, setItems] = useState<Artwork[]>([]);
  const [siteImages, setSiteImages] = useState<Record<string, string>>({});

  // Check if user is authenticated on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('bahadery_admin_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputHash = hashPassword(passwordInput);

    if (inputHash === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      sessionStorage.setItem('bahadery_admin_auth', 'authenticated');
      setShowPasswordError(false);
      setPasswordInput('');
    } else {
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
    sessionStorage.removeItem('bahadery_admin_auth');
    setPasswordInput('');
  };

  // Unified load function
  const loadData = useCallback(() => {
    const savedItems = localStorage.getItem('bahadery_art_collection');
    const savedImages = localStorage.getItem('bahadery_art_images');

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(ARTWORKS);
    }

    if (savedImages) {
      setSiteImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, loadData]);

  const persistData = (newItems: Artwork[], newSiteImages: Record<string, string>) => {
    // 1. Update items list
    localStorage.setItem('bahadery_art_collection', JSON.stringify(newItems));

    // 2. Prepare the master image store
    // We take the existing site images and add/update with artwork data URLs
    const masterImageStore = { ...newSiteImages };
    const titles: Record<string, string> = {};

    newItems.forEach(item => {
      if (item.imageUrl && item.imageUrl.startsWith('data:')) {
        masterImageStore[item.id] = item.imageUrl;
      }
      titles[item.id] = item.title;
    });

    localStorage.setItem('bahadery_art_images', JSON.stringify(masterImageStore));
    localStorage.setItem('bahadery_art_titles', JSON.stringify(titles));

    // Update state to reflect changes in UI
    setItems(newItems);
    setSiteImages(masterImageStore);
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

  const handleFileUpload = (id: string, file: File, isSiteImage = false) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (isSiteImage) {
        const updatedSiteImages = { ...siteImages, [id]: base64 };
        persistData(items, updatedSiteImages);
      } else {
        updateArtwork(id, { imageUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload();
  };

  const clearAll = () => {
    if (confirm('RESET ALL? This will clear all custom uploads.')) {
      localStorage.removeItem('bahadery_art_collection');
      localStorage.removeItem('bahadery_art_images');
      localStorage.removeItem('bahadery_art_titles');
      window.location.reload();
    }
  };

  // Don't show button to regular visitors
  // Only show when user presses special key combination (Ctrl + Alt + A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Changed to Ctrl + Alt + A to avoid conflict with Chrome's Search Tabs (Cmd + Shift + A)
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Show password prompt if opened but not authenticated
  if (isOpen && !isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
        <div className="bg-white rounded-lg shadow-2xl p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="serif text-3xl italic mb-2">Admin Access</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
              Portfolio Manager Authentication
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">
                Enter Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-black outline-none transition-colors text-center text-lg tracking-wider"
                placeholder="••••••••"
              />
              {showPasswordError && (
                <p className="text-red-500 text-xs mt-2 text-center animate-fadeIn">
                  ✗ Incorrect password. Please try again.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setPasswordInput('');
                  setShowPasswordError(false);
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-all text-[10px] uppercase tracking-widest font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all text-[10px] uppercase tracking-widest font-bold shadow-lg"
              >
                Access Manager
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">
              Default Password: <span className="font-mono font-bold">bahadery2026</span>
            </p>
            <p className="text-[8px] text-gray-300 mt-2 italic">
              Change this in ImageManager.tsx after first login
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything if not opened
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[300] bg-white overflow-y-auto p-6 sm:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8 border-b border-gray-100 pb-10">
          <div>
            <h2 className="serif text-5xl italic mb-2">Portfolio Manager</h2>
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.3em] font-medium">
              Manage your artwork galleries and special page photos
            </p>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <button
              onClick={handleLogout}
              className="flex-1 lg:flex-none text-[10px] bg-red-50 text-red-600 px-8 py-4 hover:bg-red-100 tracking-widest uppercase transition-all font-bold border border-red-200"
            >
              🔒 Logout
            </button>
            <button
              onClick={handleClose}
              className="flex-1 lg:flex-none text-[10px] bg-black text-white px-12 py-4 hover:opacity-80 tracking-widest uppercase transition-all shadow-xl font-bold"
            >
              Save & Exit
            </button>
          </div>
        </div>

        <div className="flex gap-12 border-b border-gray-100 mb-10">
          <button
            onClick={() => setActiveTab('artworks')}
            className={`pb-4 text-[11px] tracking-[0.3em] uppercase font-bold transition-all border-b-2 ${activeTab === 'artworks' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            Manage Artworks ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('site')}
            className={`pb-4 text-[11px] tracking-[0.3em] uppercase font-bold transition-all border-b-2 ${activeTab === 'site' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            Site Content (About / Contact)
          </button>
        </div>

        {activeTab === 'artworks' ? (
          <>
            <div className="mb-10 flex justify-end">
              <button
                onClick={handleAddItem}
                className="text-[10px] bg-green-600 text-white px-10 py-4 hover:bg-green-700 tracking-widest uppercase transition-all shadow-lg font-bold rounded-sm"
              >
                + Add New Artwork
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {items.map((art) => (
                <div key={art.id} className="border border-gray-100 p-8 bg-white shadow-sm flex flex-col group hover:shadow-2xl transition-all relative rounded-sm">
                  <button
                    onClick={() => handleDeleteItem(art.id)}
                    className="absolute top-4 right-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all p-2 rounded-md shadow-sm z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="space-y-5 mb-8">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Artwork Name</label>
                      <input
                        type="text"
                        value={art.title || ''}
                        onChange={(e) => updateArtwork(art.id, { title: e.target.value })}
                        className="w-full text-sm font-medium border-b-2 border-gray-100 py-2 focus:border-black outline-none transition-colors bg-gray-50/50 px-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Category</label>
                        <select
                          value={art.category}
                          onChange={(e) => updateArtwork(art.id, { category: e.target.value as any })}
                          className="w-full text-[11px] border-b-2 border-gray-100 py-2 outline-none uppercase tracking-widest font-bold bg-gray-50/50 px-2"
                        >
                          <option value="original">Original</option>
                          <option value="limited">Limited Edition</option>
                          <option value="postcard">Postcard</option>
                          <option value="indoor">Indoor</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Year</label>
                        <input
                          type="text"
                          value={art.year || ''}
                          onChange={(e) => updateArtwork(art.id, { year: e.target.value })}
                          className="w-full text-[11px] border-b-2 border-gray-100 py-2 outline-none font-mono bg-gray-50/50 px-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-4 p-4 bg-gray-50/50 border border-gray-100 rounded-md">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">Price (AED/€)</label>
                        <input
                          type="number"
                          value={art.price || ''}
                          onChange={(e) => updateArtwork(art.id, { price: e.target.value ? parseFloat(e.target.value) : undefined })}
                          className="w-full text-[11px] border-b-2 border-gray-100 py-1 outline-none font-mono bg-transparent"
                        />
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!art.isSoldOut}
                            onChange={(e) => updateArtwork(art.id, { isSoldOut: e.target.checked })}
                            className="w-4 h-4 accent-black"
                          />
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Sold</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!art.showInStore}
                            onChange={(e) => updateArtwork(art.id, { showInStore: e.target.checked })}
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Store</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center mb-6 overflow-hidden border border-dashed border-gray-300 relative rounded-sm">
                    {art.imageUrl ? (
                      <img src={art.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <span className="text-[10px] text-gray-400 italic uppercase tracking-widest">No Image</span>
                    )}
                  </div>

                  <label className="cursor-pointer bg-black text-white px-4 py-4 text-[10px] text-center hover:bg-gray-800 transition-all tracking-[0.3em] uppercase font-bold shadow-md rounded-sm">
                    {art.imageUrl ? 'Change Image' : 'Upload Image'}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(art.id, e.target.files[0])}
                    />
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="serif text-3xl italic">About You (Artist Portrait)</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Appears at the top of your biography. Vertical portraits are best.
              </p>
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden border border-dashed border-gray-300 flex items-center justify-center relative">
                {siteImages['site-about-portrait'] ? (
                  <img src={siteImages['site-about-portrait']} className="w-full h-full object-cover" alt="About You" />
                ) : (
                  <span className="text-[10px] text-gray-400 italic uppercase tracking-widest text-center px-4">Using Default Portrait</span>
                )}
              </div>
              <label className="block w-full cursor-pointer bg-black text-white px-4 py-4 text-[10px] text-center hover:bg-gray-800 transition-all tracking-[0.3em] uppercase font-bold shadow-md rounded-sm">
                Upload New Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('site-about-portrait', e.target.files[0], true)}
                />
              </label>
            </div>

            <div className="space-y-6">
              <h3 className="serif text-3xl italic">Contact Feature Photo</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Appears next to the contact form. Use an atmospheric shot.
              </p>
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden border border-dashed border-gray-300 flex items-center justify-center relative">
                {siteImages['site-contact-feature'] ? (
                  <img src={siteImages['site-contact-feature']} className="w-full h-full object-cover" alt="Contact Page" />
                ) : (
                  <span className="text-[10px] text-gray-400 italic uppercase tracking-widest text-center px-4">Using Default Feature</span>
                )}
              </div>
              <label className="block w-full cursor-pointer bg-black text-white px-4 py-4 text-[10px] text-center hover:bg-gray-800 transition-all tracking-[0.3em] uppercase font-bold shadow-md rounded-sm">
                Upload New Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('site-contact-feature', e.target.files[0], true)}
                />
              </label>
            </div>
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
          <button
            onClick={clearAll}
            className="text-[9px] text-red-300 hover:text-red-500 tracking-[0.4em] uppercase transition-colors"
          >
            Dangerous: Reset All Website Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
