import { FC, useState } from "react";
import Header from "../../components/Header";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Login: FC = () => {
  const router = useRouter();
  const authUser = useSelector((state: RootState) => state.auth.user);
  let returnUrl = router.query.returnUrl;
  returnUrl = (returnUrl instanceof Array && returnUrl[0]) || returnUrl || "/";

  if (authUser) {
    router.push({ pathname: returnUrl as string });
  }
  return <Header></Header>;
};

export default Login;
