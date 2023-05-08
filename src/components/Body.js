import React, { useState } from 'react';
import Product from "./Product";
import '../styles/Body.css';
import Popup from "./Popup";

export default function Body(props) {
    const {products, onAdd} = props;
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState({});
    const productGroups = [
        {
            title: "Architecture Series",
            products: products.slice(0, 3),
            className: "architecture-category",
        },
        {
            title: "Marvel",
            products: products.slice(3, 6),
            className: "marvel-category",
        },
        {
            title: "Harry Potter",
            products: products.slice(6, 9),
            className: "harrypotter-category",
        },
    ];
    

     function openPopup(product) {
        setPopupData(product);
        setPopupVisible(true);
    }


    function closePopup() {
        setPopupVisible(false);
    }
    
    return (
        <main className="block col-8">
            <h2 style={{color: 'red'}}><strong>Pick your favorite LEGO product!</strong></h2>
            {productGroups.map((group) => (
                <React.Fragment key={group.title}>
                    <h4>{group.title}</h4>
                    <div className="row">
                        {group.products.map((product) => (
                            <div key={product.id} className="col-4">
                                <Product key={product.id} product={product} onAdd={onAdd} onClick={() => openPopup(product)}/>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ))}
             {popupVisible && <Popup title={popupData.name} price={popupData.price} image={popupData.image} pieces={popupData.pieces} detail={popupData.detail} age={popupData.age} closePopup={closePopup} />}
        </main>
    );
}
