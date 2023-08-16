import LayoutMain from "@/components/layout/LayoutMain";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ListModel, UserModel } from "./UserManagePage";
import axios from "axios";
import { OrderModel } from "../orders/OrderManagePage";
import getConfig from "next/config";
import Title from "@/components/title/Title";
const { publicRuntimeConfig } = getConfig();

export default function UserManageDetailPage() {
  const router = useRouter();
  const [manager, setManager] = useState();
  const [data, setData] = useState<UserModel>();

  // 주무리스트
  const [order, setOrder] = useState<ListModel<OrderModel>>();
  const [orderPagingInfo, setOrderPagingInfo] = useState({ size: 10, page: 0 });

  useEffect(() => {
    if (data === undefined) return;

    console.log("DDD");
    axios
      .get(
        `${publicRuntimeConfig.APISERVER}/order/list/${orderPagingInfo.page}/${
          orderPagingInfo.size
        }/${data!.id}`
      )
      .then((d) => {
        console.log(d.data.data);
        if (d.data.ok === true) {
          setOrder(d.data.data);
        }
      })
      .catch((e) => {});
  }, [orderPagingInfo, setOrderPagingInfo]);

  useEffect(() => {
    if (router.isReady === false) return;

    const user = localStorage.getItem("userDetail");
    if (user === null || user === undefined) {
      return;
    }
    const userJson = JSON.parse(user);
    setData(userJson);
    console.log(userJson);
    setTimeout(() => {
      setOrderPagingInfo({ size: 10, page: 0 });
    }, 300);
  }, [router]);

  const label = (txt: string) => {
    return (
      <td className='pl-[40px] w-[210px] bg-[#F9F9F9] text-black text-[16px] border-[1px] border-[#D7D7D7]'>
        <div className='text-base font-bold leading-9 text-black'>{txt}</div>
      </td>
    );
  };

  const value = (txt: string) => {
    return (
      <td className='pl-[56px] w-[500px] bg-white text-[#8C8C8C] text-[16px] border-[1px] border-[#D7D7D7]'>
        <div className='text-[16px] font-medium leading-loose text-neutral-400'>
          {txt}
        </div>
      </td>
    );
  };
  return (
    <>
      <LayoutMain menuTitle='메인화면' setManager={setManager}>
        <div className='pl-[40px] bg-[#EBEBEB]'>
          <div className=''>
            <div className='flex items-center mt-[16px]'>
              <div className='text-[16px] font-normal leading-9 text-black'>
                고객 관리
              </div>
              <div className='w-6 h-6 mx-[10px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.2803 11.4697C16.5732 11.7626 16.5732 12.2374 16.2803 12.5303L8.78033 20.0303C8.48744 20.3232 8.01256 20.3232 7.71967 20.0303C7.42678 19.7374 7.42678 19.2626 7.71967 18.9697L14.6893 12L7.71967 5.03033C7.42678 4.73744 7.42678 4.26256 7.71967 3.96967C8.01256 3.67678 8.48744 3.67678 8.78033 3.96967L16.2803 11.4697Z'
                    fill='#262628'
                  />
                </svg>
              </div>
              <div className='text-[16px] font-normal leading-9 text-black'>
                <Link href={"/main/users/UserManagePage"}>전체 고객 관리</Link>
              </div>
              <div className='w-6 h-6 mx-[10px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.2803 11.4697C16.5732 11.7626 16.5732 12.2374 16.2803 12.5303L8.78033 20.0303C8.48744 20.3232 8.01256 20.3232 7.71967 20.0303C7.42678 19.7374 7.42678 19.2626 7.71967 18.9697L14.6893 12L7.71967 5.03033C7.42678 4.73744 7.42678 4.26256 7.71967 3.96967C8.01256 3.67678 8.48744 3.67678 8.78033 3.96967L16.2803 11.4697Z'
                    fill='#262628'
                  />
                </svg>
              </div>
              <div className='text-[16px] font-semibold leading-9 text-sky-500'>
                고객 상세 정보
              </div>
            </div>
            <div className='mt-[29px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1406'
                height='1'
                viewBox='0 0 1406 1'
                fill='none'
              >
                <path
                  d='M0.615048 0.5H1405.38'
                  stroke='#C5C5C5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>

          <Title title='고객 상세 정보' />

          <div className='pt-[8px]'>
            <div className='text-2xl font-normal leading-9 text-black'>
              고객정보
            </div>
            {data === undefined ? (
              ""
            ) : (
              <div className='verflow-auto'>
                <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("최초 접속일")}
                    {value(data.created.toString())}
                    {label("최근 접속일")}
                    {value("2023.08.31")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("고객번호")}
                    {value(data.id)}
                    {label("고객명")}
                    {value(data.name)}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("이메일")}
                    {value(data.email)}
                    {label("전화번호")}
                    {value(`+${data.phone}`)}
                  </tr>
                </table>
                <div className='text-2xl font-normal leading-9 text-black mt-[60px]'>
                  구매정보({order?.data.length}개)
                </div>
                <div className=''>
                  {order !== undefined
                    ? order.data.map((d, i) => {
                        return (
                          <>
                            <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                              <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                                {label("주문번호")}
                                {value(d.id)}
                                {label("상품")}
                                {value("즉시 호출 (Default)")}
                              </tr>
                              <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                                {label("출발지")}
                                {value(d.startAddress)}
                                {label("도착지")}
                                {value(d.goalAddress)}
                              </tr>
                              <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                                {label("결제 승인일자")}
                                {value(d.paymentDate)}
                                {label("이용 상태")}
                                {value(d.status)}
                              </tr>
                              <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                                {label("결제 금액")}
                                {value(
                                  `USD ${JSON.parse(d.priceInfo).lastPrice}`
                                )}
                                {label("결제 수단")}
                                {value("NICEPAYMENTS")}
                              </tr>
                            </table>
                          </>
                        );
                      })
                    : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
