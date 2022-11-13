function Cart(props) {
  const { quantity = 0, handleBasketShow = Function.prototype } = props;

  return (
    <div className='cart transparent accent-4' onClick={handleBasketShow}>
      <i className='medium material-icons shopping-cart'>shopping_cart</i>
      {quantity ? <span className='cart-quantity'>{quantity}</span> : null}
    </div>
  );
}

export { Cart };
