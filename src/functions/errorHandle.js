// import { loginState } from "../store/loginState";
// import { useSetRecoilState } from "recoil";

// export const HandleErrorLogin = async (res) => {
//   const setIsLogin = useSetRecoilState(loginState);

//   const resJson = await res.json();

//   switch (resJson.ErrorCode) {
//     case 400:
//       alert(resJson.ErrorMessageJP);
//       break;

//     case 403:
//       alert(resJson.ErrorMessageJP);
//       break;

//     case 403:
//       alert(resJson.ErrorMessageJP);
//       break;
//     default:
//       localStorage.setItem("token", resJson.token);
//       setIsLogin(true);
//       alert("ログイン成功。レビューページへリダイレクトします");
//       //   reset();
//       break;
//   }
// };
