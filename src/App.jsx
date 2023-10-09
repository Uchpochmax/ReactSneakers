import { useEffect, useState } from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import AppContext from "./context"
import Orders from "./pages/Orders";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favouritesItems, setFavouritesItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResp = await axios.get('https://651b57f8194f77f2a5ae6f15.mockapi.io/cart')
        const favResp = await axios.get('https://651373a38e505cebc2e9df02.mockapi.io/favourites')
        const itemsResp = await axios.get('https://651b57f8194f77f2a5ae6f15.mockapi.io/items')

        setIsLoading(false)

        setCartItems(cartResp.data)
        setFavouritesItems(favResp.data)
        setItems(itemsResp.data)
      } catch (error) {
        alert('Ошибка при запросе данных;(')
      }
    }

    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findCartItem = cartItems.find(item => +item.parentId === +obj.id)
      if (findCartItem) {
        setCartItems((prev) => prev.filter(item => +item.parentId !== +obj.id))
        await axios.delete(`https://651b57f8194f77f2a5ae6f15.mockapi.io/cart/${findCartItem.id}`)
      }
      else {
        const { data } = await axios.post('https://651b57f8194f77f2a5ae6f15.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }


  const onAddToFavourite = async (obj) => {
    try {
      if (favouritesItems.find(favObj => +favObj.id === +obj.id)) {
        axios.delete(`https://651373a38e505cebc2e9df02.mockapi.io/favourites/${obj.id}`)
        setFavouritesItems((prev) => prev.filter(item => +item.id !== +obj.id))
      }
      else {
        const resp = await axios.post('https://651373a38e505cebc2e9df02.mockapi.io/favourites', obj)
        setFavouritesItems((prev) => [...prev, resp.data])
      }
    }
    catch (err) {
      alert('Не удалось добавить в избранное')
    }
  }
  const onChangeInput = (e) => {
    setSearchValue(e.target.value)
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://651b57f8194f77f2a5ae6f15.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Ошибка при удалении из корзины:(((')
    }
  }

  const hasCartItem = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favouritesItems, setCartOpened, setCartItems, hasCartItem, onAddToCart, onAddToFavourite }}>
      <div className="wrapper">
        <Drawer onCloseCart={() => setCartOpened(false)} items={cartItems} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path="/" element={
            <Home items={items} cartItems={cartItems} searchValue={searchValue} onChangeInput={onChangeInput} setSearchValue={setSearchValue} onAddToFavourite={onAddToFavourite} onAddToCart={onAddToCart} isLoading={isLoading} />
          }></Route>
          <Route path="/favourites" element={
            <Favourites onAddToFavourite={onAddToFavourite} onAddToCart={onAddToCart} isLoading={isLoading} />
          }></Route>
          <Route path="/orders" element={
            <Orders onAddToFavourite={onAddToFavourite} onAddToCart={onAddToCart} isLoading={isLoading} />
          }></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

