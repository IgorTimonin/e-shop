import { useEffect, useState } from 'react';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';

function Shop() {
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [inCart, setInCart] = useState(false);

  function alertTimer(name) {
    setAlertName(name);
    setTimeout(() => setAlertName(''), 1000);
  }

  //добавление выбранного товара в корзину
  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    alertTimer(item.name);
  };

  //удаление товара из корзины
  const removeFromBasket = (itemId) => {
    const newOrder = order.filter((el) => el.id !== itemId);
    setOrder(newOrder);
  };

  //увеличение кол-ва товаров в корзине
  const incQuantity = (itemId) => {
    const newOrder = order.map((el) => {
      if (el.id === itemId) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity: newQuantity,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
    console.log(order);
  };

  //уменьшение кол-ва товаров в корзине
  const decQuantity = (itemId) => {
    const newOrder = order.map((el) => {
      if (el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  //подсчёт товаров в корзине
  function orderQty(arr) {
    let resultQty = arr.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
    return resultQty;
  }

  //показ кол-ва товаров в карзине
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  return (
    <main className='container content'>
      <Cart quantity={order.length ? orderQty(order) : ''} handleBasketShow={handleBasketShow} />
      <GoodsList
        addToBasket={addToBasket}
        inCart={inCart}
        setInCart={setInCart}
        order={order}
      />
      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}
      {alertName && <Alert name={alertName} />}
    </main>
  );
}

export { Shop };
