import SideNav from "../ui/feed/SideNav";

import logo from "../../../public/logo.svg"
import Image from "next/image";
import { CiBellOn } from "react-icons/ci";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden px-[2vw] md:px-[15vw]">
      <div className="w-full flex-none md:w-64 "> 
        <SideNav />
      </div>

      
      <div className="p-6 bg-white sticky top-0 left-0 right-0 z-20 ">
          <div className="flex items-center justify-between">
            <Image src={logo} alt="split code logo" width={150} height={50} className="block md:hidden" /> 
            <CiBellOn className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]'/>

          </div>

          <div className="mt-8" >
            <h2 className="font-rb text-[24px] text-oliveGreen font-normal">Splits For You</h2>

            <div className="flex flex-row justify-between font-rb text-lg mt-4">
              <button>Most Recent</button>
              <button>Best Matches</button>
              <button>Saved Splits</button>
            </div>

            <hr className="h-px mt-3 bg-oliveGreen border-0"/>
          </div>
        
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}