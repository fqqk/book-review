import styled from "styled-components";
import { BaseButton } from "./BaseButton";
export const SecondaryButton = (props) => {
  const { children, onClick } = props;
  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled(BaseButton)`
  background-color: #ffd803;
  color: #272343;
  font-weight: bold;
`;
