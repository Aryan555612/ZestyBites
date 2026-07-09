import React from 'react';
import Link from 'next/link';
import { Flame, Instagram, Twitter, Facebook, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] mt-auto">
      {/* Background layers */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,79,24,0.07),transparent)]" />
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Top CTA Strip */}
        <div className="glass-card rounded-3xl p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 border-white/[0.08]">
          <div>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-widest mb-1">Newsletter</p>
            <h3 className="text-xl font-bold text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Get exclusive deals in your inbox
            </h3>
            <p className="text-sm text-dark-500 mt-1">Join 12,000+ food lovers. No spam, just offers.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:w-72 bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-3 focus-within:border-primary-500/40 transition-colors">
              <Mail className="h-4 w-4 text-dark-500 shrink-0" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm text-dark-100 outline-none placeholder:text-dark-600"
              />
            </div>
            <button className="btn-primary text-sm px-5 py-3 whitespace-nowrap flex items-center gap-1.5">
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                <Flame className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Zesty<span className="gradient-text">Bites</span>
              </span>
            </Link>
            <p className="text-sm text-dark-500 leading-relaxed mb-6">
              Premium gourmet food delivery from the best restaurants in Patan & Unjha. Fresh, fast, and always delicious.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { Icon: Instagram, color: 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600' },
                { Icon: Twitter, color: 'hover:bg-sky-500' },
                { Icon: Facebook, color: 'hover:bg-blue-600' },
              ].map(({ Icon, color }, i) => (
                <button
                  key={i}
                  className={`p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-dark-500 hover:text-white transition-all duration-300 hover:scale-110 hover:border-transparent ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-dark-400 uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Restaurants', href: '/restaurants' },
                { label: 'Wishlist', href: '/wishlist' },
                { label: 'Cart', href: '/cart' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-dark-500 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-primary-500" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-xs font-bold text-dark-400 uppercase tracking-widest mb-5">
              Popular Cuisines
            </h4>
            <ul className="space-y-3">
              {['Pizza', 'Biryani', 'Burgers', 'Chinese', 'Desserts', 'Sushi'].map(c => (
                <li key={c}>
                  <Link
                    href={`/restaurants?cuisine=${c}`}
                    className="text-sm text-dark-500 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-primary-500" />
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-dark-400 uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded-lg bg-primary-500/10 border border-primary-500/15">
                  <MapPin className="h-3.5 w-3.5 text-primary-400" />
                </div>
                <span className="text-sm text-dark-500 leading-relaxed">Sector 17, Patan & Unjha,<br />India – 160017</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-primary-500/10 border border-primary-500/15">
                  <Phone className="h-3.5 w-3.5 text-primary-400" />
                </div>
                <span className="text-sm text-dark-500">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-primary-500/10 border border-primary-500/15">
                  <Mail className="h-3.5 w-3.5 text-primary-400" />
                </div>
                <span className="text-sm text-dark-500">hello@zestybites.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-600">
            © 2025 ZestyBites. Crafted with ♥ in Patan & Unjha.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
              <span
                key={item}
                className="text-xs text-dark-600 hover:text-primary-400 cursor-pointer transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
