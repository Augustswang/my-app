import './App.css';
import { useState, useEffect } from 'react';
import {Amplify} from 'aws-amplify';
import { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import Header from './components/Header';
import Body from './components/Body';
import ShoppingCard from './components/ShoppingCard';
import NavBar  from './components/NavBar';
import Footer from './components/Footer'
import Order from './components/Order';

Amplify.configure(awsconfig);

function App() {
  // const { products } = data;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoppingCards = await API.graphql({
          query: `
          query listProducts {
            listProducts {
              items {
                id
                name
                price
                age
                image
                detail
                pieces
              }
            }
          }
          `
        });
      
        setProducts(shoppingCards.data.listProducts.items);
        console.log(shoppingCards.data);
      } catch (error) {
        console.log('Error fetching shopping cards', error);
      }
    };

    fetchData();
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find(x =>x.id === product.id);
    if(exist) {
      setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty +1 } : x 
        )
        );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) => x.id === product.id ? {...exist, qty: exist.qty - 1} : x
        )
      );
    }
  };

  return (
    <div className="App">
      <NavBar></NavBar>
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
      <Body onAdd = {onAdd} products={products}></Body>
      <ShoppingCard onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></ShoppingCard>
      </div>
     <Footer />
    </div>
  );
}

export default App;
