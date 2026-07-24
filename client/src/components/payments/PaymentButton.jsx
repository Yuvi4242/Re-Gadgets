import React, { useEffect, useState } from 'react';
import { CreditCard, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PaymentButton({ bookingId, amount, customerName, customerPhone, onSuccess }) {
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    setPaying(true);
    setError('');

    try {
      // 1. Create Razorpay order on backend server
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookingId }),
      });

      if (!orderRes.ok) {
        let errMsg = 'Failed to initialize payment gateway.';
        try {
          const contentType = orderRes.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errData = await orderRes.json();
            errMsg = errData.message || errMsg;
          } else {
            const textErr = await orderRes.text();
            if (textErr) errMsg = textErr;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const contentType = orderRes.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Payment server returned non-JSON response. Please check server logs.');
      }

      const order = await orderRes.json();

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

      // 2. Options for Razorpay Checkout Popup
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: 'INR',
        name: 'Re-Gadgets Repair Service',
        description: `Repair Booking #${bookingId}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3. Verify Razorpay signature server-side
            const verifyRes = await fetch('/api/payments/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, bookingId }),
            });
            const result = await verifyRes.json();

            if (result.success) {
              if (onSuccess) onSuccess(result);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setError('Payment verification error: ' + err.message);
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },
        prefill: {
          name: customerName,
          contact: customerPhone,
        },
        theme: {
          color: '#f59e0b',
        },
      };

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
      setPaying(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        disabled={paying}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        {paying ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Connecting to Razorpay...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay ₹{amount} with Razorpay (Test Mode)
          </>
        )}
      </button>

      {error && (
        <div className="text-xs text-rose-400 mt-2 text-center bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20 flex items-center justify-center gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-[11px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        Sandbox Test Gateway · Zero real money moves
      </p>
    </div>
  );
}
