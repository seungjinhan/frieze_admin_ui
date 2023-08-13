import Head from "next/head";
import { useEffect, useState } from "react";
import MenuBar from "../menuBar/MenuBar";
import "../../app/globals.css";
import "flowbite";

interface LayoutMainProps {
  children: any;
  menuTitle: string;
}
const LayoutMain = ({ menuTitle, children }: LayoutMainProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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
