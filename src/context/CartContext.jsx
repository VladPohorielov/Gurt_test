import { createContext, useContext, useReducer, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      )
      
      if (existingItemIndex >= 0) {
        const updatedState = [...state]
        updatedState[existingItemIndex].quantity += action.payload.quantity
        return updatedState
      } else {
        return [...state, action.payload]
      }

    case 'REMOVE_ITEM':
      return state.filter(
        item => !(item.id === action.payload.id && item.size === action.payload.size)
      )

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      )

    case 'CLEAR_CART':
      return []

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [])
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gurt-cart')
    if (savedCart) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gurt-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, size = '', quantity = 1) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size
    )
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        size,
        quantity,
        cartId: `${product.id}-${size}`
      }
    })

    // Show toast notification
    toast({
      title: existingItem ? "Кількість оновлено" : "Додано в кошик",
      description: `${product.title}${size ? ` (${size})` : ''}`,
      duration: 3000,
    })
  }

  const removeFromCart = (productId, size = '') => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: productId, size }
    })
  }

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: productId, size, quantity }
      })
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartContext }
