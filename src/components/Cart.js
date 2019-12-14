import React from 'react'
import { connect } from 'react-redux';
import CartItems from './CartItems';
import {firebase} from '../firebase/firebase';
import { Link } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';
const client = {
  sandbox: 'ATwFQyu3gAIwpqjT5jisMPNnXy3E3OVx39ost8k9DB37ViXl8X6aml6jePdJEqu3043tFGfLY8W5GgxC',
  prdouction: 'ATwFQyu3gAIwpqjT5jisMPNnXy3E3OVx39ost8k9DB37ViXl8X6aml6jePdJEqu3043tFGfLY8W5GgxC'
}
import NavBar from './NavBar';
class Cart extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <div className="wrap cf">
          <h1 className="projTitle"> Shopping Cart</h1>
          <div className="heading cf">
            <h1>Your Items</h1>
            <Link to='/' href="#" className="continue">Continue Shopping</Link>
          </div>
          <div className="cart">

            <ul className="cartWrap">
              {
                localStorage.getItem("cart") !== null ? (JSON.parse(localStorage.getItem("cart")).map((item) => (

                  <CartItems key={item.id} {...item} />
                ))) : <div>No item</div>

              }
            </ul>
          </div>



          <div className="subtotal cf">
            <ul>
              <li className="totalRow"><span className="label">Subtotal</span><span className="value">${(JSON.parse(localStorage.getItem("sum")))}</span></li>

              <li className="totalRow"><span className="label">Shipping</span><span className="value">{JSON.parse(localStorage.getItem("sum")) > 0 ? <p>$5</p> : <p>$0.00</p>}</span></li>
              <li className="totalRow"><span className="label">Tax</span><span className="value">{JSON.parse(localStorage.getItem("sum")) > 0 ? <p>$4.00</p> : <p>$0.00</p>}</span></li>
              <li className="totalRow final"><span className="label">Total</span><span className="value">{JSON.parse(localStorage.getItem("sum")) > 0 ? <p>${JSON.parse(localStorage.getItem("sum")) + 9}</p> : <p>$0.00</p>}</span></li>
              <li className="totalRow">{firebase.auth().currentUser?
              <Link to="/checkout" className="bt continue">Checkout</Link>:<Link to="/loginPage" className="bt continue">Checkout</Link>}
                
              </li>
              

            </ul>
          </div>
        </div>
      </div>




      // {

      //   props.cart.map((item) =>(

      //      <CartItems key={item.id} {...item}  />
      //   ))
      // }





      //     <div>

      //         {
      //   props.cart.length === 0 ? (
      //     <div >
      //       <span>
      //         No Items in Cart
      //       </span>
      //     </div>
      //   ) : (

      //       props.cart.map((item) => {
      //         return <CartItems key={item.id} {...item}  />;
      //       })
      //     )
      // }
      // <button>Proceed To checkout</button>
      //     </div>
    )
  }
};
const mapStateToProps = (state) => ({
  cart: state.cart,
  totalAmount: state.totalAmount
});
export default connect(mapStateToProps)(Cart);