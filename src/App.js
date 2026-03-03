import './App.css'
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import {Component} from 'react'
import RestoCafe from './components/RestoCafe'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import RestoNameContext from './context/CartContext'
import CartDetails from './components/CartDetails'

// write your code here
class App extends Component {
  state = {
    restoName: '',
    totalDishItems: 0,
    cartList: [],
  }

  onSetRestoName = name => {
    this.setState({
      restoName: name,
    })
  }

  addCartItem = details => {
    const {cartList} = this.state
    const isAlerdyPresent = cartList.find(
      each => each.dishId === details.dishId,
    )
    if (isAlerdyPresent === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, details],
        totalDishItems: prevState.totalDishItems + 1,
      }))
    } else {
      const {cartList} = this.state
      const updatedCartList = cartList.map(each => {
        if (each.dishId === details.dishId) {
          const updatedDetails = {...each, count: each.count + details.count}
          return updatedDetails
        }
        return each
      })
      this.setState({
        cartList: updatedCartList,
      })
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.dishId !== dishId)
    this.setState(prevState => ({
      cartList: updatedCartList,
      totalDishItems: prevState.totalDishItems - 1,
    }))
  }
  removeAllCartItems = () => {
    this.setState({
      cartList: [],
      totalDishItems: 0,
    })
  }
  incrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(each => {
      if (each.dishId === dishId) {
        const updatedDetails = {...each, count: each.count + 1}
        return updatedDetails
      }
      return each
    })
    this.setState({
      cartList: updatedCartList,
    })
  }
  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(each => {
          if (each.dishId === dishId) {
            if (each.count > 1) {
              return {...each, count: each.count - 1}
            }
            return null
          }
          return each
        })
        .filter(each => each !== null)

      return {
        cartList: updatedCartList,
      }
    })
  }

  render() {
    const {restoName, totalDishItems, cartList} = this.state
    const length = cartList.length
    console.log(cartList)
    return (
      <RestoNameContext.Provider
        value={{
          restoName,
          cartList,
          totalDishItems: length,
          onSetRestoName: this.onSetRestoName,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={RestoCafe} />
            <ProtectedRoute exact path="/cart" component={CartDetails} />
          </Switch>
        </BrowserRouter>
      </RestoNameContext.Provider>
    )
  }
}

export default App
