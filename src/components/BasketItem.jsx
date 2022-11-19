function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    removeFromBasket = Function.protype,
    incQuantity = Function.protype,
    decQuantity = Function.protype,
  } = props;

  return (
    <li className='collection-item'>
      {name}{' '}
      <i
        className='material-icons icons-circle basket-quantity basket-quantity_dec btn-opacity '
        onClick={() => decQuantity(id)}
      >
        remove
      </i>{' '}
      x{quantity}{' '}
      <i
        className='material-icons icons-circle basket-quantity basket-quantity_inc btn-opacity'
        onClick={() => incQuantity(id)}
      >
        add
      </i>{' '}
      = {price * quantity}₽
      <span className='secondary-content' onClick={() => removeFromBasket(id)}>
        <i className='material-icons black-text basket-delete btn-opacity'>
          clear
        </i>
      </span>
    </li>
  );
}

export { BasketItem };
