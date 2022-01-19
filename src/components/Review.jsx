import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Header } from "./Header";
import { useNavigate } from "react-router";
import { SecondaryButton } from "./atoms/button/SecondaryButton";
import styled from "styled-components";

export const Review = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const BOOKS_URL = "https://api-for-missions-and-railways.herokuapp.com/books";
  const USERS_URL = "https://api-for-missions-and-railways.herokuapp.com/users";
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const getBook = async () => {
    const res = await fetch(BOOKS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setBooks(data);
  };

  const getUser = async () => {
    const res = await fetch(USERS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUsers(data.name);
    setIsLogin(true);
  };

  const localClear = () => {
    localStorage.clear();
    setIsLogin(false);
    alert("ログアウトされました。ログイン画面へ移動します");
    navigate("/login");
  };

  const onClickAddReview = () => navigate("/new");

  useEffect(() => {
    getBook();
    getUser();
    console.log(isLogin);
  }, [isLogin]);

  //mapの記述方法。books.map((book) => { return ~ }); / books.map((book) => ());コールバック関数の中身が処理なのか、値なのかという違い
  const BookReview = books.map((book) => (
    <div>
      <Paper
        elevation={3}
        key={book}
        style={{ margin: "30px", padding: "10px" }}
      >
        <p style={titleStyle}>{book.title}</p>
        <SFlex>
          <Avatar>{book.reviewer}</Avatar>
          <SReview
            onClick={() =>
              navigate(`/detail/${book.id}`, { state: { id: book.id } })
            }
          >
            {book.review}
          </SReview>
          {book.isMine ? (
            <SecondaryButton
              onClick={() =>
                navigate(`/edit/${book.id}`, {
                  state: {
                    id: book.id,
                    title: book.title,
                    url: book.url,
                    detail: book.detail,
                    review: book.review,
                  },
                })
              }
            >
              書籍更新
            </SecondaryButton>
          ) : (
            false
          )}
        </SFlex>
      </Paper>
    </div>
  ));

  return (
    <div>
      <Header isLogin={isLogin} users={users} localClear={localClear} />

      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#bae8e8",
          marginTop: "60px",
          padding: "30px",
        }}
      >
        {isLogin && BookReview}
        <FixedButton onClick={onClickAddReview}>投稿</FixedButton>
      </Container>
    </div>
  );
};

const SFlex = styled.div`
  display: flex;
  align-items: center;
`;

const FixedButton = styled(SecondaryButton)`
  position: fixed;
  bottom: 20px;
`;

const SReview = styled.div`
  font-size: 0.8em;
  margin-left: 5px;
  width: 80%;
  cursor: pointer;
`;

const titleStyle = {
  fontWeight: "bold",
  color: "#2d334a",
};
