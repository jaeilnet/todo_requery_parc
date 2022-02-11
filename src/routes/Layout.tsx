import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Login from "../page/Login";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import Home from "../page/Home";

interface LayoutProps {
  isLogin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isLogin }) => {
  console.log(isLogin);

  const locaiton = useLocation();

  useEffect(() => {}, [locaiton]);

  const PrivateRoute: React.FC<any> = ({
    component: CustomComponent,
    isLogin,
    path,
    ...rest
  }) => {
    const renderCustomerComponent = (props: any) => (
      <CustomComponent {...props} />
    );

    console.log(isLogin, "private");
    if (isLogin) {
      return <Route {...rest} render={renderCustomerComponent} />;
    }

    return <Route component={NotFound} />;
  };

  const PublicRoute: React.FC<any> = ({
    component: CustomComponent,
    isLogin,
    path,
    ...rest
  }) => {
    console.log(isLogin, "public");
    if (!isLogin) {
      const renderCustomerComponent = (props: any) => (
        <CustomComponent {...props} />
      );
      return <Route {...rest} render={renderCustomerComponent} />;
    }

    return <Redirect to="/login" />;
  };

  return (
    <>
      <Header isLogin={isLogin} />
      <Switch>
        <PrivateRoute exact isLogin={isLogin} path="/" component={Home} />
        <PublicRoute exact isLogin={isLogin} path="/login" component={Login} />
        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </>
  );
};

export default Layout;
