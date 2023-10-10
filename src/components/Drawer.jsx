import { useState } from "react";
import React from 'react'
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ items = [], onCloseCart, onRemove, opened }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { cartItems, setCartItems } = React.useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://651f6efa44a3a8aa4769a8d4.mockapi.io/orders', { items: cartItems })
      setOrderId(data.id)
      setIsOrderComplete(!isOrderComplete)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://651f6efa44a3a8aa4769a8d4.mockapi.io/orders/' + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('Не удалось оформить заказ:(((')
    }
    setIsLoading(false)
  }

  return (
    <div className={`overlay ${opened ? 'overlayVis' : ''}`}>
      <div className="drawer">
        <h2 >Корзина<img src="img/btn-remove.svg" alt="close" className="remove-btn" onClick={onCloseCart} /></h2>

        {items.length === 0 ?
          <Info
            img={isOrderComplete ? "img/order.svg" : "img/empty.jpg"}
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            descr={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'}></Info> :
          <>
            <div className="basketItems">
              {items.map(item => {
                return (
                  <div className="basketItem">
                    <div className="basketItem-img" style={{ backgroundImage: `url(${item.imgUrl})` }}></div>
                    <div className="basketItem__price-block">
                      <p className="card__name">{item.name}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img src="img/btn-remove.svg" alt="remove" className="remove-btn" onClick={() => onRemove(item.id)} />
                  </div>
                )
              })}
            </div>
            <div className="total-block">
              <ul>
                <li className="summary-price">
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="tax">
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{totalPrice*0.05} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="green-btn">Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
            </div>
          </>}


      </div>
    </div>
  )
}

export default Drawer;