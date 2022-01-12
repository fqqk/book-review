import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const Header = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              書籍レビューアプリ
            </Typography>
            {props.isLogin ? (
              <Typography>{props.users}</Typography>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button color="inherit">
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    サインアップ
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    ログイン
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Review
                  </Link>
                </Button>
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
