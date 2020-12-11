import { Modal } from "antd";
import { useState } from "react";
import SearchBarList from "./SearchBarList";

export default function AddProduct({
  isModal = false,
  setIsModal,
  HandlerAddQuantity,
  isSupplier = false,
}) {
  const [productsObjValues, setProductsObjValues] = useState({});
  const onOk = () => {
    setIsModal(false);
    HandlerAddQuantity(productsObjValues);
  };

  const onCancel = () => {
    setIsModal(false);
  };

  const objProductsObjValues = { productsObjValues, setProductsObjValues };

  return (
    <Modal
      visible={isModal}
      title="Select the products"
      okText="Done"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
    >
      <SearchBarList
        objProductsObjValues={objProductsObjValues}
        isSupplier={isSupplier}
      />
    </Modal>
  );
}
