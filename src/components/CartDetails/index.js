import {Component} from 'react'
import Header from '../Header'
import RestoNameContext from '../../context/CartContext'
import CartItem from '../CartItem'
import './index.css'

class CartDetails extends Component {
  render() {
    return (
      <RestoNameContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const onRemoveAll = () => {
            removeAllCartItems()
          }
          const length = cartList.length
          return (
            <div className="cart-details-mainbg-container">
              <Header />
              {length > 0 && (
                <>
                  <h1 className="main-headeing">Cart Items</h1>
                  <ul className="cart-dishes-list-items">
                    {cartList.map(each => (
                      <CartItem details={each} key={each.dishId} />
                    ))}
                  </ul>
                  <button className="remove-all-btn" onClick={onRemoveAll}>
                    Remove All
                  </button>
                </>
              )}
              {length === 0 && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="Empty Cart"
                  className="empty-cart-image"
                />
              )}
            </div>
          )
        }}
      </RestoNameContext.Consumer>
    )
  }
}

export default CartDetails
