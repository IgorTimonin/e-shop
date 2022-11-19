import { useEffect } from 'react';

function Alert(props) {
  const { name = '', 
} = props;

  return (
    <div id="toast-container">
      <div className="toast">{name} добавлен в корзину</div>
    </div>
  );
}

export { Alert };
