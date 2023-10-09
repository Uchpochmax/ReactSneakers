import React from 'react'
import AppContext from '../context';

const Info = ({title, descr, img}) => {
    const {setCartOpened} = React.useContext(AppContext)

    return (
        <div className="cart-empty">
            <img src={img} width={120} height={120} alt="empty" className='cart-img'/>
            <h2>{title}</h2>
            <p>{descr}</p>
            <button onClick={() => setCartOpened(false)} className="green-btn"><img src="/img/arrow.svg" alt="arrow" />Вернуться назад </button>
        </div>
    )
}

export default Info;
