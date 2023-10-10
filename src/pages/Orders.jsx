import Card from "../components/Card";
import React, { useState } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://651f6efa44a3a8aa4769a8d4.mockapi.io/orders')
                setOrders(data.map(obj => obj.items).flat())
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
            }
        })()
    }, [])

    return (
        <div className="content">
            <div className="header-block">
                <h1>Мои заказы</h1>
            </div>
            <div className="sneakers">
                {(isLoading
                    ? [...Array(4)]
                    : orders)
                        .map((card, index) => <Card
                            key={card ? card.id : index}
                            loading={isLoading}
                            {...card}
                        />)}
            </div>
        </div>
    )
}

export default Orders;