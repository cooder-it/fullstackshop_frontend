import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/card-payment';
import './szczegóły-przedmiot.css'


const stripePromise = loadStripe('pk_test_51H85zIGFoPYSSbM6YPGvgXPXiNHAT0CWKbo7bjOqN7gbwteg6K7DdsWGeCTer32GocY61oZrgMWeF87MKeuJinvZ00RjkwoFmm');

class NoteDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note_detail: {},
            payment: false,
            redirect: false
        }
        this.setPayment = this.setPayment.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        fetch(`https://fullstackshop-api.herokuapp.com/api/item_detail/${id}`)
        .then(res => res.json())
        .then(data => this.setState(
            {note_detail: data}
            ))
        .catch(error => error)
    }

    setPayment() {
        this.setState({
            payment: true
        })
    }

    render() {
        const { title, price, description } = this.state.note_detail

      
        return (
            <div className="notatka_detal_container">
                <div className="notatka_detal_header">
                    <button onClick={()=>{window.history.go(-1)}}>Back</button>
                    <button onClick={()=>this.setPayment()}>Buy</button>
                </div>
                <div className="notatka_detal">
                    <h1>{title}</h1>
                    <p>Description: <br/>{description}</p>
                    <p>Price: {price}$</p>
                    {this.state.payment ? 
                        <Elements className="payment" stripe={stripePromise}>
                            <p>Use following card number: 4242 4242 4242 4242</p>
                            <CheckoutForm/>
                        </Elements> : 
                        null}
                </div>
            </div>
        )
    }
}

export default NoteDetail