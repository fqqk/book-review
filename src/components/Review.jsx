import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Header } from "./Header";
import { useNavigate } from "react-router";

//material uiのstyle
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const titleStyle = {
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "1.3em",
};

const reviewStyle = {
  marginBottom: "70px",
};

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
    <Paper
      elevation={3}
      key={book}
      onClick={() => navigate(`detail/${book.id}`, { state: { id: book.id } })}
      style={{ margin: "50px", cursor: "pointer" }}
    >
      <a style={titleStyle} href={book.url} target="_blank">
        {book.title}
      </a>
      <Stack style={{ marginTop: "15px" }} direction="row" spacing={2}>
        <Avatar>{book.reviewer}</Avatar>
        <Grid item xs={12} style={reviewStyle}>
          <Item>{book.review}</Item>
        </Grid>
      </Stack>
    </Paper>
  ));

  return (
    <div>
      <Header isLogin={isLogin} users={users} localClear={localClear} />
      <Container maxWidth="md" sx={{ bgcolor: "#cfe8fc", marginTop: "20px" }}>
        {isLogin && BookReview}
      </Container>
      <button onClick={onClickAddReview}>書籍投稿する</button>
    </div>
  );
};
