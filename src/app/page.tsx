'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, ArrowRight, Star, Clock, Heart, Sparkles,
  Gift, Quote, Smartphone, CheckCircle, TrendingUp,
  Download, Zap, Shield, Flame, MapPin, ChevronRight,
  Play, Users, Award
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { INITIAL_CATEGORIES } from '@/utils/mockDb';

/* ─── Animation Variants ─── */
const fadeUp   = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const fadeIn   = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };
const stagger  = { show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const scaleUp  = { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Review Carousel ─── */
const REVIEWS = [
  { name: 'Aditya Sen',   avatar: 'AS', text: 'I order twice a day from ZestyBites. Delivery is lightning quick, and the live GPS tracking gives me peace of mind. The UI is absolutely stunning — highly recommended!', rating: 5, date: 'Today',      color: 'from-violet-500 to-purple-600', role: 'Food Blogger' },
  { name: 'Kavita Roy',   avatar: 'KR', text: 'The dark-mode design is so premium, I thought it was a native app. Applied coupon WELCOME50 — saved ₹100 instantly. The cart experience is smooth and the restaurant photos are gorgeous!', rating: 5, date: '2 days ago', color: 'from-pink-500 to-rose-600',   role: 'UX Designer' },
  { name: 'Pranav Bajaj', avatar: 'PB', text: 'Checkout was seamless. The interactive menu layout is very detailed and intuitive. I love how the categories are presented. Overall 10/10 experience I have not seen anywhere else.', rating: 4, date: '1 week ago', color: 'from-amber-500 to-orange-500',  role: 'Software Engineer' },
];

export default function HomePage() {
  const router = useRouter();
  const { restaurants, toggleWishlist, wishlist } = useApp();
  const [heroSearch, setHeroSearch]   = useState('');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  /* auto-rotate reviews */
  useEffect(() => {
    const t = setInterval(() => setActiveReview(i => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featuredRest   = restaurants.filter(r => r.isFeatured).slice(0, 3);
  const trendingDishes = restaurants
    .flatMap(r => r.menu.map(item => ({ ...item, restaurantId: r.id, restaurantName: r.name })))
    .filter(item => item.isBestseller)
    .slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) router.push(`/restaurants?search=${encodeURIComponent(heroSearch)}`);
  };

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2200);
  };

  const COUPONS = [
    { code: 'WELCOME50', title: '50% Off First Order', desc: 'Get 50% discount up to ₹100 on your very first food order. New users only.', gradient: 'from-rose-500/20 via-pink-500/10 to-transparent', accent: 'from-rose-500 to-pink-600', tag: 'New Users', icon: '🎉' },
    { code: 'SUPERFOOD', title: 'Flat ₹120 Cashback',  desc: 'Flat ₹120 off on orders above ₹400 across all partner restaurants.', gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent', accent: 'from-amber-500 to-orange-500', tag: 'Most Popular', icon: '🔥' },
    { code: 'FREECOMM',  title: 'Free Delivery',       desc: 'Flat ₹40 off on delivery charges for any meal above ₹200.', gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent', accent: 'from-emerald-500 to-teal-500', tag: 'Daily Deal', icon: '⚡' },
  ];

  const FEATURES = [
    { icon: Shield, title: '100% Secure', desc: 'Bank-grade payment encryption' },
    { icon: Zap,    title: 'Lightning Fast', desc: 'Avg. delivery in 28 minutes' },
    { icon: Award,  title: 'Top Rated', desc: '4.9★ across 50K+ reviews' },
    { icon: Users,  title: 'Trusted', desc: 'Loved by 50,000+ foodies' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <Navbar />

      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">

        {/* Layered backgrounds */}
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-950" />

        {/* Floating orbs */}
        <div className="absolute top-1/5 left-1/6 h-[500px] w-[500px] rounded-full bg-primary-500/8 blur-[130px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 h-[350px] w-[350px] rounded-full bg-violet-500/6 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-orange-500/5 blur-[80px] animate-pulse pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-7 flex justify-center">
              <span className="section-label">
                <Flame className="h-3 w-3 text-primary-400 fill-primary-400" />
                Gourmet Food Delivery · Patan & Unjha, Gujarat
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.03] mb-6"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Taste the{' '}
              <span className="gradient-text relative">
                Extraordinary
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500/60 to-transparent rounded-full" />
              </span>
              <br className="hidden sm:block" />
              <span className="text-dark-300"> Delivered Fast</span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              variants={fadeUp}
              className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Experience top-rated restaurants, lightning-fast delivery routes, and
              chef-curated menus — all in one beautiful app.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-8 sm:gap-12 mb-10"
            >
              {[
                { value: 500, suffix: '+', label: 'Restaurants' },
                { value: 50000, suffix: '+', label: 'Happy Foodies' },
                { value: 12, suffix: '+', label: 'Cities' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black gradient-text">
                    <AnimatedNumber target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-dark-500 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Search */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleHeroSearch}
              className="max-w-2xl mx-auto"
            >
              <div
                className={`glass-strong rounded-2xl p-1.5 flex flex-col sm:flex-row gap-2 transition-all duration-300 ${
                  searchFocused
                    ? 'shadow-[0_0_0_2px_rgba(255,79,24,0.3),0_20px_60px_rgba(0,0,0,0.7)]'
                    : 'shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 px-4 py-3.5">
                  <Search className={`h-5 w-5 shrink-0 transition-colors duration-200 ${searchFocused ? 'text-primary-400' : 'text-dark-500'}`} />
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisines, dishes..."
                    value={heroSearch}
                    onChange={e => setHeroSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full bg-transparent text-sm text-dark-100 outline-none placeholder:text-dark-600 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary text-sm px-7 py-3.5 flex items-center gap-2 justify-center whitespace-nowrap"
                >
                  <Search className="h-4 w-4" />
                  Search Now
                </button>
              </div>

              {/* Quick search pills */}
              <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
                <span className="text-xs text-dark-600 font-medium">Trending:</span>
                {['🍕 Pizza', '🍛 Biryani', '🍔 Burgers', '🥡 Chinese', '🍣 Sushi'].map(q => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => router.push(`/restaurants?search=${q.split(' ')[1]}`)}
                    className="text-xs text-dark-400 hover:text-primary-300 transition-all duration-200 bg-white/[0.04] hover:bg-primary-500/10 border border-white/[0.07] hover:border-primary-500/30 rounded-full px-3.5 py-1.5 font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.form>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════
          FEATURES BAR
      ════════════════════════════════════════════ */}
      <section className="py-6 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/[0.06]">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 px-4 first:pl-0">
                <div className="p-2.5 rounded-xl bg-primary-500/10 border border-primary-500/15 shrink-0">
                  <Icon className="h-4 w-4 text-primary-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-dark-100">{title}</div>
                  <div className="text-[10px] text-dark-500 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CUISINE CATEGORIES
      ════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(255,79,24,0.06),transparent)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-10"
          >
            <motion.div variants={fadeUp}>
              <span className="section-label mb-3 inline-flex">
                <Zap className="h-3 w-3" /> Explore Cuisines
              </span>
              <h2 className="text-3xl font-black text-dark-50 mt-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                What are you craving?
              </h2>
              <p className="text-dark-500 text-sm mt-1.5">Chef-curated categories for every mood and moment</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                href="/restaurants"
                className="group flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
            {INITIAL_CATEGORIES.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => router.push(`/restaurants?cuisine=${category.name}`)}
                className="flex flex-col items-center cursor-pointer group text-center"
              >
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl border border-white/[0.08] group-hover:border-primary-500/40 shadow-lg transition-all duration-400 group-hover:scale-108 group-hover:shadow-[0_0_24px_rgba(255,79,24,0.28)]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-dark-900/10 to-transparent" />
                  {/* Glow overlay on hover */}
                  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold text-dark-500 group-hover:text-primary-400 transition-colors mt-3 leading-tight">
                  {category.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          COUPON SECTION
      ════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,79,24,0.06),transparent)]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="absolute bottom-0 left-0 right-0 section-divider" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.span variants={fadeUp} className="section-label mb-3 inline-flex">
              <Gift className="h-3 w-3" /> Exclusive Deals
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-dark-50 mt-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Offers & Savings For You
            </motion.h2>
            <motion.p variants={fadeUp} className="text-dark-500 text-sm mt-1.5">
              Copy promo codes and apply them at checkout for instant savings
            </motion.p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {COUPONS.map((coupon, i) => (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${coupon.gradient} border border-white/[0.07] hover:border-white/[0.13] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]`}
              >
                {/* Glow blob */}
                <div className={`absolute -top-8 -right-8 h-40 w-40 rounded-full bg-gradient-to-br ${coupon.accent} opacity-15 blur-3xl group-hover:opacity-25 transition-opacity duration-400`} />
                {/* Dashed border effect */}
                <div className="absolute inset-0 rounded-3xl border border-dashed border-white/[0.06] pointer-events-none" />

                <div className="relative">
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full bg-gradient-to-r ${coupon.accent} text-white shadow-lg`}>
                      {coupon.icon} {coupon.tag}
                    </span>
                    <span className="text-2xl">{coupon.icon}</span>
                  </div>

                  <h3 className="text-xl font-black text-dark-50 leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    {coupon.title}
                  </h3>
                  <p className="text-sm text-dark-400 leading-relaxed mb-5">{coupon.desc}</p>

                  {/* Code strip */}
                  <div className="flex items-center justify-between glass rounded-2xl border border-white/[0.08] p-3 gap-3">
                    <div>
                      <p className="text-[9px] text-dark-600 uppercase tracking-widest font-bold mb-0.5">Promo Code</p>
                      <span className="font-mono font-black text-sm text-dark-100 tracking-widest">{coupon.code}</span>
                    </div>
                    <button
                      onClick={() => copyCoupon(coupon.code)}
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r ${coupon.accent} hover:scale-105 hover:shadow-lg active:scale-95`}
                    >
                      {copiedCoupon === coupon.code ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURED RESTAURANTS
      ════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-12"
          >
            <motion.div variants={fadeUp}>
              <span className="section-label mb-3 inline-flex">
                <Star className="h-3 w-3 fill-primary-400" /> Featured
              </span>
              <h2 className="text-3xl font-black text-dark-50 mt-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Top Restaurants Near You
              </h2>
              <p className="text-dark-500 text-sm mt-1.5">Handpicked premium dining spots in Patan & Unjha, Gujarat</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                href="/restaurants"
                className="group flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
              >
                Explore all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRest.map((rest, i) => {
              const isFav = wishlist.includes(rest.id);
              return (
                <motion.div
                  key={rest.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group card-premium rounded-3xl overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => router.push(`/restaurants/${rest.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
                    {/* Top overlay – subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Offer tag */}
                    {rest.offer && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute left-3 top-3 flex items-center gap-1 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(255,79,24,0.4)]"
                      >
                        <Zap className="h-3 w-3" /> {rest.offer}
                      </motion.span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleWishlist(rest.id); }}
                      className={`absolute right-3 top-3 rounded-full p-2.5 backdrop-blur-md transition-all duration-300 hover:scale-115 ${
                        isFav
                          ? 'bg-primary-500/20 text-primary-400 shadow-glow border border-primary-500/30'
                          : 'bg-dark-900/60 text-dark-400 hover:text-primary-400 border border-white/[0.1]'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-primary-400' : ''}`} />
                    </button>

                    {/* Rating badge on image */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass rounded-xl px-3 py-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-dark-100">{rest.rating}</span>
                    </div>

                    {/* "Open" status */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 glass rounded-xl px-2.5 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-semibold text-emerald-400">Open</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-dark-50 group-hover:text-primary-400 transition-colors duration-200" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        {rest.name}
                      </h3>
                      <p className="text-xs text-dark-500 mt-1 truncate">{rest.cuisines.join(' · ')}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-dark-500">
                      <span className="flex items-center gap-1.5 text-dark-400 font-medium">
                        <Clock className="h-3.5 w-3.5 text-primary-500" />
                        {rest.deliveryTime} mins
                      </span>
                      <span className="text-dark-700">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-dark-600" />
                        {rest.distance} km
                      </span>
                      <span className="text-dark-700">·</span>
                      <span className="font-bold text-dark-200">₹{rest.priceForTwo} for two</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRENDING DISHES
      ════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(255,79,24,0.07),transparent)]" />
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="absolute bottom-0 left-0 right-0 section-divider" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-12"
          >
            <motion.div variants={fadeUp}>
              <span className="section-label mb-3 inline-flex">
                <TrendingUp className="h-3 w-3" /> Trending Now
              </span>
              <h2 className="text-3xl font-black text-dark-50 mt-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Bestselling Dishes
              </h2>
              <p className="text-dark-500 text-sm mt-1.5">AI-curated picks based on trending orders this hour</p>
            </motion.div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trendingDishes.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group card-premium rounded-3xl p-4 cursor-pointer flex flex-col justify-between"
                onClick={() => router.push(`/restaurants/${dish.restaurantId}`)}
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden rounded-2xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />

                  {/* Bestseller badge */}
                  <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider shadow-lg">
                    <Flame className="h-2.5 w-2.5" /> Bestseller
                  </span>

                  {/* Veg/Non-veg */}
                  <span className={`absolute right-2.5 top-2.5 h-5 w-5 rounded border-2 flex items-center justify-center bg-dark-900/80 ${
                    dish.isVeg ? 'border-emerald-500' : 'border-red-500'
                  }`}>
                    <span className={`h-2 w-2 rounded-full ${dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </span>

                  {/* AI tag */}
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-lg glass px-2 py-1 text-[8px] font-bold text-primary-300 border border-primary-500/20">
                    <Sparkles className="h-2.5 w-2.5" /> AI Pick
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-base text-dark-50 truncate" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    {dish.name}
                  </h3>
                  <p className="text-xs font-semibold text-primary-400 mt-0.5">{dish.restaurantName}</p>
                  <p className="text-xs text-dark-500 mt-1.5 line-clamp-2 leading-relaxed">{dish.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className="font-black text-base text-dark-50">₹{dish.price}</span>
                  <span className="text-xs font-bold text-primary-400 group-hover:text-primary-300 flex items-center gap-1 transition-colors">
                    Order <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(124,58,237,0.05),transparent)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <motion.span variants={fadeUp} className="section-label mb-4 inline-flex mx-auto">
              <Star className="h-3 w-3 fill-primary-400" /> Reviews
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-dark-50 mt-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
              What Our Foodies Say
            </motion.h2>
            <motion.p variants={fadeUp} className="text-dark-500 text-sm mt-2">
              Honest reviews from verified customers across Patan & Unjha, Gujarat
            </motion.p>
          </motion.div>

          {/* Reviews grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {REVIEWS.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`card-premium rounded-3xl p-6 flex flex-col justify-between transition-all duration-400 ${
                  activeReview === i
                    ? 'border-primary-500/25 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,79,24,0.15)] -translate-y-1'
                    : ''
                }`}
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 transition-colors ${idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-dark-700'}`}
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary-500/15 mb-3" />
                  <p className="text-sm text-dark-400 leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${rev.color} flex items-center justify-center text-xs font-black text-white shrink-0 shadow-lg`}>
                    {rev.avatar}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-dark-100 block" style={{ fontFamily: 'var(--font-cormorant)' }}>{rev.name}</span>
                    <span className="text-[10px] text-dark-600">{rev.role} · {rev.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReview(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeReview === i
                    ? 'w-7 h-2 bg-primary-500'
                    : 'w-2 h-2 bg-dark-700 hover:bg-dark-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PWA / APP BANNER
      ════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,79,24,0.09),transparent)]" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-0 left-0 right-0 section-divider" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-4xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border-white/[0.09]">

            {/* Left content */}
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={stagger}
              className="max-w-lg"
            >
              <motion.span variants={fadeUp} className="section-label mb-5 inline-flex">
                <Smartphone className="h-3 w-3" /> PWA Enabled
              </motion.span>

              <motion.h2 variants={fadeUp} className="text-4xl font-black text-dark-50 mt-4 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Install ZestyBites on<br />
                <span className="gradient-text">Your Phone</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-dark-400 text-sm mt-5 leading-relaxed max-w-md">
                Add ZestyBites directly to your home screen as a Progressive Web App.
                Zero storage needed — full mobile layout, works offline, native-like experience.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => alert('PWA: ZestyBites icon added to your device!')}
                  className="btn-primary flex items-center gap-2.5 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Install App Free
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 glass rounded-2xl px-4 py-3 border border-emerald-500/20">
                  <CheckCircle className="h-4 w-4" />
                  iOS & Android Ready
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
                {[
                  { icon: Shield, text: '100% Secure' },
                  { icon: Zap, text: 'Lightning Fast' },
                  { icon: CheckCircle, text: 'Always Fresh' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 text-xs text-dark-400 font-medium">
                    <Icon className="h-3.5 w-3.5 text-primary-500" /> {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -12 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-56 h-[440px] shrink-0 hidden sm:block"
              style={{ perspective: '1000px' }}
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-[48px] bg-primary-500/10 blur-2xl animate-pulse-slow" />

              {/* Phone frame */}
              <div className="relative w-full h-full border-[7px] border-dark-700 rounded-[42px] bg-dark-950 shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden">

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-24 bg-dark-800 rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-dark-600" />
                  <div className="h-1 w-8 bg-dark-700 rounded" />
                </div>

                {/* Screen content */}
                <div className="absolute inset-0 bg-dark-950 flex flex-col p-3 pt-8 gap-2.5 overflow-hidden">
                  {/* Navbar */}
                  <div className="flex justify-between items-center pb-2 border-b border-dark-800/80">
                    <span className="text-[11px] font-black gradient-text" style={{ fontFamily: 'var(--font-cormorant)' }}>ZestyBites</span>
                    <div className="h-5 w-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Search className="h-2.5 w-2.5 text-primary-400" />
                    </div>
                  </div>

                  {/* Promo */}
                  <div className="rounded-xl bg-gradient-to-r from-primary-500/20 to-orange-500/10 border border-primary-500/20 p-2.5 text-center">
                    <div className="text-[11px] font-black text-primary-400">🔥 50% OFF TODAY</div>
                    <div className="text-[8px] text-dark-500 mt-0.5">Code: WELCOME50</div>
                  </div>

                  {/* Cards */}
                  {[
                    { name: 'Burger Factory', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=80&q=80', rating: '4.2', time: '20' },
                    { name: 'Biryani Blues', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=80&q=80', rating: '4.6', time: '35' },
                  ].map(c => (
                    <div key={c.name} className="flex gap-2 items-center glass rounded-xl p-2 border-white/[0.06]">
                      <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                        <img src={c.img} className="h-full w-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-bold text-dark-100 truncate">{c.name}</div>
                        <div className="text-[7px] text-dark-500 mt-0.5">⭐ {c.rating} · {c.time} mins</div>
                      </div>
                      <div className="text-[8px] text-primary-400 font-bold shrink-0">Order →</div>
                    </div>
                  ))}

                  <div className="mt-auto rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2.5 text-[10px] font-bold shadow-glow">
                    View All Restaurants →
                  </div>
                </div>

                {/* Screen shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
              </div>

              {/* Side button */}
              <div className="absolute top-24 -right-[9px] h-10 w-1.5 rounded-r bg-dark-700" />
              <div className="absolute top-16 -left-[9px] h-7 w-1.5 rounded-l bg-dark-700" />
              <div className="absolute top-28 -left-[9px] h-7 w-1.5 rounded-l bg-dark-700" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
