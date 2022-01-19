import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import styled from "styled-components";

export const Header = (props) => {
  const { isLogin, users, localClear } = props;

  const navigate = useNavigate();

  //未ログインの状態だと、ログインボタンがヘッダーに現れる。⇨Reviewボタンを押してログイン画面へ遷移させるためにページをリロードする必要があったのでとりあえずこれで対応してます。
  const onClickReload = () => {
    document.location.reload();
  };

  const onClickProfile = () =>
    navigate("/profile", { state: { users: users } });

  const onClickSignUp = () => navigate("/signup");

  const onClickLogin = () => navigate("/login");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#ffd803" }} sx={{}}>
          <Toolbar>
            <Typography
              style={{ color: "#272343", fontWeight: "bold" }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              書籍レビューアプリ
            </Typography>
            {isLogin ? (
              <Stack direction="row" spacing={2}>
                <Button
                  style={{ color: "#272343", fontWeight: "bold" }}
                  onClick={localClear}
                >
                  ログアウト
                </Button>
                <Button
                  style={{ color: "#272343", fontWeight: "bold" }}
                  onClick={onClickProfile}
                >
                  ユーザー編集
                </Button>
                <p
                  style={{
                    marginTop: "5px",
                    color: "#272343",
                    fontWeight: "bold",
                  }}
                >
                  {users}
                </p>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  style={{ color: "#272343", fontWeight: "bold" }}
                  onClick={onClickSignUp}
                >
                  サインアップ
                </Button>
                <Button
                  style={{ color: "#272343", fontWeight: "bold" }}
                  onClick={onClickLogin}
                >
                  ログイン
                </Button>
                <Button
                  style={{ color: "#272343", fontWeight: "bold" }}
                  onClick={onClickReload}
                >
                  Review
                </Button>
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
