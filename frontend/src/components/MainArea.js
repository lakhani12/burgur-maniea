import React, { useState, useEffect } from 'react';
import '../styles/mainarea.css';
import Header from './Header';
import pizzaboy from '../assests/pizzaboy.png';
import Product from './products/Product';
import { useSelector } from 'react-redux';

const MainArea = () => {
    const user = useSelector(state => state.user);
    const [category, setCategory] = useState('Burger'); // Initial category is 'Burger'

    useEffect(() => {
        // This ensures that whenever the category changes, we log or take any side effect.
        console.log(`Selected category is: ${category}`);
    }, [category]); // This hook runs whenever 'category' is updated.

    return (
        <div className="mainarea">
            <Header />
            <div className="banner">
                <div className="img">
                    <img src={pizzaboy} alt="" />
                </div>
                <div className="text">
                    <h2>Hello {user?.user?.name}</h2>
                    <p>Get Free delivery on <span>500 Rs.</span> and above</p>
                    <button>Order Now!</button>
                    <img className="full circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
                    <img className="small circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
                    <img className="smaller circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
                    <img className="half circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orange_circle_100%25.svg/768px-Orange_circle_100%25.svg.png" alt="" />
                </div>
            </div>

            {/* Category area */}
            <div className="category-area">
                <h3>Menu</h3>
                <div className="category">
                    {['Burger', 'Sandwich', 'Smoothy', 'Snak', 'Drink'].map(item => (
                        <div
                            key={item}
                            className={`cat-icon ${category === item && 'active'}`}
                            onClick={() => setCategory(item)}
                        >
                            <div className="img">
                                <img
                                    src={
                                        item === 'Burger'
                                            ? 'https://cdn-icons-png.flaticon.com/128/878/878052.png'
                                            : item === 'Sandwich'
                                            ? 'https://cdn-icons-png.flaticon.com/128/6518/6518098.png'
                                            : item === 'Smoothy'
                                            ? 'https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/2x/external-ice-cream-carnival-vitaliy-gorbachev-flat-vitaly-gorbachev.png'
                                            : item === 'Snak'
                                            ? 'https://img.icons8.com/color/2x/popcorn.png'
                                            : 'https://img.icons8.com/external-itim2101-flat-itim2101/2x/external-drinking-cafe-itim2101-flat-itim2101.png'
                                    }
                                    alt={item}
                                />
                            </div>
                            <div className="text">{item}</div>
                        </div>
                    ))}
                </div>

                <div className="all-list">
                    {/* Ensure Product component is rendered with the updated 'category' */}
                    <Product category={category} />
                </div>
            </div>
        </div>
    );
};

export default MainArea;
