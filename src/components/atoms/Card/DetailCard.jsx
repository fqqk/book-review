import styled from "styled-components";

export const DetailCard = (props) => {
  const { children } = props;
  return (
    <div>
      <h1>{}</h1>
    </div>
  );
};

const SCard = styled.div`
  background-color: #fff;
  box-shadow: #ddd 0px 0px 4px 2px;
  border-radius: 8px;
  padding: 16px;
`;
