import { Alert, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "..";
import { addTodoAPI, deleteApi, getApi, patchTextAPI } from "../api";

const useTodo = () => {
  // 리스트 불러오기

  const [todoList, setTodoList] = useState([]);

  const { data, isError, isLoading } = useQuery("todo", getApi);

  useEffect(() => {
    setTodoList(data?.data);
  }, []);

  // 글쓰기

  const addTodoMutation = useMutation(addTodoAPI, {
    onSuccess: (data) => {
      console.log(data.data);
      // queryClient.invalidateQueries("todo");
      setTodoList(data.data);
      <Alert severity="success">추가 성공류</Alert>;
    },
    onError: (err) => {
      <Alert severity="error">추가 에러</Alert>;
    },
  });

  // 수정
  const patchTodoMutation = useMutation(patchTextAPI, {
    onSuccess: (data) => {
      setTodoList(data.data);
      queryClient.invalidateQueries("todo");
      <Alert severity="success">수정 성공류</Alert>;
    },
    onError: (err) => {
      <Alert severity="error">수정 에러</Alert>;
    },
  });

  //삭제
  const deleteTodoMutation = useMutation(deleteApi, {
    onSuccess: (data) => {
      setTodoList(data.data);
      queryClient.invalidateQueries("todo");
      <Alert severity="success">삭제 성공류</Alert>;
    },
    onError: (err) => {
      <Alert severity="error">삭제 에러</Alert>;
    },
  });

  const isLoadingRender = isLoading && <CircularProgress />;
  const isErrorRander = isError && <p>에러 입니다</p>;

  return {
    todoList,
    isLoadingRender,
    isErrorRander,
    patchTodoMutation,
    deleteTodoMutation,
    addTodoMutation,
  };
};

export default useTodo;
