import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

//material uiのstyle
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export const Review = () => {
  const [books, setBooks] = useState([]);

  const BASE_URL = "http://api-for-missions-and-railways.herokuapp.com/books";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDE2OTQ2NjMsImlhdCI6IjIwMjItMDEtMDhUMDI6MTc6NDMuMDc4NDU2ODEzWiIsInN1YiI6IjU0NTQ2NTU3MzU0IiwidXNlcl9pZCI6IjMyOTM2YzVkLTFhMjktNDZlOS05ZTJjLTcwNTQ5NTk4MzM2ZiJ9.ncuzStIiccUN_BVxYanbaeL6wsO1Ccw1B_jmoKgQONI";

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
      <p key={book}>
        <a href={book.url}>{book.title}</a>
      </p>
      <p key={book}>
        <Avatar>{book.reviewer}</Avatar>
        <Grid item xl={8}>
          <Item>{book.review}</Item>
        </Grid>
      </p>
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
