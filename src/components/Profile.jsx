import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";

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
      <button onClick={onClickReview}>Review</button>
      <form className="form" onSubmit={handleSubmit(updateUser)}>
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
            id="name"
            label="name"
            variant="standard"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && "名前が入力されていません"}
        </Box>
        <Stack spacing={2} direction="row">
          <Button type="submit" variant="contained">
            編集
          </Button>
        </Stack>
      </form>
    </>
  );
};
