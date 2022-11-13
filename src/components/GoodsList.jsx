import { Goods } from './Goods/Goods';
import { GoodsItem } from './GoodsItem';

function GoodsList(props) {

  if (!Goods.length) {
    return <h3>Товаров пока нет</h3>;
  }

  return (
    <div className='goods'>
      {Goods.map((item) => (
        <GoodsItem key={item.id} {...item} addToBasket={props.addToBasket} />
      ))}
    </div>
  );
}

export { GoodsList };
