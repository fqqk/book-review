import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { SecondaryButton } from "./atoms/button/SecondaryButton";

export const Profile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const USERS_URL = "https://api-for-missions-and-railways.herokuapp.com/users";
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
        alert("編集完了");
        break;
    }
  };

  const updateUser = async (data) => {
    const json = { name: data.name };
    const res = await fetch(USERS_URL, {
      method: "PUT",
      body: JSON.stringify(json),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleError(res);
  };

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit", // バリデーションが実行されるタイミング
    defaultValues: {
      // 初回レンダリング時のフォームのデフォルト値
      name: state.users,
    },
  });

  //ログイン状態でレビューボタン押した場合
  const onClickReview = () => navigate("/");

  return (
    <>
      <form className="form" onSubmit={handleSubmit(updateUser)}>
        <SContainer>
          <TextField
            sx={{ width: 200 }}
            id="name"
            label="name"
            variant="standard"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && "名前が入力されていません"}
        </SContainer>

        <Stack spacing={2} direction="row">
          <SecondaryButton onClick={onClickReview}>Review</SecondaryButton>
          <SecondaryButton type="submit">編集</SecondaryButton>
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
