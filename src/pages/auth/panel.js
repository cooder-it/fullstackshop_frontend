import React from 'react'
import './panel.css'
import {connect} from "react-redux"
import { logout } from '../../state/actions/action-creators'
import { Redirect } from 'react-router-dom'


class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            items: []
        }
    }
    deleteAccount() {
        const data = {
            username: this.props.username
        }
        const token = localStorage.getItem('token')
        console.log(token)
        fetch('http://127.0.0.1:8000/auth_user/delete/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => data)
    }
    componentDidMount() {
        const data = {
            username: this.props.username
        }
        fetch('http://127.0.0.1:8000/api/get_user_items/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => this.setState({
            items: data
        }))

    }
    render(){

        const items = this.state.items.map(item => 
            <div key={item.id} className="user_item_container">
                <h2>{item.title}</h2>
                <p>{item.price} $</p>
            </div>
            )
        return (
            <div className="panel_container">
                <div className="panel_header">
                    <button onClick={() => {this.props.logout()}}>{
                        this.props.username ? "Logout" : <Redirect to="/" /> 
                    }</button>
                    <button onClick={() => {
                        this.deleteAccount()
                        this.props.logout()
                    }}>{
                        this.props.username ? "Delete account" : <Redirect to="/" /> 
                    }</button>
                </div>
                <div className="panel_items">
                    Your added items: <br/>
                    {items}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.userData.username
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)