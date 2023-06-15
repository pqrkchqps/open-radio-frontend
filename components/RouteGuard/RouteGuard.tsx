import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default RouteGuard;

function RouteGuard({ children }) {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const urlSplit = url.split("?");
    const path = urlSplit[0];
    url = url.indexOf("[") === -1 ? url : "/";
    if (!authUser && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: url },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
