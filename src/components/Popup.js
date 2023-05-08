import React from 'react';
import '../styles/Popup.css';

export default function Popup(props) {
  const {product, onAdd, onClick } = props;
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn-pop" onClick={props.closePopup}>x</button>
        <h2>{props.title}</h2>
        <img src={props.image} alt={props.name} />
        <img src={props.detail} alt={props.name} />
        <h2>Pieces: {props.pieces}</h2>
        <h2>Age: {props.age}</h2>
        <h2>Price: <span style={{color:'green'}}>$</span>{props.price}</h2>
        
      </div>
    </div>
  );
}