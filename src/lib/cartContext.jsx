import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kariv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kariv_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('kariv_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('kariv_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => wishlistItems.some(i => i.id === productId);
  const isInCart = (productId) => cartItems.some(i => i.id === productId);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.salePrice || item.price), 0);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  return (
    <CartContext.Provider value={{
      cartItems, wishlistItems, addToCart, removeFromCart, clearCart,
      toggleWishlist, isInWishlist, isInCart, cartTotal, cartCount, wishlistCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);