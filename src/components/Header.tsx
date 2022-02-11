import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Fab, Grid } from "@mui/material";

interface HeaderProps {
  isLogin: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLogin }) => {
  const history = useHistory();

  // 로그아웃 함수
  const onLogOut = () => {
    if (!isLogin) {
      return;
    }
    localStorage.removeItem("isLogin");

    history.push("/login");
    // window.location.reload();
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <h1>Todo List</h1>
      <Grid item>
        {/* <h3 style={{ margin: "0 10px" }}>{userId ? userId : "비로그인"}님</h3> */}
        {isLogin ? (
          <Button color="secondary" onClick={onLogOut}>
            로그아웃
          </Button>
        ) : (
          <Button onClick={() => history.push("/login")}>로그인</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
