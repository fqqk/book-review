import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useNavigate } from "react-router";

export const AddReview = () => {
  const BOOKS_URL = "https://api-for-missions-and-railways.herokuapp.com/books";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        alert("書籍投稿完了。");
        break;
    }
  };

  const addBook = async (data) => {
    const json = {
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    };
    const res = await fetch(BOOKS_URL, {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    handleError(res);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, //フォームを空にする
  } = useForm({
    mode: "onSubmit", // バリデーションが実行されるタイミング
    defaultValues: {
      // 初回レンダリング時のフォームのデフォルト値
      title: "",
      url: "",
      detail: "",
      review: "",
    },
  });

  const onClickReview = () => navigate("/");

  return (
    <>
      <button onClick={onClickReview}>Review</button>
      <form className="form" onSubmit={handleSubmit(addBook)}>
        <Box
          component="form"
          sx={{
            m: 10,
            mx: "auto",
            width: "25ch",
          }}
        >
          <TextField
            fullWidth={true}
            id="title"
            label="タイトル"
            variant="standard"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title && "タイトルが入力されていません"}
          <TextField
            fullWidth={true}
            id="url"
            label="url"
            variant="standard"
            type="email"
            {...register("url", {
              required: true,
              //   pattern: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
            })}
          />
          {errors.url && "urlを追加してください"}
          <TextareaAutosize
            minRows={3}
            placeholder="詳細について"
            style={{ width: 300 }}
            {...register("detail", { required: true })}
          />
          {errors.detail && "詳細が入力されていません"}
          <TextareaAutosize
            minRows={3}
            placeholder="レビュー"
            style={{ width: 300 }}
            {...register("review", { required: true })}
          />
          {errors.review && "レビューが入力されていません"}
        </Box>
        <Stack spacing={2} direction="row">
          <Button type="submit" variant="contained">
            投稿
          </Button>
        </Stack>
      </form>
    </>
  );
};
