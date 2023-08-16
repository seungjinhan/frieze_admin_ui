import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className='flex ml-[40px] items-center h-[50px] pt-[5px]'>
        <Image src={"/symbol-sep.svg"} alt='' width={30} height={43} />
        <Image
          src={"/logo.svg"}
          alt=''
          width={180}
          height={34}
          className='ml-[20px]'
        />
        <div className='bg-[#BBBBBB] w-[1px] h-[36px] ml-[27px] mr-[13px]' />
        <Image src={"/iam.png"} alt='' width={80} height={0} />
      </div>
    </>
  );
}
