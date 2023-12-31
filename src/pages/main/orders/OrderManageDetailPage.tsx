import LayoutMain from "@/components/layout/LayoutMain";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserModel } from "../users/UserManagePage";
import { OrderModel } from "./OrderManagePage";
import axios from "axios";
import getConfig from "next/config";
import { ElseUtils } from "@/libs/else.utils";
import { useRouter } from "next/router";
const { publicRuntimeConfig } = getConfig();
export interface ManagerModel {
  id: string;
  created: Date;
  updated: Date;
  name: string;
  email: string;
  password: string;
  else01: string;
  else02: string;
  lastLoginDate: string;
}

export default function UserManageDetailPage() {
  const [manager, setManager] = useState<ManagerModel>();
  const [data, setData] = useState<{ order: OrderModel; user: UserModel }>();

  const [cancelInfo, setCancelInfo] = useState({
    type: "관리자취소",
    resaon: "",
  });
  const [isShowModal, setIsShowModal] = useState(false);

  const searchOrderWithUser = (orderId: string) => {
    axios
      .get(`${publicRuntimeConfig.APISERVER}/order/orderWithUser/${orderId}`)
      .then((d) => {
        setData(d.data.data);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    const orderUser = localStorage.getItem("orderuserinfo");
    if (orderUser === undefined || orderUser === null) {
      return;
    }
    const orderUserJson = JSON.parse(orderUser);
    searchOrderWithUser(orderUserJson.order.id);
  }, []);

  const runCancel = () => {
    axios
      .post(`${publicRuntimeConfig.APISERVER}/order/payment/admin/cancel`, {
        id: data!.order.id,
        managerId: manager!.id,
        ...cancelInfo,
      })
      .then((d) => {
        setIsShowModal(false);
        searchOrderWithUser(data!.order.id);
      })
      .catch((e) => {
        alert(e.response.data.data.description.codeMessage);
        setIsShowModal(false);
      });
  };

  const runDispatch = () => {
    axios
      .post(`${publicRuntimeConfig.APISERVER}/order/payment/admin/dispatch`, {
        id: data!.order.id,
      })
      .then((d) => {
        alert("배차완료처리");
        searchOrderWithUser(data!.order.id);
      })
      .catch((e) => {
        alert(e.response.data.data.description.codeMessage);
      });
  };

  /**
   * 탑승완료
   */
  const rurGeton = () => {
    axios
      .post(`${publicRuntimeConfig.APISERVER}/order/payment/admin/geton`, {
        id: data!.order.id,
      })
      .then((d) => {
        alert("탑승완료처리");
        searchOrderWithUser(data!.order.id);
      })
      .catch((e) => {
        alert(e.response.data.data.description.codeMessage);
      });
  };

  /**
   * 완료처리
   */
  const runDone = () => {
    axios
      .post(`${publicRuntimeConfig.APISERVER}/order/payment/admin/done`, {
        id: data!.order.id,
      })
      .then((d) => {
        alert("하차완료처리");
        searchOrderWithUser(data!.order.id);
      })
      .catch((e) => {
        alert(e.response.data.data.description.codeMessage);
      });
  };

  const label = (txt: string) => {
    return (
      <td className='pl-[40px] w-[210px] bg-[#F9F9F9] text-black text-[17px] border-[1px] border-[#D7D7D7]'>
        <div className='text-base font-bold leading-9 text-black'>{txt}</div>
      </td>
    );
  };

  const value = (txt: string) => {
    return (
      <td className='pl-[56px] w-[500px] bg-white text-[#8C8C8C] text-[20px] border-[1px] border-[#D7D7D7]'>
        <div className='text-xl font-medium leading-loose text-neutral-400'>
          {txt}
        </div>
      </td>
    );
  };

  if (data === undefined) return;
  return (
    <>
      <LayoutMain menuTitle='메인화면' setManager={setManager}>
        <div className='pl-[40px] bg-[#EBEBEB]'>
          <div className=''>
            <div className='flex items-center mt-[40px]'>
              <div className='text-2xl font-normal leading-9 text-black'>
                상품 관리
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
              <div className='text-2xl font-normal leading-9 text-black'>
                <Link href={"/main/orders/OrderManagePage"}>
                  전체 상품 리스트
                </Link>
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
              <div className='text-2xl font-semibold leading-9 text-sky-500'>
                {data?.order.status} 상세정보
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
            {data?.order.status} 상세정보
          </div>
          <div className='flex w-[1406px]'>
            <div className='flex flex-col text-black text-[24px] mt-[40px] font-normal '>
              <div className='flex'>
                <div className='pr-[5px]'>마지막 수정자 :</div>
                <div className='font-bold pl-[5px]'>{manager?.name}</div>
              </div>
              <div className='flex mt-[5px]'>
                <div className='pr-[5px] w-[150px]'>결제일시 :</div>
                <div className='font-bold pl-[0px] w-[220px]'>
                  {data.order.approvalDate}
                </div>
              </div>
              {/* <div className='flex mt-[5px]'>
                {data.order.status === "CANCEL" ? (
                  <>
                    <div className=''>
                      <div className='flex'>
                        <div className='pr-[5px] w-[150px]'>배차완료일시 :</div>
                        <div className='font-bold pl-[0px] w-[220px]'>
                          {data.order.dispatchDate}
                        </div>
                      </div>
                      <div className='flex'>
                        <div className='pr-[5px] w-[150px]'>취소일시 :</div>
                        <div className='font-bold pl-[0px] w-[220px]'>
                          {data.order.canceltDate}
                        </div>
                      </div>
                    </div>
                  </>
                ) : data.order.status === "DISPATCH" ? (
                  <>
                    <div className='pr-[5px] w-[150px]'>배차완료일시 :</div>
                    <div className='font-bold pl-[0px] w-[220px]'>
                      {data.order.dispatchDate}
                    </div>
                  </>
                ) : data.order.status === "PAYMENT"?"":(
                  <>
                    <div className=''>
                      <div className='flex'>
                        <div className='pr-[5px] w-[150px]'>배차완료일시 :</div>
                        <div className='font-bold pl-[0px] w-[220px]'>
                          {data.order.dispatchDate}
                        </div>
                      </div>
                      <div className='flex'>
                        <div className='pr-[5px] w-[150px]'>완료일시 :</div>
                        <div className='font-bold pl-[0px] w-[220px]'>
                          {data.order.doneDate}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div> */}
            </div>
            {/* 취소/완료에 대해서는 어떤 기능 버튼이 필요 없음 */}

            <div className='flex items-end justify-end w-full'>
              <button
                className='bg-[#D9D9D9] w-[216px] ml-[10px] h-[56px] rounded-lg text-[24px] text-black'
                onClick={(e) => {
                  runDispatch();
                }}
              >
                배차완료
              </button>
              <button
                className='bg-[#D9D9D9] w-[216px] ml-[10px] h-[56px] rounded-lg text-[24px] text-black'
                onClick={(e) => {
                  rurGeton();
                }}
              >
                탑승완료
              </button>
              <button
                className='bg-[#D9D9D9] w-[216px] ml-[10px] h-[56px] rounded-lg text-[24px] text-black'
                onClick={(e) => {
                  runDone();
                }}
              >
                하차완료
              </button>

              <button
                className='bg-[#D9D9D9] w-[216px] ml-[10px] h-[56px] rounded-lg text-[24px] text-black'
                onClick={(e) => {
                  setIsShowModal(true);
                }}
              >
                취소
              </button>
            </div>
          </div>
          <div className='mt-[40px]'>
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
          <div className='pt-[60px]'>
            <div className='text-2xl font-normal leading-9 text-black mt-[60px]'>
              상품정보
            </div>
            <div className=''>
              <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("주문번호")}
                  {value(data!.order.id)}
                  {label("상품")}
                  {value("즉시 호출 (Default)")}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("출발지")}
                  {value(data!.order.startAddress)}
                  {label("도착지")}
                  {value(data!.order.goalAddress)}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("결제 승인일자")}
                  {value(data!.order.approvalDate)}
                  {label("이용 상태")}
                  {value(data!.order.status)}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("결제 금액")}
                  {value(`USD ${JSON.parse(data!.order.priceInfo).lastPrice}`)}
                  {label("결제 수단")}
                  {value("NICEPAYMENTS")}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("배차완료 일시")}
                  {value(`${data!.order.dispatchDate}`)}
                  {label("탑승완료 일시")}
                  {value(`${data!.order.getonDate}`)}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("하차완료 일시")}
                  {value(`${data!.order.doneDate}`)}
                  {label("취소완료 일시")}
                  {value(`${data!.order.canceltDate}`)}
                </tr>
              </table>
            </div>
            <div className='text-2xl font-normal leading-9 text-black mt-[60px]'>
              고객정보
            </div>
            <div className='verflow-auto'>
              <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("최초 접속일")}
                  {value(ElseUtils.changeDate(data!.user.created.toString()))}
                  {label("최근 접속일")}
                  {manager === undefined ? "" : value(manager!.lastLoginDate)}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("고객번호")}
                  {value(data!.user.id)}
                  {label("고객명")}
                  {value(data!.user.name)}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("이메일")}
                  {value(data!.user.email)}
                  {label("전화번호")}
                  {value(`+${data!.user.phone}`)}
                </tr>
              </table>
            </div>
          </div>
        </div>
      </LayoutMain>

      {isShowModal ? (
        <div className='fixed top-0 left-0 flex justify-center w-screen h-screen overflow-hidden bg-gray-700 bg-opacity-40'>
          <div className='bg-white text-black w-[1440px] h-[704px] mt-[318px]'>
            <div className='flex flex-col items-center'>
              <div className=' text-[36px] mt-[56px] mb-[33px]'>취소처리</div>
            </div>
            <div className='flex flex-col ml-[40px]'>
              <div className='flex items-center'>
                <div className='mr-[72px] w-[95px]'>취소처리</div>
                <div className=''>
                  <select
                    id='countries'
                    className='text-sm text-gray-900 text-[17px] border border-gray-300 bg-gray-50 w-[182px] h-[56px] rounded-md'
                    defaultValue='관리자취소'
                    onChange={(e) => {
                      setCancelInfo({ ...cancelInfo, type: e.target.value });
                    }}
                  >
                    <option value='관리자취소'>관리자취소</option>
                    <option value='고객취소'>고객취소</option>
                  </select>
                </div>
              </div>
              <div className='flex items-center mt-[20px]'>
                <div className='mr-[70px] w-[95px]'>취소사유</div>
                <div className='mr-[48px] w-full '>
                  <textarea
                    className='text-sm text-gray-900 text-[24px] border border-gray-300 bg-gray-50 w-full  rounded-md pl-[32px]'
                    rows={5}
                    cols={10}
                    onChange={(e) => {
                      setCancelInfo({ ...cancelInfo, resaon: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className='flex items-center mt-[20px]'>
                <div className='mr-[72px] w-[95px]'>결제금액</div>
                <div className='mr-[48px] w-full '>
                  <div className='text-sm text-gray-900 text-[24px] border border-gray-300 bg-gray-50 w-full h-[56px] rounded-md flex items-center pl-[32px]'>
                    USD {JSON.parse(data.order.priceInfo).lastPrice}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end mt-[210px] mr-[48px]'>
              <button
                className='w-[216px] h-[56px] bg-[#D9D9D9] rounded-lg'
                onClick={(e) => {
                  setIsShowModal(false);
                }}
              >
                닫기
              </button>
              <button
                className='w-[216px] h-[56px] bg-[#D9D9D9] ml-[27px] rounded-lg'
                onClick={runCancel}
              >
                취소처리완료
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
