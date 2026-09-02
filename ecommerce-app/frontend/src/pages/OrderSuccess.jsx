import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderId = location.state?.orderId;
  const transactionId = location.state?.transactionId;

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center border border-gray-100">
        
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
        <p className="text-lg text-gray-500 mb-8">
          Thank you for your purchase. We've received your order and are getting it ready to be shipped.
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center text-gray-700 font-medium">
              <Package className="w-5 h-5 mr-2 text-indigo-600" />
              Order ID
            </div>
            <div className="font-bold text-gray-900">#{orderId}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-700 font-medium">Transaction ID</div>
            <div className="font-mono text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">{transactionId}</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile?tab=orders"
            className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            View Order Status
          </Link>
          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
