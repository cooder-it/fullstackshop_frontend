import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import './register.css'

/*
REJESTRACJA TO METODA POST
state.errors informuje nas o walidacji klienta,
state.apiErrors informuje nas o REST API,
REST API zwraca zawsze informacje czy użytkownik istnieje,
email istnieje, oraz SUCCESS która informuje czy założone zostało konto


*/ 
class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            errors: {
                passwordError: false,
                emailError: false,
                usernameError: false,
            },
            apiErrors: {
                usernameExists: false,
                emailExists: false,
                success: false
            }
        };
        this.handleForm = this.handleForm.bind(this)  
        this.handleSubmit = this.handleSubmit.bind(this)  
    }

    handleForm(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // WALIDACJA

    validation(props) {
        let errors = {
            usernameError: false,
            passwordError: false,
            emailError: false,
        };
        
        const validUsername = (props) => {
            if(props.length > 1) {
                return false;
            }
            else {
                return true;
            };
        };
        const validEmail = (props) => {
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(props.match(mailformat)) {
                return false;
            }
            else {
                return true;
            };
        };
        const validPassword = (props) => {
            if(props.length > 7) {
                return false;
            }
            else {
                return true;
            };
        };
        errors.usernameError = validUsername(props.username)
        errors.emailError = validEmail(props.email);
        errors.passwordError = validPassword(props.password);

        // jeżeli nie ma błędów, to znaczy ze wszystko jest poprawnie
       
        if((!(errors.emailError)) && (!(errors.passwordError))) {
            errors.valid = true;
        }
        this.setState({ errors: errors }) //dodajemy do obiektu errors w razie błedów
        return errors
    }

    // OBSŁUGA SUBMIT

    handleSubmit(e) {
        e.preventDefault()

        const username  = this.state.username;
        const password  = this.state.password;
        const email     = this.state.email;

        const data = {
            "username": username,
            "email": email,
            "password": password
        }
        const errorsData = this.validation(data)
         // FETCH TYLKO GDY DANE SĄ PRAWIDŁOWE (nadpisujemy state)
        // ZAPYTANIE ZWRACA NAM DANE NA PODSTAWIE KTÓRYCH MOŻEMY WYWNIOSKOWAĆ CO JEST NIE TAK
        
        if(errorsData.valid) { 
            
            fetch('https://fullstackshop-api.herokuapp.com/auth_user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => { 
                this.setState({ 
                    username: "",
                    password: "",
                    email: "",
                    apiErrors: data 
                })
            } ) 
            .catch(err => err)
        };
    }
    render() {
    
        const apiErrors = this.state.apiErrors //destruktryzacja
        
        return(
            <div className="auth_container">
                <form className="auth_form" onSubmit={this.handleSubmit}>
                    <label htmlFor="">
                        <input type="text" name="username" onChange={this.handleForm} value={this.state.username} placeholder="Username"/>
                        {apiErrors.usernameExists ? <p className="warning">User exists</p> : null}
                        {this.state.errors.usernameError ? <p className="warning">Wrong username</p> : null}
                    </label>
                    <label htmlFor="">
                        <input type="text" name="email" onChange={this.handleForm} value={this.state.email} placeholder="Email"/>
                        {apiErrors.emailExists ? <p className="warning">Email exists</p> : null}
                        {this.state.errors.emailError ? <p className="warning">Wrong e-mail</p> : null}
                    </label>
                    <label htmlFor="">
                        <input type="password" name="password" onChange={this.handleForm} value={this.state.password} placeholder="Password"/>
                        {this.state.errors.passwordError ? <p className="warning">Password must be at least 7 letters length</p> : null}
                    </label>
                    <button type="submit" >Register</button>
                    {this.state.apiErrors.success ? alert("konto założone pomyślnie") : null}
                    {this.state.apiErrors.success ? <Redirect to="/login/" /> : null}
                </form>
                <div className="auth_switch">
                    <p>Do you have account ?</p>
                    <Link to="/login/">Login</Link>
                </div>
            </div>
        )
    }
}

export default RegisterForm;