import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { useNavigate } from "react-router";

export const Detail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state.id;
  const BOOKS_URL = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;
  const token = localStorage.getItem("token");

  const [detail, setDetail] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const handleError = async (res) => {
    const resJson = await res.json();

    switch (resJson.ErrorCode) {
      case 400:
        alert(resJson.ErrorMessageJP);
        break;

      case 403:
        alert(resJson.ErrorMessageJP);
        break;

      case 403:
        alert(resJson.ErrorMessageJP);
        break;
      default:
        alert("詳細取得完了");
        break;
    }
  };

  const getBookDetail = async () => {
    const res = await fetch(BOOKS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setDetail(data);
    setIsLoad(true);
    return handleError(res);
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  const onClickReview = () => navigate("/");

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {isLoad ? (
          <SContainer>
            <STitle>
              <SA href={detail.url}>{detail.title}</SA>
            </STitle>
            <SIcon>
              <p>{detail.reviewer}</p>
            </SIcon>
            <SWrapper>
              <STextBox>
                <Sp>詳細</Sp>
                <p>{detail.detail}</p>
              </STextBox>
              <STextBox>
                <Sp>レビュー</Sp>
                <p>{detail.review}</p>
              </STextBox>
            </SWrapper>
            <SecondaryButton onClick={onClickReview}>戻る</SecondaryButton>
          </SContainer>
        ) : (
          <CircularProgress style={{ margin: "300px auto" }} />
        )}
      </Box>
    </div>
  );
};

const Sp = styled.p`
  font-size: 0.7em;
  border-bottom: 2px solid #272343;
  background-color: #fffffe;
  margin: 0;
  font-weight: bold;
`;

const SIcon = styled.div`
  border: "2px solid #272343";
  border-radius: "50%";
  width: "50px";
  height: "50px";
`;

const STitle = styled.h1`
  font-size: 1.2em;
  border-bottom: 2px solid #272343;
  margin: 0;
`;

const SA = styled.a`
  text-decoration: none;
  color: #2d334a;
  display: inline-block;
  width: 100%;
  padding: 15px 0;
  &:hover {
    background-color: #ffd803;
  }
`;

const SWrapper = styled.div`
  margin: 20px 0;
  width: 700px;
  margin: 0 auto;
`;

const STextBox = styled.div`
  border-radius: 4px;
  border: 2px solid #272343;
  margin-bottom: 40px;
  background-color: #e3f6f5;
`;

const SContainer = styled.div`
  width: 800px;
  height: 100vh;
  background-color: #bae8e8;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
`;
