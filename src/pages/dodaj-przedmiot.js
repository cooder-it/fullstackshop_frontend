import React from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom"


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            price: 0,
            added: false
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
        const data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            username: this.props.username
        }
        const token = localStorage.getItem('token')
        
        if((data.title == '') || (data.description == '') || (data.price == 0)) {
            alert("Fields cannot be empty")
            return
        }

        fetch('https://fullstackshop-api.herokuapp.com/api/create_item/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: "",
                    description: "",
                    price: 0
                })
                alert("Item added succesfully")
            }) 
            .catch(err => err)
    }
    render() {
        return(
            <div className="auth_container">
                <form className="auth_form" onSubmit={this.handleSubmit}>
                    <label htmlFor="">
                        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleForm}/>
                    </label>
                    <label htmlFor="">
                        <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleForm}/>
                    </label>
                    <label htmlFor="">
                        <input type="number" name="price" placeholder="Price" value={this.state.price} onChange={this.handleForm}/>
                    </label>
                    <button type="submit" >Add item</button>
                    {this.props.username ? null : <Redirect to="/" />}
                </form>
                <div className="auth_switch">
                    <Link to="/">Back</Link>
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

export default connect(mapStateToProps)(LoginForm)
