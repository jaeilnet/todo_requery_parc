import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Router } from "react-router-dom";
import { loginCheckAPI } from "./api";
import "./App.css";
import Layout from "./routes/Layout";
import { createBrowserHistory } from "history";
import { queryClient } from ".";
import { Alert } from "@mui/material";

interface AppProps {
  // history: History;
}

type Props = AppProps;

export const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  // const history = useHistory();

  const history = createBrowserHistory();
  // 로그인체크
  const loginChekcMutation = useMutation(loginCheckAPI, {
    onSuccess: (data) => {
      setUserId(data?.data.userId);
      setIsLogin(true);
      queryClient.invalidateQueries("todo");

      <Alert severity="info" variant="filled">
        로그인 성공
      </Alert>;
    },
    onError: (error) => {
      <Alert severity="error">로그인체크 오류</Alert>;
    },
  });

  useEffect(() => {
    const isTokens = localStorage.getItem("isLogin");

    if (!isTokens) {
      // history.replace("/login");
      return;
    }

    // setIsLogin(true);
    loginChekcMutation.mutate(isTokens);
  }, [isLogin]);

  return (
    <Router history={history}>
      <Layout isLogin={isLogin} />;
    </Router>
  );
};

export default App;
