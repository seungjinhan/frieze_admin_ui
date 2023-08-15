import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className='flex ml-[40px] items-center'>
        <Image src={"/symbol-sep.svg"} alt='' width={41} height={43} />
        <Image
          src={"/logo.svg"}
          alt=''
          width={217}
          height={34}
          className='ml-[20px]'
        />
        <div className='bg-[#BBBBBB] w-[1px] h-[36px] ml-[27px] mr-[13px]' />
        <Image src={"/iam.png"} alt='' width={130} height={130} />
      </div>
    </>
  );
}
