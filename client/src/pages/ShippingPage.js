import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Title } from '../components/UtilityComponents';

function ShippingPage(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, state, postalCode, country }));
    props.history.push('payment')

  }
  return <div>
    <CheckoutSteps step1 step2 />
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container" style={{ width: "32rem" }}>
          <li>
            <Title styles={{ fontSize: 30, textAlign: "center", width: "100%" }} >Shipping</Title>
          </li>
          <li>
            <label htmlFor="address">
              Address
           </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
           </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="state">
              State
           </label>
            <input type="text" name="state" id="state" onChange={(e) => setState(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
           </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
           </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>

          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>
        </ul>
      </form>
    </div>
  </div>


}
export default ShippingPage; 