import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

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

  const BASE_URL = "http://api-for-missions-and-railways.herokuapp.com/books";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDE3MTIyNjQsImlhdCI6IjIwMjItMDEtMDhUMDc6MTE6MDQuODA5NDQ1OTVaIiwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiNDAwNjI1ZDctMzVkMy00OTg2LWI2MmEtNDY0ODg2ZDE0ZTAwIn0.3vb6r4InYHxXqGGvig6_H-xlEuJi8Ov9XPonIZjlaK4";

  const getBook = async () => {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setBooks(data);
    console.log(books);
  };

  useEffect(() => {
    getBook();
  }, [setBooks]);

  //mapの記述方法。books.map((book) => { return ~ }); / books.map((book) => ());コールバック関数の中身が処理なのか、値なのかという違い
  const BookReview = books.map((book) => (
    <div key={book}>
      <a style={titleStyle} href={book.url}>
        {book.title}
      </a>
      <Stack style={{ marginTop: "15px" }} direction="row" spacing={2}>
        <Avatar>{book.reviewer}</Avatar>
        <Grid item xs={12} style={reviewStyle}>
          <Item>{book.review}</Item>
        </Grid>
      </Stack>
    </div>
  ));

  return (
    <div>
      <Container maxWidth="md" sx={{ bgcolor: "#cfe8fc" }}>
        <h1 className="text-red-400">書籍レビュー画面だよ〜</h1>
        {BookReview}
      </Container>
    </div>
  );
};
