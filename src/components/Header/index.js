import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import RestoNameContext from '../../context/CartContext'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <RestoNameContext.Consumer>
      {value => {
        const {restoName, totalDishItems} = value
        return (
          <nav className="resto-header-container">
            <Link to="/" className="link-style">
              <li className="link-style">
                <h1 className="header-heading">{restoName}</h1>
              </li>
            </Link>
            <Link to="/cart" className="link-style">
              <li className="link-style">
                <div className="header-cart-container">
                  <p className="my-orders-para">My Orders</p>
                  <div className="cart-image-and-count-container">
                    <button data-testid="cart" className="cart-button">
                      <AiOutlineShoppingCart className="cart-image" />
                    </button>
                    <p className="cart-count-para">{totalDishItems}</p>
                  </div>
                </div>
              </li>
            </Link>
            <button className="log-out-btn" onClick={onLogout}>
              Logout
            </button>
          </nav>
        )
      }}
    </RestoNameContext.Consumer>
  )
}

export default withRouter(Header)
