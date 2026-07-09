'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Star, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const router = useRouter();
  const { restaurants, wishlist, toggleWishlist } = useApp();

  const wishlistedRests = restaurants.filter(r => wishlist.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1714]">
      <Navbar />

      <section className="py-10 border-b border-[#B59360]/10 bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black font-heading flex items-center gap-3 text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>
            <Heart className="h-7 w-7 text-primary-500 fill-primary-500" />
            My Wishlist
          </h1>
          <p className="text-xs text-dark-500 mt-1">{wishlistedRests.length} saved restaurant{wishlistedRests.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <section className="py-10 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {wishlistedRests.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">💛</p>
              <h3 className="text-xl font-bold font-heading text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>Your wishlist is empty</h3>
              <p className="text-xs text-dark-500 mt-2">Save your favourite restaurants to order later</p>
              <button
                onClick={() => router.push('/restaurants')}
                className="mt-6 btn-primary text-xs"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistedRests.map((rest, i) => (
                <motion.div
                  key={rest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group card-premium rounded-3xl overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => router.push(`/restaurants/${rest.id}`)}
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="h-full w-full object-cover"
                      style={{ display: 'block', imageRendering: 'auto', transform: 'none', filter: 'none' }}
                    />
                    {rest.offer && (
                      <span className="absolute left-3 top-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-md">
                        {rest.offer}
                      </span>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); toggleWishlist(rest.id); }}
                      className="absolute right-3 top-3 p-2 rounded-full bg-white/90 text-primary-500 shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart className="h-4 w-4 fill-primary-500 text-primary-500" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base text-dark-50 group-hover:text-primary-400 transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>{rest.name}</h3>
                        <span className="flex items-center gap-1 bg-[#267E3E]/10 border border-[#267E3E]/20 text-[#267E3E] text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0">
                          {rest.rating} <Star className="h-3 w-3 fill-[#267E3E] text-[#267E3E]" />
                        </span>
                      </div>
                      <p className="text-xs text-dark-500 mt-1 truncate">{rest.cuisines.join(', ')}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#B59360]/10 pt-3 text-[11px] text-[#6B6355]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary-500" /> {rest.deliveryTime} mins
                      </span>
                      <span>•</span>
                      <span>{rest.distance} km</span>
                      <span className="ml-auto font-bold text-primary-500 flex items-center gap-0.5">
                        Order <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
