import Card from "../components/Card";
import React from "react";
import AppContext from "../context";

const Favourites = ({ onAddToCart, onAddToFavourite, isLoading}) => {
    const {favouritesItems} = React.useContext(AppContext)
    return (
        <div className="content">
            <div className="header-block">
                <h1>Мои желания</h1>
            </div>
            <div className="sneakers">
                {favouritesItems
                    .map(card => <Card
                        key={card.id}
                        onPlus={(obj) => onAddToCart(obj)}
                        onFavourite={(obj) => onAddToFavourite(obj)}
                        favourite={true}
                        loading={isLoading}
                        {...card}
                    />)}
            </div>
        </div>
    )
}

export default Favourites;