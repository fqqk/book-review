import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";

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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              書籍レビューアプリ
            </Typography>
            {isLogin ? (
              <Stack direction="row" spacing={2}>
                <Button color="inherit" onClick={localClear}>
                  ログアウト
                </Button>
                <Button color="inherit" onClick={onClickProfile}>
                  ユーザー情報編集
                </Button>
                <p style={{ marginTop: "5px" }}>{users}</p>
                {/* <Typography style={{ height: "100" }}>{users}</Typography> */}
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button color="inherit" onClick={onClickSignUp}>
                  サインアップ
                </Button>
                <Button color="inherit" onClick={onClickLogin}>
                  ログイン
                </Button>
                <Button color="inherit" onClick={onClickReload}>
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
