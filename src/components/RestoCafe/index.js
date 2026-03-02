import {Component} from 'react'
import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import DishItem from '../DishItem'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ButtonItem = props => {
  const {details, onCategoryChange, isActive} = props
  const {categoryId, categoryName} = details
  const color = isActive ? 'active-color-styling' : 'normal-color-styling'
  const onBtnChange = () => {
    onCategoryChange(categoryId)
  }
  return (
    <li key={categoryId}>
      <button className={`${color}`} onClick={onBtnChange}>
        {categoryName}
      </button>
    </li>
  )
}

class RestoCafte extends Component {
  state = {
    categoryList: [],
    categoryDishesList: [],
    branchName: '',
    restaurantImageUrl: '',
    listOfItems: [],
    totalDishItems: 0,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getDetailsOfMenu()
  }

  onSuccesView = data => {
    const menuData = data[0].table_menu_list
    const branchName = data[0].branch_name
    const restaurantImage = data[0].restaurant_image
    const menuList = menuData.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nexturl,
    }))
    // Category List (ONLY id & name)
    const categoryList = menuData.map(each => ({
      categoryId: each.menu_category_id,
      categoryName: each.menu_category,
    }))

    // Dishes grouped by category
    const categoryDishesList = menuData.map(each => ({
      categoryId: each.menu_category_id,
      dishes: each.category_dishes.map(dish => ({
        dishId: dish.dish_id,
        dishName: dish.dish_name,
        dishPrice: dish.dish_price,
        dishImage: dish.dish_image,
        dishAvailability: dish.dish_Availability,
        dishCalories: dish.dish_calories,
        dishCurrency: dish.dish_currency,
        dishDescription: dish.dish_description,
        addonCat: dish.addonCat,
      })),
    }))

    this.setState({
      categoryList,
      categoryDishesList,
      restaurantImageUrl: restaurantImage,
      activeId: categoryList[0].categoryId,
      branchName,
      apiStatus: apiStatusConstants.success,
    })
  }

  onFailureView = () => {
    this.setStatus({
      apiStatus: apiStatusConstants.failure,
    })
  }

  onCategoryChange = id => {
    this.setState({
      activeId: id,
    })
  }

  onTotalIncrement = () => {
    this.setState(prevState => ({
      totalDishItems: prevState.totalDishItems + 1,
    }))
  }

  onTotalDecrement = () => {
    this.setState(prevState => ({
      totalDishItems: prevState.totalDishItems - 1,
    }))
  }

  getDetailsOfMenu = async () => {
    const menuApi =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(menuApi)

    if (response.ok === true) {
      const data = await response.json()
      console.log('data:', data)
      this.onSuccesView(data)
    } else {
      this.onFailureView()
    }
  }

  renderLoadingView = () => <h1>Loading</h1>

  renderFailureView = () => <h1>Failed</h1>

  renderRestaurantView = () => {
    const {
      branchName,
      categoryList,
      categoryDishesList,
      activeId,
      totalDishItems,
    } = this.state
    const filteredList = categoryDishesList.filter(
      each => each.categoryId === activeId,
    )
    const dishesList = filteredList.length > 0 ? filteredList[0].dishes : []
    // console.log('filtered List:', dishesList, activeId)
    // console.log('Category List:', categoryList)
    // console.log('Category Dishes List:', categoryDishesList)
    return (
      <div className="resto-mainbg-container">
        <div className="resto-header-container">
          <h1 className="header-heading">{branchName}</h1>
          <div className="cart-container">
            <p className="my-orders-para">My Orders</p>
            <div className="cart-image-and-count-container">
              <AiOutlineShoppingCart className="cart-image" />
              <p className="cart-count-para">{totalDishItems}</p>
            </div>
          </div>
        </div>
        <ul className="unordered-list-container">
          {categoryList.map(each => (
            <ButtonItem
              details={each}
              key={each.categoryId}
              onCategoryChange={this.onCategoryChange}
              isActive={each.categoryId === activeId}
            />
          ))}
        </ul>
        <ul className="dishes-list-items">
          {dishesList.map(each => (
            <DishItem
              details={each}
              key={each.dishId}
              onTotalIncrement={this.onTotalIncrement}
              onTotalDecrement={this.onTotalDecrement}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderRestaurantView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default RestoCafte
