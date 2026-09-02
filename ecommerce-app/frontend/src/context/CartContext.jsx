import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart as fetchCartApi, addToCart as addToCartApi, updateCartItem as updateItemApi, removeCartItem as removeItemApi, clearCart as clearCartApi } from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch cart on load if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetchCartApi();
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) return { success: false, message: 'Please login to add to cart' };
    
    setLoading(true);
    try {
      const response = await addToCartApi(productId, quantity);
      if (response.success) {
        setCart(response.data);
      }
      return response;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error adding to cart' };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    setLoading(true);
    try {
      const response = await updateItemApi(itemId, quantity);
      if (response.success) {
        setCart(response.data);
      }
      return response;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error updating cart' };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    setLoading(true);
    try {
      const response = await removeItemApi(itemId);
      if (response.success) {
        setCart(response.data);
      }
      return response;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error removing item' };
    } finally {
      setLoading(false);
    }
  };

  const clear = async () => {
    setLoading(true);
    try {
      const response = await clearCartApi();
      if (response.success) {
        await fetchCart(); // Refresh cart to show it's empty
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Error clearing cart' };
    } finally {
      setLoading(false);
    }
  };

  // Calculate total items
  const cartCount = cart?.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount,
        loading, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart: clear 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
