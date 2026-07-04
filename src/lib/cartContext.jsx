import React, { createContext, useContext, useState, useEffect } from 'react';

// Cart context — stores ONLY product IDs and quantity in localStorage.
// Product details (price, availability, dealer) are always fetched fresh
// from the backend before checkout. Never trust localStorage for pricing.
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kariv_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      // Sanitize: only keep productId and quantity
      return parsed
        .filter(item => item && item.productId)
        .map(item => ({ productId: item.productId, quantity: Math.max(1, item.quantity || 1) }));
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

  // Store only productId in cart — no price, no dealer info
  const addToCart = (product) => {
    const productId = typeof product === 'string' ? product : product?.id;
    if (!productId) return;
    setCartItems(prev => {
      if (prev.find(i => i.productId === productId)) return prev;
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.productId !== productId));
  };

  const clearCart = () => setCartItems([]);

  // Wishlist stores minimal product info for UI display only.
  // Prices/availability are re-fetched when viewing wishlist page.
  const toggleWishlist = (product) => {
    const productId = typeof product === 'string' ? product : product?.id;
    if (!productId) return;
    setWishlistItems(prev => {
      if (prev.find(i => i.id === productId)) return prev.filter(i => i.id !== productId);
      // Store minimal display info — price is NEVER trusted from here
      const minimal = typeof product === 'string'
        ? { id: product }
        : { id: product.id, productTitle: product.productTitle, brand: product.brand, featuredImage: product.featuredImage, slug: product.slug };
      return [...prev, minimal];
    });
  };

  const isInWishlist = (productId) => wishlistItems.some(i => i.id === productId);
  const isInCart = (productId) => cartItems.some(i => i.productId === productId);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  return (
    <CartContext.Provider value={{
      cartItems, wishlistItems, addToCart, removeFromCart, clearCart,
      toggleWishlist, isInWishlist, isInCart, cartCount, wishlistCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);