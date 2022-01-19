import { useState } from "react";
import "../style/Login.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

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
        redirect();
        reset();
        alert("ログイン成功");
        break;
    }
  };

  const [isLogin, setIsLogin] = useState(false);

  const redirect = () => {
    setIsLogin(true);
    console.log(isLogin);
  };

  const BASE_URL = "https://api-for-missions-and-railways.herokuapp.com/signin";

  const {
    register, //inputなどに入力されたデータを参照
    handleSubmit, //ラップした関数にデータをオブジェクトの形で渡す
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
    return handleError(res);
  };

  return (
    <div className="login">
      <SContainer>
        <form className="form" onSubmit={handleSubmit(onLogin)}>
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
              ログイン
            </Button>
          </Stack>
        </form>

        <Link to="/signup">ユーザー登録がまだの方はこちら</Link>
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
