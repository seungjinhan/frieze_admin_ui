import Head from "next/head";
import { useEffect, useState } from "react";
import MenuBar from "../menuBar/MenuBar";
import "../../app/globals.css";
import "flowbite";
import { SecurityUtils } from "@/libs/security.utils";

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
    const manager = localStorage.getItem("managerinfomation");
    if (manager === undefined || manager === null) {
      alert("부적절한 접근");
      location.href = "/";
      return;
    }
    const managerJson = JSON.parse(SecurityUtils.decryptText(manager));
    serManager(managerJson);

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
              <div className='bg-zinc-300 h-[181px]'></div>
              <div className='flex h-screen bg-[#EBEBEB]'>
                <div className='w-[320px] h-full bg-[#FFFFFF]'>
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
