import React, { useState } from 'react';
import Checkout from './Checkout';


export default function ShoppingCard(props) {
    const {cartItems, onAdd, onRemove} = props;
    const [checkoutVisible, setCheckoutVisible] = useState(false);
    const itemsPrice = cartItems.reduce((a, c) =>a + c.price * c.qty, 0);
    // const taxPrice = itemsPrice * 0.14;
    // const shippingPrice = itemsPrice > 2000 ? 0 : 50;
    // const totalPrice = itemsPrice + taxPrice + shippingPrice;
    const totalPrice = itemsPrice;

    const closePopup = () => {
      setCheckoutVisible(false);
    };
  

    return (
    <aside className="blockShoppingCard col-3">
        <h2>ShoppingCart Items</h2>
        <div>
            {cartItems.length === 0 && <div><h3 style={{margin:'8%'}}>Your Cart is Empty</h3> <img className="small" src = 'https://cdn-icons-png.flaticon.com/512/523/523788.png' ></img></div> }
        </div>
        {cartItems.map((item) => (
            <div key={item.id} className="row">
                <div><strong>{item.name}</strong></div>
                <div className="col-2"><img className="small" src={item.image} alt={item.name} width={'100px'}></img></div>
                <div className="col-2">
                    <button onClick={()=>onAdd(item)} className="add">+</button>
                    <button onClick={()=>onRemove(item)} className="remove">-</button>
                </div>
                <div className="col-2">
                    {item.qty} x ${item.price.toFixed(2)}
                </div>
                </div>
        ))}
        {cartItems.length !== 0 && (
            <>
              <hr></hr>
              {/* <div className="row">
                <div className="col-2">Items Price</div>
                <div className="col-2">${itemsPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col-2">Tax Price</div>
                <div className="col-2">${taxPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col-2">Shipping Price</div>
                <div className="col-2">${shippingPrice.toFixed(2)}</div>
              </div> */}
              <div className="row">
                <div className="col-2"><strong>Total Items Price</strong></div>
                <div className="col-2">${totalPrice.toFixed(2)}</div>
              </div>
              <hr />
              <div className="row">
                <button onClick={() =>  setCheckoutVisible(true)}>
                Checkout
                </button>
              </div>
            </>
        )}
        {checkoutVisible && <Checkout totalPrice={totalPrice} cartItems={cartItems} closePopup={closePopup}/>}
        </aside>
    );
}
