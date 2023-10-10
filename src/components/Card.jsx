import React, { useState } from "react";
import ContentLoader from "react-content-loader"
import AppContext from "../context";

const Card = ({ onFavourite, onPlus, id, imgUrl, name, price, favourite = false, loading = true }) => {
    const [isFavourite, setIsFavourite] = useState(favourite);
    const { hasCartItem, hasFavItem } = React.useContext(AppContext)
    const itemObj = { id, parentId: id, imgUrl, name, price };

    const onPlusClick = () => {
        onPlus(itemObj)
    }

    const onFavouriteClick = () => {
        onFavourite(itemObj)
        setIsFavourite(!isFavourite)
    }

    return (

        <div className="card">
            {loading ?
                <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                    <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
                    <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
                    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
                </ContentLoader> :
                <>
                    <div className="favourite" onClick={onFavouriteClick}>
                        {onFavourite && <img className="liked" src={hasFavItem(id) ? "img/like-color.svg" : "img/likes-border.svg"} alt="unliked" />}
                    </div>
                    <img width={133} height={112} src={imgUrl} alt="sneakers-1" />
                    <p className="card__name">{name}</p>
                    <div className="card__down">
                        <div className="card__price-block">
                            <p>Цена:</p>
                            <b>{price} руб.</b>
                        </div>
                        <div onClick={onPlusClick}>
                            {onPlus && <img className="addToBasket" src={hasCartItem(id) ? "img/check.svg" : "img/plus.svg"} alt="addToBasket" />}
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default Card;