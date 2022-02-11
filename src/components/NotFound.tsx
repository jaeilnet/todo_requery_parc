import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <div>
      <div>잘못된페이지</div>
      <Button onClick={() => history.goBack()}>뒤로가기</Button>
    </div>
  );
};

export default NotFound;
