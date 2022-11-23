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

  //удаляем товар из корзины если его становиться < 1 шт
  const qtyHandler = (id) => {
    quantity > 1 ? decQuantity(id) : removeFromBasket(id);
  }

  return (
    <li className='collection-item'>
      {name}{' '}
      <i
        className='material-icons icons-circle basket-quantity basket-quantity_dec btn-opacity '
        onClick={() => qtyHandler(id)}
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
