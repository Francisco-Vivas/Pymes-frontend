import { Col, Row } from "antd";
import CreateOrderForm from "../../components/CreateOrderForm";
import { TitleS } from "../../components/styledComponents/Typography";

export default function CreateOrders() {
  return (
    <Row align="center">
      <Col xs={24} sm={18} md={12} lg={8}>
        <TitleS style={{ margin: "2rem" }}> New Order </TitleS>
        <CreateOrderForm />
      </Col>
    </Row>
  );
}
