import React from 'react';
import Order from './Order';


export default function Header(props) {
    const {countCartItem} = props;
    return (
        <header className="row blockHeader center">
            <div>
                <a href="#/">
                    <h1 style={{color:"white"}}>IT 354 LEGO Shopping Cart</h1>
                    <img className="small" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png" alt="lego" width={'200'} height={'200'}></img>
                    </a>
            </div>
            <div>
                <a href="#/cart" style={{color: 'red'}}>
                    Sign up { ' '}
                {countCartItem? (
                    <button className="ShoppingCard">{countCartItem}</button>
                ): (
                    ''
                )
            }
                </a>{' '}
                <a href="#/signin" style={{color: 'red'}}>Login in</a>
            </div>

            <div className='order'>
             <button data-bs-toggle="collapse" data-bs-target="#OrderShow"  aria-expanded="false" aria-controls="OrderShow" style={{width:'200px', height:'30px'}}>Your Order</button>
              <div className="row">
               <div className="collapse multi-collapse" id="OrderShow">
                 <div className="card card-body">
                   <Order />
                 </div>
               </div>
              </div>
            </div>



        </header>
    )
}