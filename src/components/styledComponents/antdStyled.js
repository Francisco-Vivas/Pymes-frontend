import { Input, Button, Layout, Menu } from "antd";
import styled from "styled-components";

const InputStyled = styled(Input)`
  background-color: #f0f2f5;
  color: #4d5768;
`;

const InputPassStyled = styled(Input.Password)`
  background-color: #f0f2f5 !important;
  color: #4d5768 !important;
`;

export const InputS = (props) => <InputStyled {...props} />;
export const InputPassS = (props) => <InputPassStyled {...props} />;
export const ButtonS = (props) => {
  const color =
    props.type === "primary"
      ? "#4d5768"
      : props.type === "secondary"
      ? "#88C0D0"
      : props.danger
      ? "#BF616A"
      : props.warning
      ? "#EBCB8B"
      : "";

  const ButtonStyled = styled(Button)`
    background-color: ${color};
    border-color: ${color};
    color: white;
    :hover {
      background-color: ${color + "BB"};
      border-color: ${color + "BB"};
    }
  `;
  console.log(props.type);
  return <ButtonStyled {...props} />;
};

/* ################################ LAYOUT ################################*/
const { Header, Content, Sider } = Layout;

const MenuStyled = styled(Menu)`
  background-color: "#81A1C1" !important;
  color: #f0f2f5;
`;
export const MenuS = (props) => <MenuStyled {...props} />;

const MenuItemStyled = styled(Menu.Item)`
  background-color: "#81A1C1" !important;
  color: #f0f2f5;
`;
export const MenuItemS = (props) => <MenuItemStyled {...props} />;
