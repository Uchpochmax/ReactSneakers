import { Link } from 'react-router-dom';
import React from 'react';
import AppContext from '../context';

const Header = (props) => {
    const { cartItems } = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return (
        <header className="header">
            <Link to="">
                <div className="header-left">
                    <img width={40} height={40} src="img/logo-sneakers.svg" alt="" />
                    <div className="header-info">
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="header-right">
                <li className="basket-price" onClick={props.onClickCart}>
                    <img width={18} height={18} src="img/basket.svg" alt="basket" className="img-basket" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="favourites">
                        <img width={18} height={18} src="img/likes.svg" alt="favourites" className="img-likes" />
                    </Link>
                </li>
                <li>
                    <Link to="orders">
                        <img width={18} height={18} src="img/user.svg" alt="user-logo" className="img-user" />
                    </Link>

                </li>
            </ul>
        </header>
    )
}

export default Header;
