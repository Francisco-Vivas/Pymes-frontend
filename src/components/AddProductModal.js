import { Modal } from "antd";
import SearchBarList from "./SearchBarList";

export default function AddProduct({
  isModal = false,
  setIsModal,
  HandlerAddQuantity,
  isSupplier = false,
}) {
  return (
    <Modal
      visible={isModal}
      title="Select the products"
      okText="Done"
      cancelText="Cancel"
      onCancel={() => setIsModal(false)}
      onOk={() => setIsModal(false)}
    >
      <SearchBarList
        HandlerAddQuantity={HandlerAddQuantity}
        isSupplier={isSupplier}
      />
    </Modal>
  );
}
