import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Skeleton, Input, List } from "antd";
import { Link } from "react-router-dom";
import { getAllProductsFn, searchProductsFn } from "../../services/products";
import ProductCard from "../../components/ProductCard";

const { Search } = Input;

export default function Products() {
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
          hasQuantity: false,
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
    <Row>
      <Col span={24}>
        <Row key="1">
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Link to="/products/create">
              <Button
                style={{
                  float: "left",
                  color: "#4D5768",
                  border: "1px dashed #4D5768",
                }}
              >
                New Product
              </Button>
            </Link>
            <Search
              onChange={onChange}
              placeholder="Search"
              onSearch={onSearch}
              style={{ marginLeft: "2rem" }}
            />
          </div>

          <br />
          <br />
        </Row>
        <Row
          gutter={[16, 16]}
          style={{
            padding: "1rem",
            paddingBottom: "0",
            marginTop: "1rem",
            height: "auto",
            overflowY: "scroll",
          }}
        >
          {isSearching || products ? (
            <List
              style={{
                margin: "0.5rem",
              }}
              pagination={{
                pageSize: 8,
              }}
              dataSource={products}
              renderItem={(item) => {
                return <ProductCard product={item} />;
              }}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 8,
              }}
            />
          ) : !products ? (
            "Add smth"
          ) : (
            new Array(8).fill(null).map((e, i) => (
              <Col key={(i + 5) ** 5}>
                <Card style={{ width: 300, marginTop: 16 }}>
                  <Skeleton loading={!products} avatar active></Skeleton>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
}
