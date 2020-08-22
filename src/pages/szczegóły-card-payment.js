import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/card-payment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51H85zIGFoPYSSbM6YPGvgXPXiNHAT0CWKbo7bjOqN7gbwteg6K7DdsWGeCTer32GocY61oZrgMWeF87MKeuJinvZ00RjkwoFmm');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      {stripePromise ? <CheckoutForm/> : <p>Loading</p>}
    </Elements>
  );
};
export default App