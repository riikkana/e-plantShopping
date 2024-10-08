import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(true);


  // Calculate total amount for all products in the cart

  const calculateTotalAmount = () => {
       return cart.reduce((total, item) => {
        const itemCost = parseFloat(item.cost.replace('$', ''));
        return total + item.quantity * itemCost;
    }, 0);
 
  };

  //const handleContinueShopping = (e) => {
  //  e.preventDefault();
  //  setShowCart(false);
  // };

//TOIMII
  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

//TOIMII
  const handleIncrement = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity: quantity + 1 }));
  };

//TOIMII
  const handleDecrement = (name, quantity) => {
    if (quantity === 1) {
        dispatch(removeItem(name));
    } else {
        dispatch(updateQuantity({ name, quantity: quantity - 1 }));
    }
  };

//TOIMII
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', ''));
    return item.quantity * itemCost;
 
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item.name, item.quantity)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>

  );
};

export default CartItem;


