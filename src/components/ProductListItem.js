import { useState } from "react";
import { List, Avatar, InputNumber } from "antd";
import { ButtonS } from "./styledComponents/antdStyled";

const ProductListItem = ({
  product,
  objProductsObjValues,
  isSupplier = false,
}) => {
  const [quantity, setQuantity] = useState(0);

  const { productsObjValues, setProductsObjValues } = objProductsObjValues;

  const onChange = (value) => {
    setQuantity(value);
    console.log(value, product._id, product);

    setProductsObjValues({
      ...productsObjValues,
      [product._id]: {
        image: product.image,
        _id: product._id,
        quantity: value,
        salePrice: product.salePrice,
      },
    });
  };

  return isSupplier ? (
    <List.Item
      actions={[
        <ButtonS type="primary" onClick={onChange}>
          Add Product
        </ButtonS>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={product.image} alt={product.name} size="large" />}
        title={product.name}
        description={`$${product.salePrice}`.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}
      />
    </List.Item>
  ) : (
    <List.Item
      actions={[
        <InputNumber
          min={0}
          max={product.quantity}
          value={quantity}
          onChange={onChange}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={product.image} alt={product.name} size="large" />}
        title={product.name}
        description={`$${product.salePrice}`.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}
      />
    </List.Item>
  );
};

export default ProductListItem;
