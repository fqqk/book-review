import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { SecondaryButton } from "./atoms/button/SecondaryButton";
import { useNavigate } from "react-router";

export const Edit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title, url, detail, review } = state;
  const BOOKS_URL = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;
  const token = localStorage.getItem("token");
  const [isDelete, setIsDelete] = useState(false);

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
        alert("書籍更新完了。レビューページへ移動します");
        reset();
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
    handleSubmit, //バリデーションの成否を確認→trueの場合、削除ボタンを押しても実行されてしまう
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
    console.log("handleError");
  };

  const onClickDelete = async () => {
    if (window.confirm("本当に削除しますか？")) {
      const res = await fetch(BOOKS_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        alert("削除成功。レビューページへ移動します");
        reset();
        console.log("handleDeleteError");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleErrorDelete(res);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      setIsDelete(false);
      console.log(isDelete);
    }
  };

  const onClickReview = () => navigate("/");

  const switchFunc = (data) => {
    console.log(isDelete);
    if (isDelete) {
      onClickDelete();
    } else {
      updateBook(data);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(switchFunc)}>
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
          <SecondaryButton onClick={onClickReview}>戻る</SecondaryButton>
          <SecondaryButton onClick={() => setIsDelete(true)}>
            削除
          </SecondaryButton>
          <SecondaryButton type="submit">更新</SecondaryButton>
        </Stack>
      </form>
    </div>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;
