'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Minus, Trash2, Tag, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const COUPONS: Record<string, number> = {
  WELCOME50: 100,
  SUPERFOOD: 120,
  FREECOMM: 40,
};

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const discount = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const deliveryFee = cartTotal > 0 ? (cartTotal > 400 ? 0 : 40) : 0;
  const finalTotal = Math.max(0, cartTotal - discount) + deliveryFee;

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME50, SUPERFOOD or FREECOMM');
      setAppliedCoupon(null);
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1714]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-6 py-20 px-4 text-center max-w-md mx-auto">
          <div className="h-20 w-20 rounded-full bg-emerald-800/10 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-emerald-800" />
          </div>
          <h2 className="text-3xl font-black font-heading text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>Order Placed! 🎉</h2>
          <p className="text-dark-500 text-sm">
            Your order has been placed successfully. Estimated delivery time is 30-40 minutes.
          </p>
          <div className="card-premium rounded-3xl p-6 w-full text-left space-y-2">
            <div className="text-xs text-dark-500 flex justify-between"><span>Total Paid</span><span className="font-bold text-dark-100">₹{finalTotal}</span></div>
            <div className="text-xs text-dark-500 flex justify-between"><span>Order ID</span><span className="font-mono text-dark-100">#ZB{Math.floor(Math.random() * 90000 + 10000)}</span></div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="btn-primary text-xs flex items-center gap-2"
          >
            Back to Home <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1714]">
      <Navbar />

      <section className="py-10 border-b border-[#B59360]/10 bg-[#FAF9F6]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black font-heading flex items-center gap-3 text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>
            <ShoppingCart className="h-7 w-7 text-primary-500" />
            Your Cart
          </h1>
          <p className="text-xs text-dark-500 mt-1">{cart.reduce((s, i) => s + i.quantity, 0)} items in your tray</p>
        </div>
      </section>

      <section className="py-10 flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🛒</p>
              <h3 className="text-xl font-bold font-heading text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>Your cart is empty</h3>
              <p className="text-xs text-dark-500 mt-2">Add items from a restaurant to get started</p>
              <button
                onClick={() => router.push('/restaurants')}
                className="mt-6 btn-primary text-xs"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Restaurant info */}
                <div className="rounded-2xl border border-[#B59360]/10 bg-white p-4 text-xs text-dark-500 shadow-sm">
                  Ordering from <span className="font-bold text-dark-100">{cart[0].restaurantName}</span>
                </div>

                {cart.map(item => (
                  <div key={item.menuItem.id} className="flex gap-4 p-4 rounded-3xl border border-[#B59360]/11 bg-white shadow-sm">
                    <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-[#B59360]/10">
                      <img src={item.menuItem.image} alt={item.menuItem.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-dark-50 truncate" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.menuItem.name}</h3>
                        <p className="text-[10px] text-dark-500 truncate">{item.restaurantName}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-sm text-dark-50">₹{item.menuItem.price * item.quantity}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="h-7 w-7 rounded-lg border border-primary-500/30 text-primary-500 flex items-center justify-center hover:bg-[#B59360]/10 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="h-7 w-7 rounded-lg border border-primary-500/30 text-primary-500 flex items-center justify-center hover:bg-[#B59360]/10 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.menuItem.id)}
                            className="ml-2 p-1.5 rounded-lg text-dark-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon */}
                <div className="rounded-3xl border border-[#B59360]/11 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-sm font-heading mb-3 flex items-center gap-2 text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    <Tag className="h-4 w-4 text-primary-500" /> Apply Coupon
                  </h3>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-800/5 border border-emerald-800/10 rounded-xl px-4 py-3">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> {appliedCoupon} applied – ₹{discount} off
                      </span>
                      <button onClick={() => setAppliedCoupon(null)} className="text-xs text-dark-500 hover:text-red-500 transition-colors">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
                        className="flex-1 bg-[#FAF9F6] border border-[#B59360]/15 rounded-xl px-4 py-2.5 text-xs outline-none text-dark-100 placeholder:text-dark-500 focus:border-primary-500 transition-colors"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-gradient-to-r from-[#B59360] to-[#9C784A] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-95 transition-opacity"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
                  {!appliedCoupon && (
                    <p className="text-[10px] text-dark-500 mt-2">Try: WELCOME50 • SUPERFOOD • FREECOMM</p>
                  )}
                </div>
              </div>

              {/* Bill Summary */}
              <div className="space-y-4">
                <div className="card-premium rounded-3xl p-5 sticky top-24">
                  <h3 className="font-bold text-base font-heading mb-4 text-dark-50" style={{ fontFamily: 'var(--font-cormorant)' }}>Bill Details</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-dark-500">
                      <span>Item Total</span>
                      <span className="text-dark-100 font-semibold">₹{cartTotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-800">
                        <span>Coupon Discount</span>
                        <span className="font-semibold">− ₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-dark-500">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? 'text-emerald-800 font-semibold' : 'text-dark-100 font-semibold'}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t border-[#B59360]/10 pt-3 flex justify-between font-extrabold text-sm text-dark-50">
                      <span>Total</span>
                      <span className="text-primary-500">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="mt-5 w-full btn-primary text-xs flex items-center justify-center gap-2"
                  >
                    Place Order <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[9px] text-dark-500 text-center mt-3">
                    Demo checkout — no real payment processed
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
