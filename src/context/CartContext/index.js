import React from 'react'

const RestoNameContext = React.createContext({
  restoName: '',
  onSetRestoName: () => {},
  totalDishItems: 0,
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
})

export default RestoNameContext
