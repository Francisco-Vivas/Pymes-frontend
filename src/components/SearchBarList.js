import { useEffect, useState } from "react";
import { Card, Col, Row, List } from "antd";
import Search from "antd/lib/input/Search";
import { getAllProductsFn, searchProductsFn } from "../services/products";
import ProductListItem from "./ProductListItem";

const SearchBarList = ({ HandlerAddQuantity }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const { data } = await getAllProductsFn();
      setProducts(data);
    }
    getProducts();
  }, []);

  useEffect(() => {
    async function searchProducts() {
      let dataOut;
      if (searchString && searchString !== "SEARCHALLTHEPRODUCTS") {
        const { data } = await searchProductsFn({
          searchString,
          hasQuantity: true,
        });
        dataOut = data;
      } else {
        const { data } = await getAllProductsFn();
        dataOut = data;
      }
      setProducts(dataOut);
    }
    if (searchString) searchProducts();
  }, [searchString]);

  const onSearch = (value) => {
    if (value) {
      setSearchString(value);
      setIsSearching(true);
    } else {
      setSearchString("");
      setIsSearching(false);
    }
  };
  const onChange = ({ target: { value } }) => {
    setSearchString(value || "SEARCHALLTHEPRODUCTS");
    if (value) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <Row align="center">
      <Col span={24}>
        <Search onChange={onChange} placeholder="Search" onSearch={onSearch} />
      </Col>
      <Col span={24} style={{ marginTop: "1rem", overflowY: "scroll" }}>
        {products && (
          <List
            itemLayout="horizontal"
            dataSource={products}
            style={{ height: "50%" }}
            renderItem={(item) => (
              <ProductListItem
                HandlerAddQuantity={HandlerAddQuantity}
                product={item}
              />
            )}
          />
        )}
      </Col>
    </Row>
  );
};

export default SearchBarList;
