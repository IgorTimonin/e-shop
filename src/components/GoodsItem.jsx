import { useState } from "react";

function GoodsItem(props) {
  const {
    id,
    name,
    description,
    price,
    image,
    addToBasket,
    // inCart,
    // setInCart,
    // order,
  } = props;

  const [inCart, setInCart] = useState(false);

  function buyHandler() {
    addToBasket({
      id,
      name,
      price,
    });
    setInCart(!inCart);
  }

  // function clickHandler(el) {
  //   buyHandler();
  //   el.classList.toggle('active');
  //   console.log(el);
  // }

  // function orderScanner(e) {
  //   const id = e.current.target.id
  //   if (Object.values(order).includes(id)) {
  //     setInCart(true);
  //   };
  // }

  // useEffect(() => {

  // }, [order.length]);

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
          onClick={buyHandler}
          // {({ target }) => clickHandler(target)}
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
