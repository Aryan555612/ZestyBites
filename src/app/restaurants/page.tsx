'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, Star, Clock, Heart, ArrowRight, X, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { INITIAL_CATEGORIES } from '@/utils/mockDb';

export default function RestaurantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { restaurants, toggleWishlist, wishlist } = useApp();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cuisine') || 'All');
  const [sortBy, setSortBy] = useState<'rating' | 'delivery' | 'price'>('rating');
  const [vegOnly, setVegOnly] = useState(false);

  // Sync state with URL search params changes
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setActiveCategory(searchParams.get('cuisine') || 'All');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...restaurants];
    const q = search.toLowerCase().trim();

    // Search query logic with word-splitting support
    if (q) {
      const terms = q.split(/\s+/).filter(t => t && t !== 'hotel' && t !== 'hotels' && t !== 'restaurant' && t !== 'restaurants');
      if (terms.length > 0) {
        list = list.filter(r =>
          terms.every(term =>
            r.name.toLowerCase().includes(term) ||
            r.cuisines.some(c => c.toLowerCase().includes(term)) ||
            r.address.toLowerCase().includes(term)
          )
        );
      }
    }

    // Category filter logic
    if (activeCategory && activeCategory !== 'All') {
      list = list.filter(r =>
        r.cuisines.some(c => c.toLowerCase() === activeCategory.toLowerCase()) ||
        r.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Vegetarian filter
    if (vegOnly) {
      list = list.filter(r => r.menu.some(m => m.isVeg));
    }

    // Sorting logic
    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'delivery') return a.deliveryTime - b.deliveryTime;
      return a.priceForTwo - b.priceForTwo;
    });

    return list;
  }, [restaurants, search, activeCategory, sortBy, vegOnly]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1714]">
      <Navbar />

      {/* Header & Filter Controls */}
      <section className="py-12 border-b border-white/[0.08] relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-70 pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl font-black font-heading text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Gourmet Venues in Patan & Unjha
          </h1>
          <p className="text-xs text-dark-500 font-medium mt-1.5">{filtered.length} dining kitchens found near you</p>

          {/* Search & Filters */}
          <div className="mt-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="flex items-center gap-3 flex-1 max-w-md glass border border-white/[0.12] rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(181,147,96,0.03)] focus-within:border-primary-500/40 transition-all duration-300">
              <Search className="h-4 w-4 text-dark-500 shrink-0" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines, dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-dark-600 text-dark-100 font-medium"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-dark-500 hover:text-dark-100 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Selector Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 glass rounded-2xl px-3 py-1.5 border border-white/[0.12]">
                <SlidersHorizontal className="h-3.5 w-3.5 text-dark-500" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'rating' | 'delivery' | 'price')}
                  className="bg-transparent text-xs text-dark-200 outline-none cursor-pointer font-bold py-1.5 pr-2"
                >
                  <option value="rating" className="text-dark-800">Top Rated</option>
                  <option value="delivery" className="text-dark-800">Fastest Delivery</option>
                  <option value="price" className="text-dark-800">Lowest Price</option>
                </select>
              </div>

              <button
                onClick={() => setVegOnly(v => !v)}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold border transition-all duration-200 ${
                  vegOnly
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/20'
                    : 'glass text-dark-300 border-white/[0.12] hover:border-emerald-800/40 hover:text-emerald-800'
                }`}
              >
                <span className={`h-3 w-3 rounded border flex items-center justify-center ${vegOnly ? 'border-white' : 'border-current'}`}>
                  {vegOnly && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                Veg Only
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2.5 mt-6 overflow-x-auto pb-2.5 scrollbar-hide">
            {INITIAL_CATEGORIES.map(cat => {
              const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-4.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-[#FAF9F6] border-transparent shadow-md shadow-primary-500/20 scale-102'
                      : 'glass text-dark-300 border-white/[0.12] hover:border-primary-500/30 hover:text-primary-500'
                  }`}
                >
                  <img src={cat.image} alt={cat.name} className="h-5 w-5 rounded-lg object-cover" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-12 flex-1 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-4xl p-10 max-w-md mx-auto border-white/[0.08]">
              <p className="text-5xl mb-4">🍽️</p>
              <h3 className="text-xl font-bold font-heading text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>
                No restaurants found
              </h3>
              <p className="text-xs text-dark-500 mt-2">Try a different search query or change category filters</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); setVegOnly(false); }}
                className="mt-6 btn-primary text-xs"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((rest, index) => {
                const isFav = wishlist.includes(rest.id);
                return (
                  <motion.div
                    key={rest.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group card-premium rounded-3xl overflow-hidden cursor-pointer flex flex-col"
                    style={{ willChange: 'auto' }}
                    onClick={() => router.push(`/restaurants/${rest.id}`)}
                  >
                    {/* Card Cover Image */}
                    <div className="relative h-48 w-full" style={{ overflow: 'hidden' }}>
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="h-full w-full object-cover"
                        style={{ display: 'block', imageRendering: 'auto', transform: 'none', filter: 'none' }}
                      />

                      {rest.offer && (
                        <span className="absolute left-3 top-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
                          {rest.offer}
                        </span>
                      )}

                      <button
                        onClick={e => { e.stopPropagation(); toggleWishlist(rest.id); }}
                        className={`absolute right-3 top-3 rounded-full p-2 transition-all duration-300 hover:scale-110 ${
                          isFav
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white/90 text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Rating badge — solid, no backdrop blur */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 rounded-lg px-2.5 py-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-white">{rest.rating}</span>
                      </div>
                    </div>

                    {/* Card Content details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base text-dark-50 group-hover:text-primary-400 transition-colors duration-200" style={{ fontFamily: 'var(--font-cormorant)' }}>
                          {rest.name}
                        </h3>
                        <p className="text-xs text-dark-500 mt-1 truncate">{rest.cuisines.join(' · ')}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px] text-dark-500">
                        <span className="flex items-center gap-1 font-semibold text-dark-300">
                          <Clock className="h-3.5 w-3.5 text-primary-500" />
                          {rest.deliveryTime} mins
                        </span>
                        <span className="text-dark-600">·</span>
                        <span className="flex items-center gap-1 font-semibold text-dark-300">
                          <MapPin className="h-3.5 w-3.5 text-dark-400" />
                          {rest.distance} km
                        </span>
                        <span className="text-dark-600">·</span>
                        <span className="font-bold text-dark-100">₹{rest.priceForTwo} for two</span>
                      </div>
                    </div>

                    {/* View Details action */}
                    <div className="px-5 pb-4">
                      <button className="w-full text-xs font-bold text-primary-500 flex items-center justify-center gap-1 py-2.5 rounded-xl border border-primary-500/20 hover:bg-primary-500/5 transition-all">
                        View Menu <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
