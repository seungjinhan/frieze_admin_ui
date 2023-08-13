import { useEffect, useState } from "react";

export default function TopPagePath({ paths }: any) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    setCount(paths.length);
    setData(paths);
  }, [paths]);

  if (data.length === 0) {
    return "";
  }
  return (
    <>
      <div className=''>
        <div className='flex items-center'>
          {data.map((d: any, i: any) => {
            return (
              <div key={i}>
                <div className='text-2xl font-normal leading-9 text-black'>
                  {d}
                </div>
                {i + 1 === count ? (
                  ""
                ) : (
                  <>
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
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
