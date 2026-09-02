import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setIsSubmitting(true);
    
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registration failed');
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsSubmitting(true);
    const result = await loginWithGoogle();
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Google signup failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf9f5] py-12 px-4 sm:px-6 lg:px-8 text-[#2b2b2b]">
      <div className="max-w-md w-full space-y-8 bg-[#faf7f2] p-8 sm:p-10 rounded-3xl shadow-xl border border-[#ede5db]">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-[#1a3b34] flex items-center justify-center text-[#e8d5ce]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Create Lumora Account
          </h2>
          <p className="mt-2 text-xs text-gray-600">
            Join the Lumora circle to enjoy exclusive rewards & seamless checkout.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <p className="text-xs text-red-700 font-medium">{error}</p>
          </div>
        )}
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5" htmlFor="name">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="bg-white border border-[#dcd2c6] rounded-2xl block w-full pl-10 pr-4 py-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#1a3b34]"
                placeholder="Rutuja Chopade"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5" htmlFor="email">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="bg-white border border-[#dcd2c6] rounded-2xl block w-full pl-10 pr-4 py-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#1a3b34]"
                placeholder="rutuja@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5" htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="bg-white border border-[#dcd2c6] rounded-2xl block w-full pl-10 pr-4 py-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#1a3b34]"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="bg-white border border-[#dcd2c6] rounded-2xl block w-full pl-10 pr-4 py-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#1a3b34]"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl font-bold text-xs text-white bg-[#1a3b34] hover:bg-[#275249] shadow-md transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Creating account...' : 'CREATE ACCOUNT'}
            </button>
          </div>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2d7ca]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#faf7f2] text-gray-500 font-medium">OR CONTINUING WITH</span>
            </div>
          </div>

          <div>
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3 px-4 border border-[#dcd2c6] rounded-2xl shadow-sm bg-white text-xs font-bold text-gray-800 hover:bg-[#fbf8f5] transition-colors"
            >
              <svg className="w-4 h-4 mr-2.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign up with Google
            </button>
          </div>
        </form>
        
        <p className="text-center text-xs text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#1a3b34] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
