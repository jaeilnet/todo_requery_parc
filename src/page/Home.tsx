import { Grid } from "@mui/material";
import React from "react";
import Forms from "../components/Forms";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid item xs={4}>
        <Forms />
        <TodoList />
      </Grid>
    </Grid>
  );
};

export default Home;
