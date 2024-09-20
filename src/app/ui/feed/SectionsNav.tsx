'use client'
import logo from "../../../../public/logo.svg"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiBellOn } from "react-icons/ci";

const SectionsNav = () => {

    const router = useRouter(); 
    const [tab , setTab] = useState(1); 
  return (
       
    <div className="p-6 bg-white sticky top-0 left-0 right-0 z-0">

    <div className="flex items-center justify-between md:justify-end">
      <Image src={logo} alt="split code logo" width={150} height={50} className="block md:hidden" /> 
      <CiBellOn className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]'/>

    </div>

    <div className="mt-8" >
      <h2 className="font-rb text-[24px] text-oliveGreen font-normal">Splits For You</h2>

      <div className="flex flex-row justify-between md:justify-start space-x-0 md:space-x-7 font-rb text-sm md:text-lg mt-4">
        <button className={`${tab === 1 ? "text-splitOrange" : "text-oliveGreen"}`}onClick={() => {
                                router.push("/feed/most-recent"); 
                                setTab(1);
                                }}>Most Recent</button>
        <button className={`${tab === 2 ? "text-splitOrange" : "text-oliveGreen"}`} onClick={() =>{ router.push("/feed/best-match")
          setTab(2);}
        }>Best Matches</button>
        <button className={`${tab === 3 ? "text-splitOrange" : "text-oliveGreen"}`} onClick={() => {router.push("/feed/saved-splits"); setTab(3);}}>Saved Splits</button>
      </div>

      <hr className="h-px mt-3 bg-oliveGreen border-0"/>
    </div>

</div>
  )
}

export default SectionsNav