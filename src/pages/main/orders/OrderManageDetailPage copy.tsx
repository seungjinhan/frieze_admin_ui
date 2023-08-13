import LayoutMain from "@/components/layout/LayoutMain";
import Link from "next/link";

export default function UserManageDetailPage() {
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
  return (
    <>
      <LayoutMain menuTitle='메인화면'>
        <div className='pl-[40px] bg-[#EBEBEB]'>
          <div className=''>
            <div className='flex items-center mt-[40px]'>
              <div className='text-2xl font-normal leading-9 text-black'>
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
              <div className='text-2xl font-normal leading-9 text-black'>
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
              <div className='text-2xl font-semibold leading-9 text-sky-500'>
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
          <div className='text-black text-4xl font-bold leading-[38px] pt-[40px]'>
            고객 상세 정보
          </div>

          <div className='pt-[40px]'>
            <div className='text-2xl font-normal leading-9 text-black'>
              고객정보
            </div>
            <div className='verflow-auto'>
              <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("최초 접속일")}
                  {value("2023.08.31")}
                  {label("최근 접속일")}
                  {value("2023.08.31")}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("고객번호")}
                  {value("12341234123423")}
                  {label("고객명")}
                  {value("KIMKYOOJIN")}
                </tr>
                <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                  {label("이메일")}
                  {value("kj_kim@likealocal.co.kr")}
                  {label("전화번호")}
                  {value("+821000000000")}
                </tr>
              </table>
              <div className='text-2xl font-normal leading-9 text-black mt-[60px]'>
                구매정보(1개)
              </div>
              <div className=''>
                <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("주문번호")}
                    {value("P188F7B4")}
                    {label("상품")}
                    {value("즉시 호출 (Default)")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("출발지")}
                    {value("Incheon International Airport Terminal 1")}
                    {label("도착지")}
                    {value("Coex")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("결제 승인일자")}
                    {value("2023.09.06 22:22")}
                    {label("이용 상태")}
                    {value("결제완료 / 이용완료 / 이용취소")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("결제 금액")}
                    {value("USD 100.000")}
                    {label("결제 수단")}
                    {value("NICEPAYMENTS")}
                  </tr>
                </table>
                <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("주문번호")}
                    {value("P188F7B4")}
                    {label("상품")}
                    {value("즉시 호출 (Default)")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("출발지")}
                    {value("Incheon International Airport Terminal 1")}
                    {label("도착지")}
                    {value("Coex")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("결제 승인일자")}
                    {value("2023.09.06 22:22")}
                    {label("이용 상태")}
                    {value("결제완료 / 이용완료 / 이용취소")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("결제 금액")}
                    {value("USD 100.000")}
                    {label("결제 수단")}
                    {value("NICEPAYMENTS")}
                  </tr>
                </table>
                <table className='w-[1417px] h-[220px] border-[1px] border-[#D7D7D7] mt-[20px]'>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("주문번호")}
                    {value("P188F7B4")}
                    {label("상품")}
                    {value("즉시 호출 (Default)")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("출발지")}
                    {value("Incheon International Airport Terminal 1")}
                    {label("도착지")}
                    {value("Coex")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("결제 승인일자")}
                    {value("2023.09.06 22:22")}
                    {label("이용 상태")}
                    {value("결제완료 / 이용완료 / 이용취소")}
                  </tr>
                  <tr className='h-[74px] border-[1px] border-[#D7D7D7]'>
                    {label("결제 금액")}
                    {value("USD 100.000")}
                    {label("결제 수단")}
                    {value("NICEPAYMENTS")}
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
