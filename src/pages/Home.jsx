import Card from "../components/Card";

const Home = ({
  items,
  cartItems,
  searchValue,
  onChangeInput,
  setSearchValue,
  onAddToCart,
  onAddToFavourite,
  isLoading }) => {

  const renderItems = () => {
    return (
      (isLoading
        ? [...Array(8)]
        : items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())))
          .map((card, index) => <Card
            key={card ? card.id : index}
            onPlus={(obj) => onAddToCart(obj)}
            onFavourite={(obj) => onAddToFavourite(obj)}
            loading={isLoading}
            {...card}
          />)
    )
  }

  return (
    <div className="content">
      <div className="header-block">
        <h1>{searchValue ? `Поиск по запросу: '${searchValue}'` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="search" />
          {searchValue && <img src="/img/btn-remove.svg" alt="clear" className="remove-btn clear" onClick={() => setSearchValue('')} />}
          <input type="text" placeholder="Поиск..." onChange={onChangeInput} value={searchValue} />
        </div>
      </div>
      <div className="sneakers">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home;