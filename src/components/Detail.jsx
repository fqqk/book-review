import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Detail = () => {
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

  return (
    <div>
      <h1>詳細画面</h1>
      <Box sx={{ display: "flex" }}>
        {isLoad ? (
          <div>
            <p>{detail.title}</p>
            <p>{detail.url}</p>
            <p>{detail.detail}</p>
            <p>{detail.review}</p>
            <p>{detail.reviewer}</p>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
};
