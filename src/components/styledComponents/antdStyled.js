import { Input, Button, Layout, Menu } from "antd";
import styled from "styled-components";

const InputStyled = styled(Input)`
  background-color: #f0f2f5 !important;
  color: #4d5768 !important;
`;

const InputPassStyled = styled(Input.Password)`
  background-color: #f0f2f5 !important;
  color: #4d5768 !important;
`;

export const InputS = (props) => <InputStyled {...props} />;
export const InputPassS = (props) => <InputPassStyled {...props} />;

const InputStyledWhite = styled(Input)`
  background-color: #fff !important;
  color: #4d5768 !important;
`;
export const InputSWhite = (props) => <InputStyledWhite {...props} />;

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
  return <ButtonStyled {...props} />;
};
