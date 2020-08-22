import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import React from "react"
import './header.css'

/*
menu główne
możliwość logowania tylko jak użytkownik nie jest zalogowany
jeżeli jest zalogowany, ma dostęp do panelu konta a logowanie jest wyłączone
*/

const Header = ({ username }) => (
  <header className="navbar">
    <ul>
      <li className="logo"><NavLink to="/">Fullstack Shop</NavLink></li>
        {username ? <li>Welcome, {username}</li> : null}
      <li className="login_btn">
        {username ? <NavLink to="/panel">Panel</NavLink> : <NavLink to="/login/">Login</NavLink>}
      </li>
    </ul>
  </header>
)

Header.propTypes = {
  username: PropTypes.string
}

Header.defaultProps = {
  username: null
}

const mapStateToProps = state => {
    return {
        username: state.userData.username
    }
}

export default connect(mapStateToProps)(Header)
