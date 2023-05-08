import React from 'react';
import '../styles/Checkout.css';
import {Amplify} from 'aws-amplify';
import { API } from 'aws-amplify';
import awsOrder from '../aws-import';
import { v4 as uuidv4 } from 'uuid';
import { AWSDate } from '@aws-amplify/core';

Amplify.configure(awsOrder);

export default function Checkout(props) {
  const { cartItems, totalPrice, closePopup } = props;
  const taxPrice = totalPrice * 0.14;
  const shippingPrice = totalPrice > 2000 ? 0 : 50;
  const Price  = totalPrice + taxPrice + shippingPrice;
  const now = new Date();
  // const time=getTime();
  const isoString = now.toISOString().slice(0, 10);
  

  const orderId = uuidv4().toString();
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    if (!form.checkValidity()) {
      return;
    }

    const formData = {
      input: {
        id: orderId,
        FirstName: document.getElementById('fname').value,
        LastName: document.getElementById('lname').value,
        Address: document.getElementById('address').value,
        City: document.getElementById('city').value,
        ZipCode: document.getElementById('zip').value,
        CardNumber: document.getElementById('cc-number').value,
        Orders: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
        TotalPrice: Price,
        Date: isoString,
      }
    };

    const createOrderMutation = `
      mutation CreateOrder(
        $id: String!,
        $FirstName: String!,
        $LastName: String!,
        $Address: String!,
        $City: String!,
        $ZipCode: String!,
        $CardNumber: Int!,
        $Orders: String!,
        $TotalPrice: Float!,
        $Date: AWSDate!
      ) {
        createOrder(input: {
          id: $id,
          FirstName: $FirstName,
          LastName: $LastName,
          Address: $Address,
          City: $City,
          ZipCode: $ZipCode,
          CardNumber: $CardNumber,
          Orders: $Orders,
          TotalPrice: $TotalPrice,
          Date: $Date
        }) {
          id
        }
      }
    `;

    try {
      const graphqlResponse = await API.graphql({
        query: createOrderMutation,
        variables: formData.input,
      });
      console.log(graphqlResponse.data.createOrder.id);
      alert('Your order was successfully submitted!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup">
      <div className="checkOut-inner">
      <button className="close-btn" onClick={props.closePopup}>x</button>

        <h3 style={{fontSize:'25px', paddingBottom:'3%'}}><strong>Billing address</strong></h3>

        <div class="row">
        <div class="col-md-6 mb-3">
        <label htmlFor="name">First Name:</label>
        <input type="text" class="form-control" id="fname" required/>
        </div>


        <div class="col-md-6 mb-3">
        <label htmlFor="name">Last Name:</label>
        <input type="text" class="form-control" id="lname" required/>
        </div>

        </div>

        <label htmlFor="email">Email:</label>
        <input type="text" class="form-control" id="Email" required/>

        <label htmlFor="address">Address:</label>
        <input type="text" class="form-control" id="address" required />

        <label htmlFor="address">Address 2 (Optional):</label>
        <input type="text" class="form-control" id="address2"/>
        
        <label htmlFor="city">City:</label>
        <input type="text" class="form-control" id="city" required />

        <label htmlFor="zip">Zip Code:</label>
        <input type="text" class="form-control" id="zip" required />


        <h3 style={{fontSize:'25px', paddingBottom:'1%', paddingTop:'2%'}}><strong>Payment</strong></h3>
        <div class="d-block my-3">
          <div class="custom-control custom-radio">
            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required />
            <label class="custom-control-label" htmlFor="credit">Credit card</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required />
            <label class="custom-control-label" htmlFor="debit">Debit card</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required />
            <label class="custom-control-label" htmlFor="paypal">PayPal</label>
          </div>
        </div>
      
        <div class="row">
          <div class="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input type="text" class="form-control" id="cc-name" placeholder="" required />
            <small class="text-muted">Full name as displayed on card</small>
            <div class="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label htmlFor="cc-number">Credit card number</label>
            <input type="text" class="form-control" id="cc-number" placeholder="" required />
            <div class="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label htmlFor="cc-expiration">Expiration</label>
            <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
            <div class="invalid-feedback">
              Expiration date required
            </div>
          </div>
          <div class="col-md-6">
            <label htmlFor="cc-cvv">CVV</label>
            <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
            <div class="invalid-feedback">
              Security code required
            </div>
          </div>
        </div>

        <h3 style={{fontSize:'25px', paddingBottom:'1%', paddingTop:'2%'}}><strong>Order Summary</strong></h3>
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-6" style={{fontSize:'15px',paddingBottom:'3%'}}>{item.name}</div>
            <div className="col-3">{item.qty} x ${item.price.toFixed(2)}</div>
          </div>
        ))}
        <hr></hr>

        <div className="row">
                <div className="col-6">Tax Price</div>
                <div className="col-3">${taxPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col-6">Shipping Price</div>
                <div className="col-3">${shippingPrice.toFixed(2)}</div>
              </div>
        <h3 style={{fontSize:'25px', paddingBottom:'1%', marginTop:'6%'}}><strong>Total Price:</strong> <span style={{color:'orange'}}>${Price.toFixed(2)}</span></h3>


    
        <button type="submit"  style={{marginTop: '6%', marginLeft:'10%'}} onClick={handleFormSubmit}>Place Order</button>
        </div>
        </div>
  );

  function getTime() {
    var currentDate = new Date();
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return currentDate.toLocaleDateString('en-US', options).split('/').reverse().join('-');    
  }
}