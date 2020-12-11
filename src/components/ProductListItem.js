import { useEffect, useState } from "react";
import { List, Avatar, InputNumber } from "antd";
import { ButtonS } from "./styledComponents/antdStyled";
import { TextS } from "./styledComponents/Typography";

const ProductListItem = ({
  product,
  objProductsObjValues,
  isSupplier = false,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [isInTheList, setIsInTheList] = useState(false);
  const { productsObjValues, setProductsObjValues } = objProductsObjValues;

  useEffect(() => {
    if (productsObjValues[product._id]) {
      setIsInTheList(true);
    }
  });

  const onChange = (value) => {
    setQuantity(value);
    setIsInTheList(true);
    console.log(productsObjValues[product._id]);

    setProductsObjValues({
      ...productsObjValues,
      [product._id]: {
        image: product.image,
        _id: product._id,
        quantity: value,
        salePrice: product.salePrice,
        name: product.name,
      },
    });
  };

  return isSupplier ? (
    <List.Item
      actions={[
        isInTheList ? (
          <TextS>Added!</TextS>
        ) : (
          <ButtonS type="primary" onClick={onChange}>
            Add Product
          </ButtonS>
        ),
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
