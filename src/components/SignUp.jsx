import React from "react";
import { useState } from "react";
import "../style/SignUp.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const SignUp = () => {
  //APIからのレスポンスを受け取り、受け取ったステータスコードによって状況を伝える
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
        localStorage.setItem("token", resJson.token);
        alert("登録完了。レビューページへリダイレクトします");
        redirect();
        break;
    }
  };

  const [isLogin, setIsLogin] = useState(false);

  const redirect = () => {
    setIsLogin(true);
    console.log(isLogin);
  };

  //react hook formの
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, //フォームを空にする
  } = useForm({
    mode: "onSubmit", // バリデーションが実行されるタイミング
    defaultValues: {
      // 初回レンダリング時のフォームのデフォルト値
      name: "",
      email: "",
      password: "",
    },
  });

  //APIのURL
  const BASE_URL = "https://api-for-missions-and-railways.herokuapp.com/users";

  const SignUp = async (data) => {
    const json = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const res = await fetch(BASE_URL, {
      method: "POST",
      //headersで"content-type":"application/json"を指定
      headers: { "Content-Type": "application/json" },
      //bodyにjsonオブジェクトをJSON文字列化して指定
      body: JSON.stringify(json),
    });
    reset();
    return handleError(res);
  };

  return (
    <div className="sign_in">
      <SContainer>
        <form className="form" onSubmit={handleSubmit(SignUp)}>
          <TextField
            sx={{ width: 300, marginBottom: "10px" }}
            id="name"
            label="name"
            variant="standard"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && "名前が入力されていません"}
          <TextField
            sx={{ width: 300, marginBottom: "10px" }}
            id="email"
            label="email"
            variant="standard"
            type="email"
            {...register("email", {
              required: true,
              pattern:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
            })}
          />
          {errors.email && "example@gmail.comの形式で入力してください"}
          <TextField
            sx={{ width: 300, marginBottom: "40px" }}
            id="password"
            label="password"
            variant="standard"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && "パスワードは6文字以上です"}

          <Stack spacing={2} direction="row">
            <Button
              type="submit"
              variant="contained"
              sx={{ marginBottom: "30px" }}
            >
              ユーザー登録
            </Button>
          </Stack>
        </form>

        <Link to="/login">ログイン</Link>
        {isLogin && <Navigate to="/" />}
      </SContainer>
    </div>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;
