import React from 'react'
import classes from './Header.module.css';
import mealsImg from '../../../assets/meals.jpg'

const Header = () => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <button>Cart</button>
            </header>
            <div>
                <img className={classes['main-image']} src={mealsImg} alt='meals' />
            </div>
        </React.Fragment>
    );
}

export default Header;