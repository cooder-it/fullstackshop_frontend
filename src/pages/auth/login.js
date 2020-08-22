import React from 'react';
import { connect } from 'react-redux'
import { fetchUser } from '../../state/actions/action-creators'
import { Link, Redirect } from "react-router-dom"
import './login.css'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleForm   = this.handleForm.bind(this)  
        this.handleSubmit = this.handleSubmit.bind(this)  
    }


    handleForm(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const username = this.state.username;
        const password = this.state.password;
    
        //REDUX
        this.props.fetchUser(username, password);
    }
    render() {
        return(
            <div className="auth_container">
                <form className="auth_form" onSubmit={this.handleSubmit}>
                    <label htmlFor="">
                        <input type="text" name="username" placeholder="Username" onChange={this.handleForm}/>
                    </label>
                    <label htmlFor="">
                        <input type="password" name="password" placeholder="Password" onChange={this.handleForm}/>
                    </label>
                    <button type="submit" >Login</button>
                    {this.props.userData.username ? <Redirect to="/" /> : null}
                </form>
                <div className="auth_switch">
                    <p>Don't have account ?</p>
                    <Link to="/register/">Register</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (username, password) => dispatch(fetchUser(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
