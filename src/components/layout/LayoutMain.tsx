import Head from "next/head";
import { useEffect, useState } from "react";
import MenuBar from "../menuBar/MenuBar";
import "../../app/globals.css";
import "flowbite";
import { SecurityUtils } from "@/libs/security.utils";
import Image from "next/image";
import Logo from "../logo/Logo";
import { ElseUtils } from "@/libs/else.utils";

interface LayoutMainProps {
  children: any;
  menuTitle: string;
  setManager: Function;
}
const LayoutMain = ({
  menuTitle,
  children,
  setManager: serManager,
}: LayoutMainProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manager = ElseUtils.checkLoginUserAndGetUser(true);
    if (manager === undefined) return;
    serManager(manager);
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>{menuTitle}</title>
      </Head>
      <>
        {loading ? (
          ""
        ) : (
          <>
            <div className='flex flex-col h-full'>
              <div className='bg-zinc-300 h-[60px]'>
                <Logo />
              </div>
              <div className='flex h-screen bg-[#EBEBEB]'>
                <div className='w-[220px] h-full bg-[#FFFFFF]'>
                  <MenuBar />
                </div>
                <div className='w-full overflow-auto pb-[25px] mb-[20px]'>
                  {children}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default LayoutMain;
