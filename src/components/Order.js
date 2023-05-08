import React from 'react';
import { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import awsOrder from '../aws-import';

Amplify.configure(awsOrder);

export default function Order(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await API.graphql({
          query: `
          query listOrders {
            listOrders {
              items {
                Address
                CardNumber
                City
                Date
                FirstName
                LastName
                TotalPrice
                ZipCode
                id
              }
            }
          }
          `
        });

        

        setOrders(ordersData.data.listOrders.items);
        console.log(ordersData.data);
      } catch (error) {
        console.log('Error fetching Orders', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await API.graphql({
        query: `
          mutation deleteOrder($id: String!) {
            deleteOrder(input: {id: $id}) {
              id
            }
          }
        `,
        variables: { id: orderId }
      });
      setOrders(orders.filter(order => order.id !== orderId));
      console.log(`Order ${orderId} deleted successfully`);
    } catch (error) {
      console.log('Error deleting order', error);
    }
  }
  
  

  return(
    <div className="container-fluid">
      {orders.map((order) => (
        <div key={order.id}>
          <h2><strong>Order Id: </strong>{order.id}</h2>
          {/* <h2>Order Summary:</h2> */}
          {/* <h2>{order.Orders}</h2> */}
          {/* <ul>
            {order.Orders.map((item) => (
              <li key={item.id}>
                {item.name} x {item.qty}, ${item.price}
              </li>
            ))}
            {order.Order}
          </ul> */}
          <h2><strong>TotalPrice: </strong><span style={{color: 'orange'}}>$</span>{order.TotalPrice.toFixed(2)}</h2>
          <div className='row'>
            {/* <div className='col-6'> */}
          <h2><strong>Credit Card Number:</strong> {order.CardNumber}  &emsp;            Payment Date: {order.Date}</h2>
             {/* </div> */}
             {/* <div className='col-6'>
          <h2>Payment Date: {order.Date}</h2>
             </div> */}
          </div>
          <h2><strong>Billing address:</strong></h2>
          <h2>{order.FirstName} {order.LastName}</h2>
          <h2>{order.Address} {order.City} {order.ZipCode}</h2>
          <button
            type="button"
            style={{marginTop: '1%', marginLeft:'0%', width:'50%'}}
            onClick={() => handleDeleteOrder(order.id)}
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  )
}
