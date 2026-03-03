import {Component} from 'react'
import './index.css'
import RestoNameContext from '../../context/CartContext'

class DishItem extends Component {
  state = {
    count: 0,
  }

  render() {
    const {details} = this.props
    const {
      dishId,
      dishName,
      dishPrice,
      dishImage,
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      addonCat,
    } = details
    const {count} = this.state
    const dotBorderStyle = dishAvailability
      ? 'green-dot-border'
      : 'red-dot-border'
    const dotParaStyle = dishAvailability ? 'green-dot-para' : 'red-dot-para'

    return (
      <RestoNameContext.Consumer>
        {value => {
          const {addCartItem} = value
          const onClickAddToCart = () => {
            const {count} = this.state
            if (count >= 1) {
              addCartItem({...details, count})
            }
          }

          const onIncrement = () => {
            this.setState(prevState => ({
              count: prevState.count + 1,
            }))
          }

          const onDecrement = () => {
            const {count} = this.state
            if (count > 0) {
              this.setState(prevState => ({
                count: prevState.count - 1,
              }))
            }
          }

          return (
            <div className="dish-item-bg-container">
              <div className="first-container">
                <div className={`${dotBorderStyle}`}>
                  <p className={`${dotParaStyle}`} />
                </div>
              </div>
              <div className="description-container">
                <h1 className="dish-item-heading">{dishName}</h1>
                <p>
                  {dishCurrency} {dishPrice}
                </p>
                <div className="dish-details-container">
                  <p className="dish-description">{dishDescription}</p>
                  <p className="dish-calories">{dishCalories} calories</p>
                </div>
                {dishAvailability && (
                  <div className="increment-decrement-container">
                    <button onClick={onDecrement} className="button">
                      -
                    </button>
                    <p>{count}</p>
                    <button onClick={onIncrement} className="button">
                      +
                    </button>
                  </div>
                )}
                {!dishAvailability && (
                  <p className="dish-not-available-style">Not available</p>
                )}
                {dishAvailability && addonCat.length > 0 && (
                  <p className="dish-available-style">
                    Customizations available
                  </p>
                )}
                {dishAvailability && (
                  <button
                    className="add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
              <img src={dishImage} className="dish-image" />
            </div>
          )
        }}
      </RestoNameContext.Consumer>
    )
  }
}

export default DishItem
