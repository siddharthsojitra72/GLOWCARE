import React, { useEffect, useReducer } from 'react';
import { CartContext } from './CartContext.js';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && 
        (!item.variant || !action.payload.variant || 
         item.variant.id === action.payload.variant.id)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            (!item.variant || !action.payload.variant || 
             item.variant.id === action.payload.variant.id)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity }]
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            (!item.variant || !action.payload.variant || 
             item.variant.id === action.payload.variant.id))
        )
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && 
          (!item.variant || !action.payload.variant || 
           item.variant.id === action.payload.variant.id)
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => {
      try {
        const raw = localStorage.getItem('glowcare_cart');
        const items = raw ? JSON.parse(raw) : [];
        if (Array.isArray(items)) {
          return { items };
        }
      } catch (_) {}
      return { items: [] };
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem('glowcare_cart', JSON.stringify(state.items));
    } catch (_) {}
  }, [state.items]);

  const addToCart = (item, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const updateQuantity = (item, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.variant?.price || item.price;
      return total + (parseFloat(price) * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
