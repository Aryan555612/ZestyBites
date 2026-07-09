'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, Heart, Search, Sun, Moon, Menu, X, Flame } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, wishlist } = useApp();
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('zb_theme');
    const prefersDark = !stored || stored === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('zb_theme', next ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(search)}`);
      setSearch('');
      searchRef.current?.blur();
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/restaurants', label: 'Restaurants' },
    { href: '/wishlist', label: 'Wishlist' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-2xl shadow-navbar border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative flex items-center justify-center h-9 w-9 rounded-xl overflow-hidden">
              {/* Glow behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 group-hover:shadow-glow transition-shadow duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-400 to-orange-400" />
              <Flame className="relative h-4.5 w-4.5 text-white z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Zesty<span className="gradient-text">Bites</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl glass border-white/[0.06]">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-dark-400 hover:text-dark-100'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-500/20" />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Search ── */}
          <form
            onSubmit={handleSearch}
            className={`hidden lg:flex items-center gap-2 flex-1 max-w-xs rounded-2xl px-4 py-2.5 border transition-all duration-300 ${
              searchFocused
                ? 'bg-dark-800/60 border-primary-500/40 shadow-[0_0_0_3px_rgba(255,79,24,0.08)]'
                : 'bg-white/[0.04] border-white/[0.07] hover:border-white/[0.12]'
            }`}
          >
            <Search className={`h-4 w-4 shrink-0 transition-colors duration-200 ${searchFocused ? 'text-primary-400' : 'text-dark-500'}`} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-sm text-dark-100 outline-none placeholder:text-dark-600 font-medium"
            />
          </form>

          {/* ── Right Action Icons ── */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-dark-500 hover:text-dark-100 hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {dark
                ? <Sun className="h-4.5 w-4.5" />
                : <Moon className="h-4.5 w-4.5" />
              }
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl text-dark-500 hover:text-dark-100 hover:bg-white/[0.06] transition-all duration-200"
            >
              <Heart className="h-4.5 w-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white text-[9px] font-bold flex items-center justify-center shadow-glow animate-glow-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl text-dark-500 hover:text-dark-100 hover:bg-white/[0.06] transition-all duration-200"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white text-[9px] font-bold flex items-center justify-center shadow-glow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2.5 rounded-xl text-dark-400 hover:text-dark-100 hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-card rounded-2xl mb-4 p-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-primary-400 bg-primary-500/10 border border-primary-500/15'
                    : 'text-dark-400 hover:text-dark-100 hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 mt-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3"
            >
              <Search className="h-4 w-4 text-dark-500 shrink-0" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-dark-100 outline-none placeholder:text-dark-600"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
