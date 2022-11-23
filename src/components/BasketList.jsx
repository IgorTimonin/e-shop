import { useEffect, useState } from 'react';
import { BasketItem } from './BasketItem';
import { useForm, ValidationError } from '@formspree/react';

function BasketList(props) {
  const {
    order = [],
    handleBasketShow = Function.prototype,
    removeFromBasket = Function.prototype,
    incQuantity,
    decQuantity,
  } = props;

  const [purchase, setPurchase] = useState(false);
  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  useEffect(() => {
    if (totalPrice <= 0) {
      setPurchase(false);
    }
  }, [totalPrice]);

  //Подключение formspree для отправки формы
  const [state, handleSubmit] = useForm('mpznbvyq');
  if (state.succeeded) {
    return <p>Заказ оформлен. Спасибо за покупку.</p>;
  }

  /* eslint-disable */ // отключение eslint для Yandex метрики
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

  const yMetrika = () => {
    ym(91204849, 'reachGoal', 'purchaseForm');
  };
  /* eslint-enable */

  function handlePurchase() {
    setPurchase(true);
  }

  function handleBack() {
    setPurchase(false);
  }

  // добавления к форме данных о заказаных товарах
  function goodsForm(item) {
    return `Товар: ${item.name}: ${item.quantity} шт. цена: ${
      item.price
    } руб. / Сумма: ${item.price * item.quantity} руб.`;
  }

  // function handleFormSubmit(e) {
  //   e.preventDefault();
  //   yMetrika();
  // }

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
          <i
            className='material-icons basket-close btn-opacity'
            onClick={handleBasketShow}
          >
            clear
          </i>
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
            </>
          ) : (
            ''
          )}
          {purchase ? (
            <div className='collection-item center row'>
              <form
                action='https://formspree.io/f/mpznbvyq'
                method='POST'
                // onSubmit={handleSubmit}
                className='col s12'
                id='purchaseForm'
              >
                <div className='row'>
                  <div className='input-field col s6'>
                    <input
                      className='input'
                      id='userName'
                      type='text'
                      name='Имя'
                      placeholder='Имя'
                      required
                    />
                    <ValidationError
                      prefix='Name'
                      field='userName'
                      errors={state.errors}
                    />
                  </div>
                  <div className='input-field col s6'>
                    <input
                      className='input'
                      placeholder='Телефон: +71234567899'
                      id='phone'
                      type='text'
                      name='телефон'
                      required
                    />
                    <ValidationError
                      prefix='Phone'
                      field='phone'
                      errors={state.errors}
                    />
                  </div>
                  {order.map((item, i) => {
                    console.log(item);
                    return (
                      <input
                        id={`good-${i}`}
                        type='hidden'
                        name={`${i + 1}`}
                        value={goodsForm(item)}
                      />
                    );
                  })}
                  <input
                    id='total'
                    type='hidden'
                    name='Сумма заказа:'
                    value={totalPrice}
                  />
                </div>
                <button className='btn btn-opacity grey' onClick={handleBack}>
                  назад
                </button>
                <button
                  type='submit'
                  disabled={state.submitting}
                  className='btn btn-opacity green accent-4 btn-submit'
                >
                  завершить покупку
                </button>
              </form>
              {/* <form
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
              </form> */}
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
