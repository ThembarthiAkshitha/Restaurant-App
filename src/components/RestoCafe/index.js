import {Component} from 'react'
import './index.css'
import DishItem from '../DishItem'
import RestoNameContext from '../../context/CartContext'
import Header from '../Header'

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
    apiStatus: apiStatusConstants.inProgress,
  }
  static contextType = RestoNameContext

  componentDidMount() {
    this.getDetailsOfMenu()
  }

  onSuccesView = data => {
    console.log(data)
    const menuData = data[0].table_menu_list
    const restaurantName = data[0].restaurant_name
    const restaurantImage = data[0].restaurant_image

    const {onSetRestoName} = this.context
    onSetRestoName(restaurantName)

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
      restaurantName,
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
    const {categoryList, categoryDishesList, activeId} = this.state
    const filteredList = categoryDishesList.filter(
      each => each.categoryId === activeId,
    )
    const dishesList = filteredList.length > 0 ? filteredList[0].dishes : []
    // console.log('filtered List:', dishesList, activeId)
    // console.log('Category List:', categoryList)
    // console.log('Category Dishes List:', categoryDishesList)
    return (
      <div className="resto-mainbg-container">
        <Header />
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
