import './index.css'
import RestoNameContext from '../../context/CartContext'

const CartItem = props => (
  <RestoNameContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {details} = props
      const {count, dishCurrency, dishId, dishImage, dishName, dishPrice} =
        details
      const onRemoveItem = () => {
        removeCartItem(dishId)
      }
      const onCartItemIncrement = () => {
        incrementCartItemQuantity(dishId)
      }

      const onCartItemDecrement = () => {
        if (count > 0) {
          decrementCartItemQuantity(dishId)
        }
      }
      const price = dishPrice*count

      return (
        <li className="cart-dish-item-bg-container">
          <img src={dishImage} alt={dishName} className="cart-item-image" />
          <div className="cart-details-sub-container">
            <h1 className="cart-dish-item-heading">{dishName}</h1>
            <p className="price-description">
              <span className="span-of-price">Price:</span> {price}{' '}
              {dishCurrency}
            </p>
            <div className="cart-item-increment-decrement-button">
              <button className="cart-button" onClick={onCartItemDecrement}>
                -
              </button>
              <p>{count}</p>
              <button className="cart-button" onClick={onCartItemIncrement}>
                +
              </button>
            </div>
            <button className="remove-cart-btn" onClick={onRemoveItem}>
              Remove
            </button>
          </div>
        </li>
      )
    }}
  </RestoNameContext.Consumer>
)

export default CartItem
