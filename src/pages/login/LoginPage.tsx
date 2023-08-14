import "../../app/globals.css";

export default function LoginPage() {
  return (
    <>
      <div className='flex bg-[#EBEBEB]'>
        <div className='h-[151px] bg-[#f4f4f4]'></div>
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          <div className='w-[640px] h-[594px] bg-[#FFFFFF] flex justify-center flex-col items-center'>
            <div className='text-3xl font-bold leading-10 text-neutral-800 mt-[84px]'>
              로그인
            </div>
            <div className='flex flex-col justify-center mt-[60px]'>
              <input
                className='text-xl font-normal text-zinc-400 focus:outline-none ring-0 p-4 bg-white border rounded w-[524px] h-[56px] pr-14 border-zinc-400 mt-[16px]'
                placeholder='이메일입력'
              />
              <input
                className='text-xl font-normal text-zinc-400 focus:outline-none ring-0 p-4 bg-white border rounded w-[524px] h-[56px] pr-14 border-zinc-400 mt-[16px]'
                placeholder='비밀번호입력'
                type='password'
              />

              <button
                className='mt-[60px] mb-[166px] inline-flex items-center justify-center py-4 rounded w-[524px] h-[56px] bg-sky-500'
                onClick={(e) => {
                  location.href = "/main/users/UserManagePage";
                }}
              >
                <div className='text-base font-medium leading-normal text-white'>
                  로그인
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
