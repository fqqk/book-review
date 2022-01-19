import { handleErrorLogin } from "./errorHandle";

export const onLogin = async (data) => {
  console.log("hello");
  const BASE_URL = "https://api-for-missions-and-railways.herokuapp.com/signin";
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
  // return handleErrorLogin(res);
};
