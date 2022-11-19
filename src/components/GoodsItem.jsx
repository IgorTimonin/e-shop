import { useState } from "react";

function GoodsItem(props) {
  const { id, name, description, price, image, addToBasket } = props;
  const [inCart, setInCart] = useState(false);

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
          className='btn green accent-4 btn-opacity'
          onClick={() =>
            addToBasket({
              id,
              name,
              price,
            })
          }
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
