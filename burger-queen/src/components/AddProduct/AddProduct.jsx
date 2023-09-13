import { useState } from "react";
import { string, func } from "prop-types";
import { addProduct } from "../../Services/Request";
import Modal from "../Modal/Modal.jsx";

export default function AddProduct({ onClose, token, onAdd }) {
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addType, setAddType] = useState("");
  const [addPrice, setAddPrice] = useState("");

  const data = {
    id: addId,
    name: addName,
    price: addPrice,
    type: addType,
  };

  function addNewProduct() {
    addProduct(data, token)
      .then((response) => {
        if (response.ok) {
          console.log("Producto agregado con éxito");
        }
        return response.json();
      })
      .then((product) => {
        console.log(product);
        onAdd(product);
        onClose();
        return product;
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
      });
  }

  return (
    <Modal
      onClose={onClose}
      title="New Product"
      action={addNewProduct}
      nameAction="Add"
    >
      <div>
        <label>ID</label>
        <input
          type="text"
          value={addId}
          onChange={(e) => setAddId(e.target.value)}
        />
      </div>
      <div>
        <label>Product</label>
        <input
          type="text"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
      </div>
      <div>
        <label>Menu</label>
        <select value={addType} onChange={(e) => setAddType(e.target.value)}>
          <option>--</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch/Dinner">Lunch/Dinner</option>
        </select>
      </div>
      <div>
        <label>Price</label>
        <input
          type="text"
          value={addPrice}
          onChange={(e) => setAddPrice(e.target.value)}
        />
      </div>
    </Modal>
  );
}

AddProduct.propTypes = {
  onClose: func.isRequired,
  token: string.isRequired,
  onAdd: func.isRequired,
};
