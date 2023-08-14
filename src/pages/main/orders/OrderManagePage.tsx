import LayoutMain from "@/components/layout/LayoutMain";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ListModel, UserModel } from "../users/UserManagePage";
import axios from "axios";
import getConfig from "next/config";
import { ElseUtils } from "@/libs/else.utils";
const { publicRuntimeConfig } = getConfig();

export interface OrderModel {
  id: string;
  created: Date;
  updated: Date;
  userId: string;
  startLng: string;
  startLat: string;
  startAddress: string;
  goalLng: string;
  goalLat: string;
  goalAddress: string;
  priceInfo: string;
  status: string;
  approvalDate: string;
}

export default function OrderManagePage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endtDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");

  // 주무리스트
  const [order, setOrder] =
    useState<ListModel<{ order: OrderModel; user: UserModel }>>();
  const [orderPagingInfo, setOrderPagingInfo] = useState({ size: 10, page: 0 });

  const [checkCBList, setCheckCBList] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `${publicRuntimeConfig.APISERVER}/order/list/${orderPagingInfo.page}/${orderPagingInfo.size}`
      )
      .then((d) => {
        if (d.data.ok === true) {
          setOrder(d.data.data);
        }
      })
      .catch((e) => {});
  }, [orderPagingInfo, setOrderPagingInfo]);

  useEffect(() => {
    if (router.isReady === false) return;

    if (router.query.status) {
      if (router.query.status === "payment") {
        setTitle("결제완료 상품 관리");
      } else if (router.query.status === "done") {
        setTitle("이용완료 상품 관리");
      } else if (router.query.status === "cancel") {
        setTitle("이용취소 상품 관리");
      } else {
        setTitle("전체 상품 관리");
      }
      setInit(true);
    } else {
      location.href = "/main/orders/OrderManagePage?status=all";
    }
  }, [router]);

  const headLabel = (txt: string) => {
    return (
      <div className='border-[1px] border-[#D7D7D7] w-[210px] h-[74px] text-black text-[17px] bg-[#F9F9F9] flex items-center pl-[40px] font-normal'>
        {txt}
      </div>
    );
  };

  const cbBox = (index: number, title: string) => {
    return (
      <div className='ml-[32px]'>
        <input
          id={`cb${index}`}
          type='checkbox'
          value=''
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          onChange={(e) => {
            checkView(index, e.target.checked);
          }}
        />
        <label
          htmlFor={`cb${index}`}
          className='ml-2 text-sm font-medium text-black text-[15px]'
        >
          {title}
        </label>
      </div>
    );
  };

  const tableTh = (title: string, width: number, index: number) => {
    return (
      <>
        {checkCBList[index] ? (
          <th scope='col' className={`px-6 py-3 w-[${width}px]`}>
            <div className='text-base font-bold leading-9 text-black'>
              {title}
            </div>
          </th>
        ) : (
          ""
        )}
      </>
    );
  };

  const tableTd = (title: string, index: number, d: any) => {
    return (
      <>
        {checkCBList[index] ? (
          <td className='px-6 py-4'>
            <div
              className='text-xl font-medium leading-loose text-neutral-400'
              data-tooltip-target='tooltip-light'
              data-tooltip-style='light'
            >
              {index === 5 ? (
                <Link
                  href={"/main/orders/OrderManageDetailPage"}
                  onClick={(e) => {
                    localStorage.setItem("orderuserinfo", JSON.stringify(d));
                  }}
                >
                  <button className='w-[149px] h-[59px] font-normal bg-[#0085FE] text-white rounded-lg'>
                    {title}
                  </button>
                </Link>
              ) : (
                title
              )}
            </div>
          </td>
        ) : (
          ""
        )}
      </>
    );
  };
  const setInit = (isCheck: boolean) => {
    for (let index = 0; index < 11; index++) {
      var cb = document.getElementById(`cb${index}`);
      (cb as HTMLInputElement).checked = isCheck;
    }
    setCheckCBList([
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
      isCheck,
    ]);
  };
  const checkView = (order: number, isCheck: boolean) => {
    if (order === 0) {
      setInit(isCheck);
      return;
    }

    setCheckCBList([...checkCBList, (checkCBList[order] = isCheck)]);

    let allCheck = true;
    for (let index = 1; index < 9; index++) {
      var cb = document.getElementById(`cb${index}`);
      if ((cb as HTMLInputElement).checked === false) {
        allCheck = false;
      }
    }

    var cbAll = document.getElementById("cb0");
    if (allCheck) {
      (cbAll as HTMLInputElement)!.checked = true;
      setCheckCBList([...checkCBList, (checkCBList[0] = true)]);
    } else {
      (cbAll as HTMLInputElement)!.checked = false;
      setCheckCBList([...checkCBList, (checkCBList[0] = false)]);
    }
  };

  return (
    <>
      <LayoutMain menuTitle='메인화면'>
        <div className='pl-[40px] w-full'>
          <div className=''>
            <div className='flex items-center mt-[40px]'>
              <div className='text-2xl font-normal leading-9 text-black'>
                상품 관리
              </div>
              <div className='w-6 h-6'>
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
              <div className='text-2xl font-semibold leading-9 text-sky-500'>
                {title}
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

          <div className='text-black text-4xl font-bold leading-[38px] pt-[40px]'>
            {title}
          </div>
          <div className='pt-[80px] w-[1420px] '>
            <div className='flex flex-col '>
              <div className='flex'>
                {headLabel("기간")}
                <div className=' w-full h-[74px] text-black text-[17px] bg-white flex items-center pl-[40px] font-normal'>
                  <div className='flex items-center'>
                    <DatePicker
                      className='border-[#D9D9D9] rounded-md'
                      dateFormat='yyyy-MM-dd'
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                    <div className='px-[18px]'>~</div>
                    <DatePicker
                      className='border-[#D9D9D9] rounded-md'
                      dateFormat='yyyy-MM-dd'
                      selected={endtDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                    <button className='border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[26px] flex justify-center items-center'>
                      오늘
                    </button>
                    <button className='border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[26px] flex justify-center items-center'>
                      3일
                    </button>
                    <button className='border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[26px] flex justify-center items-center'>
                      7일
                    </button>
                    <button className='border-[#0085FE] bg-[#0085FE] rounded-md w-20 border h-11 text-[17px] text-white ml-[26px] flex justify-center items-center'>
                      전체
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex'>
                {headLabel("이용 상태")}
                <div className=' w-full h-[74px] text-black text-[17px] bg-white flex items-center pl-[40px] font-normal'>
                  <select
                    id='countries'
                    className='text-sm text-gray-900 text-[17px] border border-gray-300 bg-gray-50 w-[182px] h-[56px] rounded-md'
                    defaultValue='payment'
                  >
                    <option value='payment'>결제완료</option>
                    <option value='done'>이용완료</option>
                    <option value='cancel'>이용취소</option>
                  </select>
                </div>
              </div>
              <div className='flex'>
                {headLabel("선택")}
                <div className=' w-full h-[74px] text-black text-[17px] bg-white flex items-center pl-[40px] font-normal'>
                  <div className='flex'>
                    <div className='flex items-center mb-4'>
                      <div className=''>{cbBox(0, "전체")}</div>
                      <div className=''>{cbBox(1, "주문번호")}</div>
                      <div className=''>{cbBox(2, "고객명")}</div>
                      <div className=''>{cbBox(3, "출발지")}</div>
                      <div className=''>{cbBox(4, "도착지")}</div>
                      <div className=''>{cbBox(5, "이용상태")}</div>
                      <div className=''>{cbBox(6, "이메일")}</div>
                      <div className=''>{cbBox(7, "전화번호")}</div>
                      <div className=''>{cbBox(8, "결제금액")}</div>
                      <div className=''>{cbBox(9, "결제금액")}</div>
                      <div className=''>{cbBox(10, "결제승인일자")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-[80px]'>
            <span className='text-2xl font-medium leading-9 text-black'>
              목록 (총{" "}
            </span>
            <span className='text-2xl font-medium leading-9 text-sky-500'>
              {order?.data.length}
            </span>
            <span className='text-2xl font-medium leading-9 text-black'>
              명)
            </span>
          </div>
          <div className='pt-[40px]'>
            <div className=''>
              <table className='text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='h-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    {tableTh("주문번호", 210, 1)}
                    {tableTh("고객명", 210, 2)}
                    {tableTh("출발지", 210, 3)}
                    {tableTh("도착지", 210, 4)}
                    {tableTh("이용상태", 210, 5)}
                    {tableTh("이메일", 210, 6)}
                    {tableTh("전화번호", 210, 7)}
                    {tableTh("결제금액", 210, 8)}
                    {tableTh("결제승인일자", 210, 9)}
                  </tr>
                </thead>
                <tbody>
                  {order?.data.map((d, i) => {
                    return (
                      <>
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                          {tableTd(
                            ElseUtils.stringCut(d.order.id, 50, "..."),
                            1,
                            d
                          )}
                          {tableTd(d.user.name, 2, d)}
                          {tableTd(d.order.startAddress, 3, d)}
                          {tableTd(d.order.goalAddress, 4, d)}
                          {tableTd(d.order.status, 5, d)}
                          {tableTd(d.user.email, 6, d)}
                          {tableTd("+82 10 0000 0000", 7, d)}
                          {tableTd(
                            `USD ${JSON.parse(d.order.priceInfo).lastPrice}`,
                            8,
                            d
                          )}
                          {tableTd("2023.09.06 22:22", 9, d)}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
