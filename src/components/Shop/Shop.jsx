import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    const [productsPerPage, setProductsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const { totalProducts } = useLoaderData()
    const pages = Math.ceil(totalProducts / productsPerPage)

    const pagesNumber = [...Array(pages).keys()]
    console.log(pagesNumber)

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, productsPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart()
        const ids = Object.keys(storedCart)
        const token = localStorage.getItem('emajohn-access-token')

        fetch("http://localhost:5000/products-by-ids", {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                const savedCart = [];
                //step-1: get id of the added product
                for (const id in storedCart) {
                    //step-2: get the product from products state using id
                    const addedProduct = data.find(product => product._id === id)

                    if (addedProduct) {
                        //step-3: set the quantity
                        const quantity = storedCart[id]
                        addedProduct.quantity = quantity;
                        //step-4: add the added product to the saved cart
                        savedCart.push(addedProduct)
                    }
                }
                //step-5: set the cart
                setCart(savedCart)
            })
    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product]
        // if product doesn't exists in the card, then set quantity = 1
        // if exists update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }

        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    const options = [5, 10, 15, 20]

    const handleSelectedPage = (event) => {
        setProductsPerPage(event.target.value)
        setCurrentPage(0)
    }
    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>

                <div className='cart-container'>
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='review-link' to='/orders'>
                            <button className='btn-review-order'>
                                <span>Review Order</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>

            <div className='pagination'>
                <p>Current Page: {currentPage + 1}</p>
                {
                    pagesNumber.map(number => <button key={number}
                        onClick={() => setCurrentPage(number)}
                        className={number === currentPage ? 'selected' : ''}
                    >{number + 1}</button>)
                }
                <select value={productsPerPage} onChange={handleSelectedPage}>
                    {
                        options.map(option => <option key={option}>
                            {option}
                        </option>)
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;