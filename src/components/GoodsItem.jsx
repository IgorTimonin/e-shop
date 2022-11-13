function GoodsItem(props) {
  const { id, name, description, price, image, addToBasket } = props;

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>{description}</p>
      </div>
      <div className="card-action">
        <button
          className="btn green accent-4"
          onClick={() =>
            addToBasket({
              id,
              name,
              price,
            })
          }
        >
          Купить
        </button>
        <span className="right" style={{ fontSize: '1.5rem' }}>
          {price} ₽
        </span>
      </div>
    </div>
  );
}

export { GoodsItem };
