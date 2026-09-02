import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { processPayment } from '../services/api';
import { useCart } from '../hooks/useCart';
import { CreditCard, CheckCircle, Lock } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Extract orderId and amount from navigation state
  const orderId = location.state?.orderId;
  const amount = location.state?.amount;

  if (!orderId) {
    return <Navigate to="/cart" replace />;
  }

  const handlePayment = async (method) => {
    setIsProcessing(true);
    setError('');

    try {
      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      const res = await processPayment({
        orderId,
        paymentMethod: method
      });

      if (res.success) {
        // Clear the cart on frontend (backend already cleared its DB cart)
        await clearCart();
        navigate('/order-success', { 
          state: { 
            orderId: res.data.orderId,
            transactionId: res.data.transactionId
          }
        });
      } else {
        setError(res.message || 'Payment failed');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment Error:', err);
      setError('Something went wrong during payment processing');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
            <Lock className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Secure Payment
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Total amount to pay: <span className="font-bold text-gray-900 text-lg">₹{Number(amount).toFixed(2)}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          <p className="text-center text-sm font-medium text-gray-500 mb-6">Select a mock payment method</p>
          
          <button
            onClick={() => handlePayment('Credit Card')}
            disabled={isProcessing}
            className={`w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              <>
                <CreditCard className="w-6 h-6 mr-3" />
                Pay with Credit Card
              </>
            )}
          </button>

          <button
            onClick={() => handlePayment('PayPal')}
            disabled={isProcessing}
            className={`w-full flex items-center justify-center py-4 px-4 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
            This is a mock checkout. No real money will be charged.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Payment;
