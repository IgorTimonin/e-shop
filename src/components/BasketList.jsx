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

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  function handlerName(e) {
    setUserName(e.target.value);
  }

  function handlerPhone(e) {
    setUserPhone(e.target.value);
  }

  /* eslint-disable */
  (function () {
    var PM_YM_COUNTER = (91204849, 'reachGoal', 'purchaseForm');
    var ee = setInterval(function () {
      if (typeof window.ym != 'undefined') {
        ym(PM_YM_COUNTER, 'reachGoal', 'purchaseForm');
        clearInterval(ee);
      } else {
        console.log('Метрика не инициализирована');
      }
    }, 500);
  })();
  /* eslint-enable */

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

  const yMetrika = () => {
    ym(91204849, 'reachGoal', 'purchaseForm'); //eslint-disable-line
  };

  async function formSend(data) {
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      let result = await response.json();
      console.log(result.message);
    } else {
      console.log('Ошибка')
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    yMetrika();

    const Data = { name: userName, phone: userPhone, order };
    formSend(Data);
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
                      value={userName}
                      onChange={handlerName}
                      required
                    ></input>
                  </div>
                  <div className='input-field col s6'>
                    <input
                      placeholder='Телефон: +71234567899'
                      id='phone'
                      type='text'
                      pattern='^\+?[78][- ]?(\(?\d{3}\)?)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$'
                      value={userPhone}
                      onChange={handlerPhone}
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
