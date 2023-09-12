import style from "../TakeOrder/TakeOrder.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function TakeOrder({
  selectedItems,
  handleAddToSelectedItems,
  handleRemoveSelectedItems,
  handleAddOrder,
  handleEditOrder,
  orderInfo,
}) {
  const [tableNumber, setTableNumber] = useState("Table");

  useEffect(() => {
    if (orderInfo && orderInfo.table) {
      setTableNumber(orderInfo.table);
    }
  }, [orderInfo]);

  const tables = ["Table", "1", "2", "3", "4", "5", "TA"];
  const options = tables.map((item) => <option key={item}>{item}</option>);

  const calculateTotal = () => {
    const selectedItemsTotal = selectedItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.qty,
      0
    );

    const orderInfoTotal =
      orderInfo &&
      Array.isArray(orderInfo.products) &&
      orderInfo.products.reduce(
        (total, item) => total + parseFloat(item.price) * item.qty,
        0
      );

    return selectedItemsTotal + (orderInfoTotal || 0);
  };

  const handleButtonClick = () => {
    if (orderInfo) {
      const updatedOrderInfo = { ...orderInfo };

      updatedOrderInfo.products = [
        ...updatedOrderInfo.products,
        ...selectedItems,
      ];
      handleEditOrder(updatedOrderInfo);
    } else {
      handleAddOrder(tableNumber);
    }
  };

  return (
    <section className={style.order}>
      <div className={style.header}>
        <h4>Order</h4>
        <select
          className={style.select}
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        >
          {options}
        </select>
      </div>
      <div className={style.items}>
        {orderInfo && orderInfo.length === 0 ? (
          <div className={style.emptyBasket}>Loading</div>
        ) : (
          orderInfo &&
          Array.isArray(orderInfo.products) &&
          orderInfo.products.map((item, index) => (
            <div key={index} className={style.item}>
              <div>
                {item.name}
                <br />${item.price}
              </div>
              <div className={style.container}>
                <button
                  className={style.add_item}
                  onClick={() => handleAddToSelectedItems(item)}
                >
                  +
                </button>
                <span className={style.qty}>{item.qty}</span>
                <button
                  className={style.reduce_item}
                  onClick={() => handleRemoveSelectedItems(item)}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={style.items}>
        {selectedItems.length === 0 && !orderInfo ? (
          <div className={style.emptyBasket}>No items selected</div>
        ) : (
          selectedItems.map((item, index) => (
            <div key={index} className={style.item}>
              <div>
                {item.name}
                <br />${item.price}
              </div>
              <div className={style.container}>
                <button
                  className={style.add_item}
                  onClick={() => handleAddToSelectedItems(item)}
                >
                  +
                </button>
                <span className={style.qty}>{item.qty}</span>
                <button
                  className={style.reduce_item}
                  onClick={() => handleRemoveSelectedItems(item)}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={style.buttons}>
        <div className={style.price}>
          <span>Total</span>
          <span className={style.total}>${calculateTotal()}</span>
        </div>
        <button className={style.button_send} onClick={handleButtonClick}>
          {orderInfo ? "Update Order" : "Send"}
        </button>
        <button className={style.button}>Check Out</button>
      </div>
    </section>
  );
}

TakeOrder.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  handleAddToSelectedItems: PropTypes.func.isRequired,
  handleRemoveSelectedItems: PropTypes.func.isRequired,
  handleAddOrder: PropTypes.func.isRequired,
  handleEditOrder: PropTypes.func.isRequired,
  orderInfo: PropTypes.object.isRequired,
};
