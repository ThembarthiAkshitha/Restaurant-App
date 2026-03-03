import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }
  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg: errorMsg,
    })
  }
  onSubmitSuccess = data => {
    const {history} = this.props
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }
  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const user = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
    }
  }
  onUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-main-bg-container">
        <form onSubmit={this.onFormSubmit} className="form-container">
          <h1 className="login-heading">Login here!</h1>
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            onChange={this.onUsername}
            className="input-box"
          />
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            onChange={this.onPassword}
            className="input-box"
          />
          <button className="login-button">Login</button>
          {showErrorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
