'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Clock, MapPin, Heart, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types';

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { restaurants, addToCart, cart, updateQuantity, toggleWishlist, wishlist } = useApp();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const restaurant = restaurants.find(r => r.id === params.id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1714]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-4xl">🍽️</p>
          <h2 className="text-xl font-bold font-heading" style={{ fontFamily: 'var(--font-cormorant)' }}>Restaurant not found</h2>
          <button onClick={() => router.push('/restaurants')} className="btn-primary text-xs">
            Browse Restaurants
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isFav = wishlist.includes(restaurant.id);
  const categories = [...new Set(restaurant.menu.map(m => m.category))];

  const getCartQty = (itemId: string) => {
    const found = cart.find(c => c.menuItem.id === itemId);
    return found?.quantity || 0;
  };

  const handleAdd = (item: MenuItem) => {
    addToCart({ menuItem: item, restaurantId: restaurant.id, restaurantName: restaurant.name, quantity: 1 });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1714]">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-52 sm:h-72 w-full overflow-hidden border-b border-white/[0.08]">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-90" />
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 p-2.5 rounded-full bg-white/90 text-dark-800 shadow-md hover:bg-white transition-all hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => toggleWishlist(restaurant.id)}
          className={`absolute right-4 top-4 p-2.5 rounded-full shadow-md transition-all hover:scale-105 ${
            isFav
              ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-glow'
              : 'bg-white/90 text-dark-800 hover:text-primary-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFav ? 'fill-primary-400' : ''}`} />
        </button>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full -mt-16 relative z-10">
        {/* Info Card */}
        <div className="card-premium rounded-3xl p-4 sm:p-6 shadow-2xl mb-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="section-label mb-2 inline-flex">Local Partner</span>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>{restaurant.name}</h1>
              <p className="text-xs text-dark-500 mt-1 truncate">{restaurant.cuisines.join(' • ')}</p>
              <p className="text-xs text-dark-600 mt-1.5 flex items-start gap-1.5">
                <MapPin className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" /> {restaurant.address}
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-xl bg-emerald-800/10 border border-emerald-800/20 px-2.5 py-1.5 text-sm font-bold text-emerald-800 shrink-0">
              {restaurant.rating} <Star className="h-3.5 w-3.5 fill-emerald-800 text-emerald-800" />
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3 sm:gap-6 text-xs text-dark-500 border-t border-white/[0.06] pt-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-dark-300">
              <Clock className="h-4 w-4 text-primary-500" /> {restaurant.deliveryTime} mins
            </span>
            <span className="hidden sm:inline">·</span>
            <span>{restaurant.distance} km away</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-bold text-dark-100">₹{restaurant.priceForTwo} for two</span>
            {restaurant.offer && (
              <span className="bg-primary-500/10 text-primary-500 border border-primary-500/15 px-3 py-1 rounded-xl font-bold text-[10px] shadow-sm">
                {restaurant.offer}
              </span>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="pb-24">
          {categories.map(cat => (
            <div key={cat} className="mb-10">
              <h2 className="text-xl font-bold font-heading mb-5 flex items-center gap-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                {cat}
                <span className="h-px flex-1 bg-white/[0.08]" />
              </h2>
              <div className="space-y-4">
                {restaurant.menu
                  .filter(item => item.category === cat)
                  .map((item, i) => {
                    const qty = getCartQty(item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-4 p-4 rounded-3xl border border-white/[0.11] bg-gradient-to-br from-white to-[#FAF9F6] hover:shadow-md transition-shadow relative overflow-hidden"
                      >
                        {/* Veg/Non-veg */}
                        <span className={`mt-1 h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 ${item.isVeg ? 'border-emerald-600' : 'border-red-600'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold text-sm text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.name}</h3>
                              {item.isBestseller && (
                                <span className="text-[9px] font-bold text-primary-500 bg-primary-500/10 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                  ★ BESTSELLER
                                </span>
                              )}
                              <p className="text-xs text-dark-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>
                            <span className="font-black text-sm text-dark-50 shrink-0">₹{item.price}</span>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <span />
                            {qty === 0 ? (
                              <button
                                onClick={() => handleAdd(item)}
                                className={`flex items-center gap-1.5 px-4.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                  addedItem === item.id
                                    ? 'bg-emerald-800 text-white border-emerald-800'
                                    : 'bg-transparent text-primary-500 border-primary-500/30 hover:bg-primary-500 hover:text-white'
                                }`}
                              >
                                {addedItem === item.id ? (
                                  <><CheckCircle className="h-3.5 w-3.5" /> Added!</>
                                ) : (
                                  <><Plus className="h-3.5 w-3.5" /> Add</>
                                )}
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, qty - 1)}
                                  className="h-7 w-7 rounded-lg border border-primary-500/30 bg-transparent flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="font-bold text-sm w-5 text-center">{qty}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, qty + 1)}
                                  className="h-7 w-7 rounded-lg border border-primary-500/30 bg-transparent flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Item image */}
                        <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-white/[0.03] shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart CTA */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50">
          <button
            onClick={() => router.push('/cart')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl font-bold text-sm hover:scale-103 transition-transform"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>View Cart</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
