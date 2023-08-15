import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    ElseUtils.checkLoginUserAndGetUser();
  }, []);

  return <></>;
}
