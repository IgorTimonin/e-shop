import { useEffect, useState } from 'react';
import { BasketItem } from './BasketItem';

function BasketList(props) {
  const {
    order = [],
    handleBasketShow = Function.prototype,
    removeFromBasket = Function.prototype,
    incQuantity,
    decQuantity,
  } = props;

  const testPhone = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  const [purchase, setPurchase] = useState(false);

  function handlePurchase() {
    setPurchase(true);
  }

  function handleBack() {
    setPurchase(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (totalPrice <= 0) {
      setPurchase(false);
    }
  }, [totalPrice]);

  return (
    <>
      <div className='popup'>
        <ul className='collection basket-list'>
          <li className='collection-item active grey darken-4'>Корзина</li>
          {order.length ? (
            order.map((item) => (
              <BasketItem
                key={item.id}
                removeFromBasket={removeFromBasket}
                incQuantity={incQuantity}
                decQuantity={decQuantity}
                {...item}
              />
            ))
          ) : (
            <li className='collection-item'>Корзина пуста</li>
          )}
          <li className='collection-item active grey darken-4'>
            Общая стоимость: {totalPrice} ₽{' '}
          </li>
          {!purchase ? (
            <>
              <li className='collection-item center'>
                <button
                  className='btn btn-opacity green accent-4'
                  onClick={handlePurchase}
                  disabled={!order.length}
                >
                  Оформить заказ
                </button>
              </li>
              <i
                className='material-icons basket-close'
                onClick={handleBasketShow}
              >
                clear
              </i>
            </>
          ) : (
            ''
          )}
          {purchase ? (
            <div className='collection-item center row'>
              <form
                className='col s12'
                id='purchaseForm'
                method='POST'
                onSubmit={handleSubmit}
              >
                <div className='row'>
                  <div className='input-field col s6'>
                    <input
                      placeholder='Имя'
                      id='name'
                      type='text'
                      required
                    ></input>
                  </div>
                  <div className='input-field col s6'>
                    <input
                      placeholder='Телефон: +71234567899'
                      id='phone'
                      type='text'
                      pattern='^\+?[78][- ]?(\(?\d{3}\)?)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$'
                      required
                    ></input>
                  </div>
                </div>
                <button className='btn btn-opacity grey' onClick={handleBack}>
                  назад
                </button>
                <button
                  type='submit'
                  className='btn btn-opacity green accent-4 btn-submit'
                >
                  завершить покупку
                </button>
              </form>
            </div>
          ) : (
            ''
          )}
        </ul>
      </div>
    </>
  );
}

export { BasketList };
