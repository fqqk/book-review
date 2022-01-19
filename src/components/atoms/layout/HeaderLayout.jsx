import styled from "styled-components";

export const HeaderBar = (props) => {
  const { children } = props;
  return <HeaderBar>{children}</HeaderBar>;
};

const HeaderBar = styled.header`
  background-color: #ffd803;
  color: #272343;
  font-weight: bold;
`;
