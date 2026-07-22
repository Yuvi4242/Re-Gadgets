import React, { useState } from 'react';
import { serviceEstimates } from '../../data/pricing';
import PaymentButton from '../payments/PaymentButton';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Calendar,
  Phone,
  User,
  Smartphone,
  Banknote,
  Loader2,
} from 'lucide-react';

const PHONE_REGEX = /^[6-9]\d{9}$/;

export default function BookingModal({ shop, onClose }) {
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    deviceType: '',
    serviceType: shop?.services?.[0] || 'Mobile Repair',
    issueDescription: '',
    preferredDateTime: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState(null);
  const [serverError, setServerError] = useState('');
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [isCODSuccess, setIsCODSuccess] = useState(false);
  const [codSubmitting, setCodSubmitting] = useState(false);

  const estimatedAmount = serviceEstimates[form.serviceType] || 500;

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Customer name is required';
    if (!PHONE_REGEX.test(form.customerPhone)) e.customerPhone = 'Enter a valid 10-digit mobile number';
    if (!form.deviceType.trim()) e.deviceType = 'Device details required (e.g. iPhone 13)';
    if (!form.issueDescription.trim()) e.issueDescription = 'Please describe the issue';
    if (!form.preferredDateTime) e.preferredDateTime = 'Preferred date and time required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Pass Auth token if logged in
      let authHeader = {};
      try {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.state?.accessToken) {
            authHeader = { Authorization: `Bearer ${parsed.state.accessToken}` };
          }
        }
      } catch (_) {}

      const res = await fetch('/api/repair-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
        },
        body: JSON.stringify({
          shopId: shop.id,
          shopName: shop.name,
          ...form,
          estimatedAmount,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Could not create booking');
      }

      const data = await res.json();
      setBooking(data);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCODConfirm = async () => {
    if (!booking?._id) return;
    setCodSubmitting(true);
    try {
      const res = await fetch(`/api/repair-bookings/${booking._id}/cod`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setIsCODSuccess(true);
      } else {
        const data = await res.json();
        alert(data.message || 'Could not confirm COD payment option.');
      }
    } catch (err) {
      console.error('COD selection error:', err);
      alert('Network error while selecting Cash on Delivery.');
    } finally {
      setCodSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!booking ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full mb-2">
                <Wrench className="w-3.5 h-3.5" />
                {shop.name}
              </div>
              <h3 className="text-xl font-display font-bold text-slate-100">
                Book Repair Appointment
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your details below to request a service slot with {shop.name}.
              </p>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              {errors.customerName && <p className="text-xs text-rose-400 mt-1">{errors.customerName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                10-Digit Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              {errors.customerPhone && <p className="text-xs text-rose-400 mt-1">{errors.customerPhone}</p>}
            </div>

            {/* Service & Device Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Service Needed
                </label>
                <select
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {shop.services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Device Model
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. MacBook Air M1"
                    value={form.deviceType}
                    onChange={(e) => setForm({ ...form, deviceType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                {errors.deviceType && <p className="text-xs text-rose-400 mt-1">{errors.deviceType}</p>}
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Issue Description
              </label>
              <textarea
                rows={2}
                placeholder="Describe the issue (e.g. Cracked screen, battery drain)"
                value={form.issueDescription}
                onChange={(e) => setForm({ ...form, issueDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {errors.issueDescription && <p className="text-xs text-rose-400 mt-1">{errors.issueDescription}</p>}
            </div>

            {/* Preferred Date & Time */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                value={form.preferredDateTime}
                onChange={(e) => setForm({ ...form, preferredDateTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {errors.preferredDateTime && <p className="text-xs text-rose-400 mt-1">{errors.preferredDateTime}</p>}
            </div>

            {/* Estimated Price Banner */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Estimated Base Cost</p>
                <p className="text-xs text-slate-500">Starting price (final confirmed after shop inspection)</p>
              </div>
              <span className="font-display font-extrabold text-xl text-amber-400">
                ₹{estimatedAmount}
              </span>
            </div>

            {serverError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Creating Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-slate-100">
                Booking Confirmed! ✅
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your repair appointment has been created successfully.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono text-amber-400">{booking._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Repair Hub:</span>
                <span className="font-semibold text-slate-200">{booking.shopName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span>{booking.customerName} ({booking.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Device:</span>
                <span>{booking.deviceType}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 font-semibold text-sm">
                <span>Amount:</span>
                <span className="text-amber-400">₹{booking.estimatedAmount}</span>
              </div>
            </div>

            {isPaidSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Online Payment Received & Slot Guaranteed!
              </div>
            ) : isCODSuccess ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold flex flex-col items-center justify-center gap-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Banknote className="w-5 h-5" />
                  <span>Cash on Delivery (COD) Selected!</span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  Please keep <strong className="text-amber-300">₹{booking.estimatedAmount}</strong> cash ready when our technician arrives for pickup.
                </p>
              </div>
            ) : (
              <div className="pt-2 space-y-3 text-left">
                <p className="text-xs text-slate-400 text-center mb-1">
                  Choose your payment option to complete your repair booking:
                </p>

                {/* Option 1: Razorpay Online Payment */}
                <PaymentButton
                  bookingId={booking._id}
                  amount={booking.estimatedAmount}
                  customerName={booking.customerName}
                  customerPhone={booking.customerPhone}
                  onSuccess={() => setIsPaidSuccess(true)}
                />

                {/* Option 2: Cash on Delivery (COD) */}
                <button
                  onClick={handleCODConfirm}
                  disabled={codSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-amber-400 font-bold py-3 px-6 rounded-xl border border-slate-700 hover:border-amber-500/50 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {codSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Selecting COD...
                    </>
                  ) : (
                    <>
                      <Banknote className="w-5 h-5 text-amber-400" />
                      Pay with Cash on Delivery (COD)
                    </>
                  )}
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
