import { Button, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { queryClient } from "..";
import { postLoginAPI } from "../api";

export interface SignInType {
  userId: string;
  password: string;
}

const Login = () => {
  const [signInfo, setSignInfo] = useState<SignInType>({
    userId: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState();

  const history = useHistory();

  const loginMutation = useMutation(postLoginAPI, {
    onSuccess: (data) => {
      setIsLogin(data.data.isLogin);
      localStorage.setItem("isLogin", data.data.token);

      queryClient.invalidateQueries("todo");

      history.push("/");
      window.location.reload();
    },
  });

  const onChangeId = (e: ChangeEvent<HTMLInputElement>): void => {
    setSignInfo({
      ...signInfo,
      userId: e.target.value,
    });
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setSignInfo({
      ...signInfo,
      password: e.target.value,
    });
  };

  const onSubmitLogin = (e: React.MouseEvent): void => {
    console.log("??");
    loginMutation.mutate({
      userId: signInfo.userId,
      password: signInfo.password,
    });
  };

  return (
    <>
      {/* {loginMutation.isLoading && <p>로딩 중...</p>} */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <TextField
            label="아이디"
            type="email"
            fullWidth
            margin="normal"
            placeholder="3글자 이상 아이디"
            onChange={onChangeId}
            variant="standard"
            helperText="email 형식의 아이디"
          />
          <TextField
            label="비밀번호"
            margin="normal"
            fullWidth
            variant="standard"
            type="password"
            placeholder="6자 이상 비밀번호"
            helperText="비밀번호"
            onChange={onChangePassword}
          />
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmitLogin}
            >
              로그인하기
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
