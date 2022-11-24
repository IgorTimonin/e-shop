import { useEffect, useState } from "react";

function GoodsItem(props) {
  const {
    id,
    name,
    description,
    price,
    image,
    order,
    addToBasket,
    handleBasketShow,
  } = props;

  const [inCart, setInCart] = useState(false);

  function buyHandler() {
    addToBasket({
      id,
      name,
      price,
    });
  }

  // проверка есть ли товар в корзине для изменения кнопки 'купить'
  useEffect(() => {
    order.find((el) => el.id === id) ? setInCart(true) : setInCart(false);
  }, [order]);

  return (
    <div className='card'>
      <div className='card-image'>
        <img src={image} alt={name} />
      </div>
      <div className='card-content'>
        <span className='card-title'>{name}</span>
        <p>{description}</p>
      </div>
      <div className='card-action'>
        <button
          className={`btn btn-buy green accent-4 btn-opacity ${
            inCart ? 'btn-active' : ''
          }`}
          disabled={inCart}
          onClick={!inCart ? buyHandler : handleBasketShow}
        >
          {inCart ? 'В корзине' : 'Купить'}
        </button>
        <span className='right' style={{ fontSize: '1.5rem' }}>
          {price} ₽
        </span>
      </div>
    </div>
  );
}

export { GoodsItem };
