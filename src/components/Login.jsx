import React from "react";
import { useState } from "react";
import "../style/Login.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const Login = () => {
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
        // const token = localStorage.getItem("token");
        alert("ログイン成功。レビューページへリダイレクトします");
        redirect();
        break;
    }
  };

  const [isLogin, setIsLogin] = useState(false);
  const redirect = () => {
    setIsLogin(true);
  };

  const BASE_URL = "https://api-for-missions-and-railways.herokuapp.com/signin";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, //フォームを空にする
  } = useForm();

  const onLogin = async (data) => {
    const json = {
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
    console.log(JSON.stringify(json));
    reset();
    return handleError(res);
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit(onLogin)}>
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
            fullWidth={true}
            id="password"
            label="password"
            variant="standard"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && "パスワードは6文字以上です"}
        </Box>
        <Stack spacing={2} direction="row">
          <Button type="submit" variant="contained">
            ログイン
          </Button>
        </Stack>
      </form>

      <p>これはログインコンポーネントです</p>
      <Link to="/signup">ユーザー登録がまだの方はこちら</Link>
      {isLogin && <Navigate to="/" />}
    </div>
  );
};
