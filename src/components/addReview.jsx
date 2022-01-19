import React from "react";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { SecondaryButton } from "./atoms/button/SecondaryButton";

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
        reset();
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
      <form className="form" onSubmit={handleSubmit(addBook)}>
        <SContainer>
          <TextField
            sx={{ width: 200 }}
            id="title"
            label="タイトル"
            variant="standard"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title && "タイトルが入力されていません"}
          <TextField
            sx={{ width: 400 }}
            id="url"
            label="url"
            variant="standard"
            type="url"
            {...register("url", {
              required: true,
              pattern: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
            })}
          />
          {errors.url && "urlを追加してください"}
          <TextField
            label="詳細"
            multiline
            rows={4}
            defaultValue=""
            {...register("detail", { required: true })}
            sx={{ width: 500, m: "20px 0" }}
          />
          {errors.detail && "詳細が入力されていません"}
          <TextField
            label="レビュー"
            multiline
            rows={4}
            defaultValue=""
            {...register("review", { required: true })}
            sx={{ width: 500, m: "20px 0" }}
          />
          {errors.review && "レビューが入力されていません"}
        </SContainer>

        <Stack spacing={2} direction="row">
          <SecondaryButton sx={{}} onClick={onClickReview}>
            Review
          </SecondaryButton>
          <SecondaryButton type="submit">投稿</SecondaryButton>
        </Stack>
      </form>
    </>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;
