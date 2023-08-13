import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    console.log("test");
    location.href = "login/LoginPage";
  }, []);

  return <></>;
}
