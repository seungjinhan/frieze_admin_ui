import LayoutMain from "@/components/layout/LayoutMain";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function OrderManagePage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endtDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");

  const router = useRouter();

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
          <div className='pt-[80px] w-[1417px] '>
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
                      <div className=''>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-[#0085FE] text-sm font-medium text-[15px]'
                        >
                          전체
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          주문번호
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          고객명
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          출발지
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          도착지
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          이메일
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          전화번호
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          결제금액
                        </label>
                      </div>
                      <div className='ml-[32px]'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          value=''
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='default-checkbox'
                          className='ml-2 text-sm font-medium text-black text-[15px]'
                        >
                          결제승인일자
                        </label>
                      </div>
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
              10
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
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        주문번호
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        고객명
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[329px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        출발지
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[255px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        도착지
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        이용상태
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        이메일
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        전화번호
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        결제금액
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        결제승인일자
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        P188F7B4
                      </div>
                    </th>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        KIM KYOOJIN
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        Incheon International Airport Terminal 1
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        COEX
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>결제완료</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>kj_kim@likealocal.co.kr</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>+82 10 0000 0000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>USD 100.000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>2023.09.06 22:22</button>
                      </div>
                    </td>
                  </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        P188F7B4
                      </div>
                    </th>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        KIM KYOOJIN
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        Incheon International Airport Terminal 1
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        COEX
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>결제완료</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>kj_kim@likealocal.co.kr</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>+82 10 0000 0000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>USD 100.000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>2023.09.06 22:22</button>
                      </div>
                    </td>
                  </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        P188F7B4
                      </div>
                    </th>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        KIM KYOOJIN
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        Incheon International Airport Terminal 1
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        COEX
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>결제완료</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>kj_kim@likealocal.co.kr</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>+82 10 0000 0000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>USD 100.000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>2023.09.06 22:22</button>
                      </div>
                    </td>
                  </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        P188F7B4
                      </div>
                    </th>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        KIM KYOOJIN
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        Incheon International Airport Terminal 1
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        COEX
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>결제완료</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>kj_kim@likealocal.co.kr</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>+82 10 0000 0000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>USD 100.000</button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xl font-medium leading-loose text-neutral-400'>
                        <button>2023.09.06 22:22</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
