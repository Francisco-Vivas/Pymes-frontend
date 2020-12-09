import React, { useState, useEffect } from "react";
import { updateOrder, getOrderDetail } from "../../services/orders";
import { useHistory } from "react-router-dom";
import { Form, Select, Typography, Divider, Row, Col } from "antd";
import {
  InputSWhite,
  ButtonS,
} from "../../components/styledComponents/antdStyled";
import { TitleS } from "../../components/styledComponents/Typography";

const { Text } = Typography;

export default function UpdateOrder({
  match: {
    params: { ordersID },
  },
}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [isModalClient, setIsModalClient] = useState(false);

  useEffect(() => {
    async function getData() {
      const { data } = await getOrderDetail(ordersID);
      setOrder(data);
    }
    getData();
  }, []);

  const AddClientButton = (menu) => (
    <div>
      {menu}
      <Divider style={{ margin: "4px 0" }} />
      <ModalClient />
      <ButtonS
        type="secondary"
        onClick={() => setIsModalClient(!isModalClient)}
      >
        New Client
      </ButtonS>
    </div>
  );

  async function handleSubmit(values) {
    const { data: newOrder } = await updateOrder(order._id, values);
    setOrder(newOrder);
    history.push(`/orders/${ordersID}`);
  }

  return (
    order && (
      <Row align="center">
        <Col xs={24} sm={18} md={12} lg={8}>
          <TitleS level={1}>Edit your order</TitleS>
          <Text type="secondary">Update your order details</Text>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={order}
          >
            <Form.Item name="date" label="Date:">
              <InputSWhite />
            </Form.Item>

            <Form.Item name="clientID" label="Client:">
              <Select dropdownRender={(menu) => AddClientButton(menu)}>
                {clients?.map((e) => (
                  <Select.Option value={e._id}>{e.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="payment" label="Payment:">
              <Select>
                <Select.Option value="UNPAID">UNPAID</Select.Option>
                <Select.Option value="PAID">PAID</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="fulfillment" label="Fulfillment:">
              <Select>
                <Select.Option value="PENDING">PENDING</Select.Option>
                <Select.Option value="FULFILLED">FULFILLED</Select.Option>
                <Select.Option value="CANCELLED">CANCELLED</Select.Option>
              </Select>
            </Form.Item>
            {/* PRODUCTSSSSSSSSSS*/}
            <Form.Item name="extra" label="Comments:">
              <InputSWhite />
            </Form.Item>
            <ButtonS type="primary" size="middle" htmlType="submit">
              Edit Order
            </ButtonS>
          </Form>
        </Col>
      </Row>
    )
  );
}
