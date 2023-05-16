import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckToSlot } from '@fortawesome/free-solid-svg-icons'
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
    // console.log(savedCart)

    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id)
        setCart(remaining)
        removeFromDb(id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    handleClearCart={handleClearCart}
                    cart={cart}
                >
                    <Link className='checkout-link' to='/checkout'>
                        <button className='btn-checkout'>
                            <span>Proceed Checkout</span>
                            <FontAwesomeIcon icon={faCheckToSlot} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;