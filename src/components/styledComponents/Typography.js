import { Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const TitleStyled = styled(Title)`
  color: #4d5768 !important;
`;

export const TitleS = (props) => <TitleStyled {...props} />;
export const TextS = (props) => {
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

  const TextStyled = styled(Text)`
    color: ${color || "#4d5768"};
  `;

  return <TextStyled {...props} />;
};
