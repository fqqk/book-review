import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const Edit = () => {
  const { state } = useLocation();
  const { id, title, url, detail, review } = state;
  const BOOKS_URL = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;
  const token = localStorage.getItem("token");

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
        alert("書籍更新完了。");
        break;
    }
  };

  const handleErrorDelete = async (res) => {
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
    }
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
      title: `${title}`,
      url: `${url}`,
      detail: `${detail}`,
      review: `${review}`,
    },
  });

  const updateBook = async (data) => {
    const json = {
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    };
    const res = await fetch(BOOKS_URL, {
      method: "PUT",
      body: JSON.stringify(json),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    handleError(res);
  };

  const onClickDelete = async () => {
    alert("本当に削除しますか？");
    const res = await fetch(BOOKS_URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      alert("削除成功");
    } else {
      handleErrorDelete(res);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(updateBook)}>
        <Box
          component="form"
          sx={{
            m: 5,
            mx: "auto",
            width: "25ch",
          }}
        >
          <TextField
            fullWidth={true}
            id="title"
            label="title"
            variant="standard"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title && "titleが入力されていません"}
          <TextField
            fullWidth={true}
            id="url"
            label="url"
            variant="standard"
            type="text"
            {...register("url", { required: true })}
          />
          {errors.url && "urlが入力されていません"}
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
            更新
          </Button>
          <Button variant="contained" onClick={onClickDelete}>
            削除
          </Button>
        </Stack>
      </form>
    </div>
  );
};
