import LayoutMain from "@/components/layout/LayoutMain";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface ListModel<T> {
  page: number;
  size: number;
  totla: number;
  totalPage: number;
  data: T[];
}

export interface UserModel {
  id: string;
  created: Date;
  updated: Date;
  name: string;
  email: string;
  isAuth: boolean;
  else01: string;
  else02: string;
}

export default function UserManagePage() {
  const [data, setData] = useState<ListModel<UserModel>>({
    page: 0,
    size: 10,
    totla: 0,
    totalPage: 0,
    data: [],
  });
  const [pagingInfo, setPagingInfo] = useState({ size: 10, page: 0 });

  useEffect(() => {
    setPagingInfo({ size: 10, page: 0 });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${publicRuntimeConfig.APISERVER}/c.user/list/${pagingInfo.page}/${pagingInfo.size}`
      )
      .then((d) => {
        console.log(d.data.data);
        if (d.data.ok === true) {
          setData(d.data.data);
        }
      })
      .catch((e) => {});
  }, [pagingInfo, setPagingInfo]);

  return (
    <>
      <LayoutMain menuTitle='메인화면'>
        <div className='pl-[40px] w-full'>
          <div className=''>
            <div className='flex items-center mt-[40px]'>
              <div className='text-2xl font-normal leading-9 text-black'>
                고객 관리
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
                전체 고객 관리
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
            전체 고객 관리
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
                        고객번호
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        고객명
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[329px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        이메일
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[255px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        전화번호
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        최초접속일
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3 w-[210px]'>
                      <div className='text-base font-bold leading-9 text-black'>
                        관리
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((d: any, i: any) => (
                    <tr
                      key={i}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    >
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        <div className='text-xl font-medium leading-loose text-neutral-400'>
                          {d.id}
                        </div>
                      </th>
                      <td className='px-6 py-4'>
                        <div className='text-xl font-medium leading-loose text-neutral-400'>
                          {d.name}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-xl font-medium leading-loose text-neutral-400'>
                          {d.email}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-xl font-medium leading-loose text-neutral-400'>
                          +821000000000
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-xl font-medium leading-loose text-neutral-400'>
                          {d.created}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div
                          className='inline-flex items-center justify-center py-3 border rounded w-[149px] h-[56px] px-9 border-zinc-300'
                          onClick={(e) => {
                            localStorage.setItem(
                              "userDetail",
                              JSON.stringify(d)
                            );
                          }}
                        >
                          <Link href={"/main/users/UserManageDetailPage"}>
                            <div className='text-[20px] font-medium leading-loose text-neutral-400'>
                              상세 정보
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
