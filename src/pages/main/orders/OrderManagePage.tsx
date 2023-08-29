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
import moment from "moment";
import Title from "@/components/title/Title";
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
  paymentDate: string;
  canceltDate: string;
  dispatchDate: string;
  getonDate: string;
  doneDate: string;
}

export default function OrderManagePage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endtDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [searchType, setSearchType] = useState(-1);
  const [searchStatus, setSearchStatus] = useState("NONE");

  const [email, setEmail] = useState("");

  const [listCount, setListCount] = useState(0);
  const [manager, setManager] = useState();

  const router = useRouter();

  // 주무리스트
  const [order, setOrder] =
    useState<ListModel<{ order: OrderModel; user: UserModel }>>();
  const [orderPagingInfo, setOrderPagingInfo] = useState({
    size: 999999,
    page: 0,
  });

  const [checkCBList, setCheckCBList] = useState([
    true, //1
    true, //2
    true, //3
    true, //4
    true, //5
    true, //6
    true, //7
    true, //8
    true, //9
    true, //10
    true, //11
  ]);

  useEffect(() => {
    if (searchStatus === "NONE") return;

    search(-1);
    searchRun();
  }, [searchStatus, setSearchStatus]);

  const searchRun = () => {
    const url = `${publicRuntimeConfig.APISERVER}/order/list/${orderPagingInfo.page}/${orderPagingInfo.size}?type=${searchType}&s=${startDate}&g=${endtDate}&status=${searchStatus}&email=${email}`;
    axios
      .get(url)
      .then((d) => {
        if (d.data.ok === true) {
          setOrder(d.data.data);
          // 데이터를 로딩 후 초기화 한다.
          setInit(true);
        }
      })
      .catch((e) => {});
  };

  const search = (type: number) => {
    setSearchType(type);
    let newDate;
    let endD;
    if (type >= 0) {
      newDate = moment().subtract(type, "days").format("YYYY-MM-DD");
      setStartDate(new Date(newDate));
      endD = moment().format("YYYY-MM-DD");
      setEndDate(new Date(endD));
    }
  };

  useEffect(() => {
    if (router.isReady === false) return;

    const status = router.query.status as string;
    if (status) {
      setSearchStatus(status);
      if (status === "PAYMENT") {
        setTitle("결제완료 상품 관리");
      } else if (status === "DONE") {
        setTitle("이용완료 상품 관리");
      } else if (status === "CANCEL") {
        setTitle("이용취소 상품 관리");
      } else {
        setTitle("전체 상품 관리");
      }
    } else {
      location.href = "/main/orders/OrderManagePage?status=ALL";
    }
  }, [router]);

  const headLabel = (txt: string) => {
    return (
      <div className='border-[1px] border-[#D7D7D7] w-[110px] h-[74px] text-black text-[17px] bg-[#F9F9F9]  font-normal flex justify-center items-center'>
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
            <div className='text-[16px] font-bold leading-9 text-black'>
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
              className='text-[16px] font-medium leading-loose text-neutral-400'
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
                  <button className='w-[119px] h-[49px] font-normal bg-[#0085FE] text-white rounded-lg'>
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
    for (let index = 0; index < 12; index++) {
      var cb = document.getElementById("cb" + index);
      (cb as HTMLInputElement).checked = isCheck;
    }
    setCheckCBList([
      isCheck, //1
      isCheck, //2
      isCheck, //3
      isCheck, //4
      isCheck, //5
      isCheck, //6
      isCheck, //7
      isCheck, //8
      isCheck, //9
      isCheck, //10
      isCheck, //11
    ]);
  };
  const checkView = (order: number, isCheck: boolean) => {
    if (order === 0) {
      setInit(isCheck);
      return;
    }

    setCheckCBList([...checkCBList, (checkCBList[order] = isCheck)]);

    let allCheck = true;
    for (let index = 1; index < 10; index++) {
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
      <LayoutMain menuTitle='메인화면' setManager={setManager}>
        <div className='pl-[40px] w-full pr-[10px]'>
          <div className=''>
            <div className='flex items-center mt-[16px]'>
              <div className='text-[16px] font-normal leading-9 text-black'>
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
              <div className='text-[16px] font-semibold leading-9 text-sky-500'>
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

          <Title title={title} />
          <div className='pt-[16px] w-[1520px] '>
            <div className='flex flex-col '>
              <div className='flex'>
                {headLabel("검색조건")}
                <div className=' w-full h-[74px] text-black text-[17px] bg-white flex items-center pl-[40px] font-normal'>
                  <div className='flex items-center'>
                    <DatePicker
                      disabled={searchType === -1 ? true : false}
                      className={
                        searchType === -1
                          ? "bg-gray-500  rounded-md w-[130px]"
                          : `border-[#D9D9D9] rounded-md  w-[130px]`
                      }
                      dateFormat='yyyy-MM-dd'
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                    <div className='px-[10px]'>~</div>
                    <DatePicker
                      disabled={searchType === -1 ? true : false}
                      className={
                        searchType === -1
                          ? "bg-gray-500  rounded-md  w-[130px]"
                          : `border-[#D9D9D9] rounded-md  w-[130px]`
                      }
                      dateFormat='yyyy-MM-dd'
                      selected={endtDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                    <button
                      className={
                        searchType === 0
                          ? `border-[#0085FE] bg-[#0085FE] rounded-md w-20 border h-11 text-[17px] text-white ml-[16px] flex justify-center items-center`
                          : `border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[16px] flex justify-center items-center`
                      }
                      onClick={(e) => {
                        search(0);
                      }}
                    >
                      오늘
                    </button>
                    <button
                      className={
                        searchType === 3
                          ? `border-[#0085FE] bg-[#0085FE] rounded-md w-20 border h-11 text-[17px] text-white ml-[16px] flex justify-center items-center`
                          : `border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[16px] flex justify-center items-center`
                      }
                      onClick={(e) => {
                        search(3);
                      }}
                    >
                      3일
                    </button>
                    <button
                      className={
                        searchType === 7
                          ? `border-[#0085FE] bg-[#0085FE] rounded-md w-20 border h-11 text-[17px] text-white ml-[16px] flex justify-center items-center`
                          : `border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[16px] flex justify-center items-center`
                      }
                      onClick={(e) => {
                        search(7);
                      }}
                    >
                      7일
                    </button>
                    <button
                      className={
                        searchType === -1
                          ? `border-[#0085FE] bg-[#0085FE] rounded-md w-20 border h-11 text-[17px] text-white ml-[16px] flex justify-center items-center`
                          : `border-[#D9D9D9] rounded-md w-20 border h-11 text-[17px] text-[#8C8C8C] ml-[16px] flex justify-center items-center`
                      }
                      onClick={(e) => {
                        search(-1);
                      }}
                    >
                      전체
                    </button>
                    <div className='ml-[10px] h-[50px] w-[2px] bg-slate-700'></div>
                    <input
                      className='text-xl font-normal placeholder-slate-300 text-zinc-400 focus:outline-none ring-0 p-4 bg-white border rounded w-[324px] h-[46px] pr-14 border-zinc-400 ml-[10px]'
                      placeholder='이메일'
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <button
                      className='border-[#0085FE] bg-[#0f1c29] rounded-md w-44 border h-11 text-[17px] text-white ml-[26px] flex justify-center items-center'
                      onClick={searchRun}
                    >
                      검색
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className='flex'>
                {headLabel("이메일")}
                <div className=' w-full h-[74px] text-black text-[17px] bg-white flex items-center pl-[40px] font-normal'>
                  
                  <select
                    id='countries'
                    className='text-sm text-gray-900 text-[17px] border border-gray-300 bg-gray-50 w-[182px] h-[56px] rounded-md'
                    defaultValue='ALL'
                    onChange={(e) => {
                      setListFilter(e.target.value);
                    }}
                  >
                    <option value='ALL'>전체</option>
                    <option value='PAYMENT'>결제완료</option>
                    <option value='DONE'>이용완료</option>
                    <option value='CANCEL'>이용취소</option>
                  </select>
                </div>
              </div> */}
              <div className='flex'>
                {headLabel("선택")}
                <div className=' w-full h-[74px] text-black text-[10px] bg-white flex items-center pl-[40px] font-normal'>
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
                      <div className=''>{cbBox(9, "결제승인일자")}</div>
                      <div className=''>{cbBox(10, "주문상태")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-[16px]'>
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
          <div className='pt-[8px]'>
            <div className='overflow-auto'>
              <table className='text-[16px]] text-left text-gray-500 dark:text-gray-400'>
                <thead className='h-full text-[16px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
                    {tableTh("주문상태", 210, 10)}
                  </tr>
                </thead>
                <tbody>
                  {order?.data.map((d, i) => {
                    // if (listFilter !== "ALL") {
                    //   if (listFilter !== d.order.status) {
                    //     return;
                    //   }
                    // }
                    return (
                      <tr
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                        key={i}
                      >
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
                        {tableTd(`+${d.user.phone}`, 7, d)}
                        {tableTd(
                          `USD ${JSON.parse(d.order.priceInfo).lastPrice}`,
                          8,
                          d
                        )}
                        {tableTd(d.order.paymentDate, 9, d)}
                        {tableTd(d.order.status, 10, d)}
                      </tr>
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
