import axios from "axios";
import "../../app/globals.css";
import { useEffect, useState } from "react";

import getConfig from "next/config";
import { SecurityUtils } from "@/libs/security.utils";
import Logo from "@/components/logo/Logo";
import { ElseUtils } from "@/libs/else.utils";
const { publicRuntimeConfig } = getConfig();

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  useEffect(() => {
    // 로그인체크
    ElseUtils.checkLoginUser();
  }, []);

  return (
    <>
      <div className='bg-[#EBEBEB] w-full'>
        <div className='h-[151px] bg-[#f4f4f4] w-full'>
          <div className='pt-[20px]'>
            <Logo />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          <div className='w-[640px] h-[594px] bg-[#FFFFFF] flex justify-center flex-col items-center'>
            <div className='text-3xl font-bold leading-10 text-neutral-800 mt-[84px]'>
              로그인
            </div>
            <div className='flex flex-col justify-center mt-[60px]'>
              <input
                className='text-xl font-normal text-zinc-400 focus:outline-none ring-0 p-4 bg-white border rounded w-[524px] h-[56px] pr-14 border-zinc-400 mt-[16px]'
                placeholder='이메일입력'
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
              />
              <input
                className='text-xl font-normal text-zinc-400 focus:outline-none ring-0 p-4 bg-white border rounded w-[524px] h-[56px] pr-14 border-zinc-400 mt-[16px]'
                placeholder='비밀번호입력'
                type='password'
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />

              <button
                className='mt-[60px] mb-[166px] inline-flex items-center justify-center py-4 rounded w-[524px] h-[56px] bg-sky-500'
                onClick={(e) => {
                  if (loginInfo.email === "" || loginInfo.password === "") {
                    alert("이메일, 패스워드를 다 입력해주세요");
                    return;
                  }
                  axios
                    .post(
                      `${publicRuntimeConfig.APISERVER}/c.user/manager/login`,
                      loginInfo
                    )
                    .then((e) => {
                      localStorage.setItem(
                        "managerinfomation",
                        SecurityUtils.encryptText(JSON.stringify(e.data.data))
                      );
                      location.href = "/main/users/UserManagePage";
                    })
                    .catch((err) => {
                      alert(err.response.data.data.description.codeMessage);
                    });
                }}
              >
                <div className='text-base font-medium leading-normal text-white'>
                  로그인
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
