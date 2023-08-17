import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenuBar() {
  const router = useRouter();
  const [data, setData] = useState("");
  useEffect(() => {
    if (router.isReady === false) return;
    setData(router.asPath);
  }, [router]);

  return (
    <div>
      <div className='bg-[#F9F9F9] flex items-center text-[16px] pl-[20px] py-[10px] text-neutral-800 font-bold leading-9'>
        고객관리
      </div>
      {data.endsWith("UserManagePage") ||
      data.endsWith("UserManageDetailPage") ? (
        <div className='bg-white  flex items-center pl-[30px] py-[10px] text-sky-500 text-[14px] font-semibold leading-9'>
          전체고객관리
        </div>
      ) : (
        <div className='bg-white flex items-center pl-[20px] py-[10px] text-stone-500 text-[14px] font-semibold leading-9'>
          <Link href={"/main/users/UserManagePage"}>전체고객관리</Link>
        </div>
      )}
      <div className='bg-[#F9F9F9] flex items-center text-neutral-800 text-[16px] pl-[20px] py-[10px] font-bold leading-9'>
        상품관리
      </div>
      <div className='bg-white flex flex-col pl-[20px] py-[10px] text-stone-500 text-[14px] font-semibold leading-9'>
        <div className=''>
          {data.endsWith("OrderManagePage?status=all") ||
          data.endsWith("OrderManageDetailPage") ? (
            <div className='text-sky-500'>전체상품 리스트</div>
          ) : (
            <Link href={"/main/orders/OrderManagePage?status=ALL"}>
              전체상품 리스트
            </Link>
          )}
        </div>
        <div className='mt-[24px]'></div>
        <div className=''>
          {data.endsWith("OrderManagePage?status=payment") ? (
            <div className='text-sky-500'>결제완료 리스트</div>
          ) : (
            <Link href={"/main/orders/OrderManagePage?status=PAYMENT"}>
              결제완료 리스트
            </Link>
          )}
        </div>
        <div className='mt-[24px]'></div>
        <div className=''>
          {data.endsWith("OrderManagePage?status=done") ? (
            <div className='text-sky-500'>이용완료 리스트</div>
          ) : (
            <Link href={"/main/orders/OrderManagePage?status=DONE"}>
              이용완료 리스트
            </Link>
          )}
        </div>
        <div className='mt-[24px]'></div>
        <div className=''>
          {data.endsWith("OrderManagePage?status=cancel") ? (
            <div className='text-sky-500'>이용취소 리스트</div>
          ) : (
            <Link href={"/main/orders/OrderManagePage?status=CANCEL"}>
              이용취소 리스트
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
