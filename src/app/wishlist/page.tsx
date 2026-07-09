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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="py-10 border-b border-border bg-grid-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black font-heading flex items-center gap-3">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            My Wishlist
          </h1>
          <p className="text-sm text-muted mt-1">{wishlistedRests.length} saved restaurant{wishlistedRests.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <section className="py-10 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {wishlistedRests.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">💛</p>
              <h3 className="text-xl font-bold font-heading">Your wishlist is empty</h3>
              <p className="text-sm text-muted mt-2">Save your favourite restaurants to order later</p>
              <button
                onClick={() => router.push('/restaurants')}
                className="mt-6 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors"
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
                  className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => router.push(`/restaurants/${rest.id}`)}
                  style={{ transform: 'scale(1)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div className="relative h-44 w-full overflow-hidden bg-muted-light">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {rest.offer && (
                      <span className="absolute left-3 top-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                        {rest.offer}
                      </span>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); toggleWishlist(rest.id); }}
                      className="absolute right-3 top-3 p-2 rounded-full bg-white/80 dark:bg-black/60 text-primary backdrop-blur-sm hover:scale-110 transition-transform"
                    >
                      <Heart className="h-4 w-4 fill-primary text-primary" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-base font-heading group-hover:text-primary transition-colors">{rest.name}</h3>
                      <span className="flex items-center gap-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-bold px-1.5 py-0.5 rounded ml-2 shrink-0">
                        {rest.rating} <Star className="h-3 w-3 fill-green-700 dark:fill-green-400" />
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1 truncate">{rest.cuisines.join(', ')}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted border-t border-border pt-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" /> {rest.deliveryTime} mins
                      </span>
                      <span>•</span>
                      <span>{rest.distance} km</span>
                      <span className="ml-auto font-bold text-primary flex items-center gap-1">
                        Order <ArrowRight className="h-3 w-3" />
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
