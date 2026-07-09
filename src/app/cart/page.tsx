'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Minus, Trash2, Tag, CheckCircle, ArrowRight } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-6 py-20 px-4 text-center">
          <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-black font-heading">Order Placed! 🎉</h2>
          <p className="text-muted text-sm max-w-sm">
            Your order has been placed successfully. Estimated delivery time is 30-40 minutes.
          </p>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-xs w-full text-left space-y-2">
            <div className="text-xs text-muted flex justify-between"><span>Total Paid</span><span className="font-bold text-foreground">₹{finalTotal}</span></div>
            <div className="text-xs text-muted flex justify-between"><span>Order ID</span><span className="font-mono text-foreground">#ZB{Math.floor(Math.random() * 90000 + 10000)}</span></div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary-hover transition-colors flex items-center gap-2"
          >
            Back to Home <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="py-10 border-b border-border bg-grid-pattern">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black font-heading flex items-center gap-3">
            <ShoppingCart className="h-7 w-7 text-primary" />
            Your Cart
          </h1>
          <p className="text-sm text-muted mt-1">{cart.reduce((s, i) => s + i.quantity, 0)} items</p>
        </div>
      </section>

      <section className="py-10 flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🛒</p>
              <h3 className="text-xl font-bold font-heading">Your cart is empty</h3>
              <p className="text-sm text-muted mt-2">Add items from a restaurant to get started</p>
              <button
                onClick={() => router.push('/restaurants')}
                className="mt-6 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Restaurant info */}
                <div className="rounded-2xl border border-border bg-card p-4 text-xs text-muted">
                  Ordering from <span className="font-bold text-foreground">{cart[0].restaurantName}</span>
                </div>

                {cart.map(item => (
                  <div key={item.menuItem.id} className="flex gap-4 p-4 rounded-2xl border border-border bg-card">
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted-light shrink-0">
                      <img src={item.menuItem.image} alt={item.menuItem.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm font-heading truncate">{item.menuItem.name}</h3>
                      <p className="text-xs text-muted mt-0.5">{item.restaurantName}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-extrabold text-sm">₹{item.menuItem.price * item.quantity}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="h-7 w-7 rounded-lg border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="h-7 w-7 rounded-lg border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.menuItem.id)}
                            className="ml-2 p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-bold text-sm font-heading mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" /> Apply Coupon
                  </h3>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl px-4 py-3">
                      <span className="text-sm font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> {appliedCoupon} applied – ₹{discount} off
                      </span>
                      <button onClick={() => setAppliedCoupon(null)} className="text-xs text-muted hover:text-red-500 transition-colors">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
                        className="flex-1 bg-muted-light border border-border rounded-xl px-4 py-2.5 text-sm outline-none text-foreground placeholder:text-muted focus:border-primary transition-colors"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
                  {!appliedCoupon && (
                    <p className="text-[10px] text-muted mt-2">Try: WELCOME50 • SUPERFOOD • FREECOMM</p>
                  )}
                </div>
              </div>

              {/* Bill Summary */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-5 sticky top-20">
                  <h3 className="font-bold text-base font-heading mb-4">Bill Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>Item Total</span>
                      <span className="text-foreground font-semibold">₹{cartTotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Coupon Discount</span>
                        <span className="font-semibold">− ₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-foreground font-semibold'}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-extrabold text-base">
                      <span>Total</span>
                      <span className="text-primary">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="mt-5 w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary-hover transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    Place Order <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[10px] text-muted text-center mt-3">
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
