'use client'
import logo from "../../../../public/logo.svg"
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";


function navigation(pathName: string) {
  if (pathName === '/feed' || pathName === '/feed/best-match') {
    return 1;
  } else if (pathName === '/feed/most-recent') {
    return 2;
  } else if (pathName === '/feed/saved-splits') {
    return 3;
  }
  return 0; // default case if the path doesn't match any of the expected paths
}



const SectionsNav = () => {

    const router = useRouter();
    const pathName = usePathname(); 
    


    const [searchQuery, setSearchQuery] = useState('');
 
    useEffect(() => { 

    },[searchQuery]);

    const [tab , setTab] = useState(navigation(pathName)); 

  function handleSearchSubmit(e) {
    e.preventDefault(); 
    if(searchQuery){ 
      router.push(`/search?searchUser=${searchQuery}`); 
    }
  }

  return (
       
    <div className="p-6 bg-white sticky top-0 left-0 right-0 z-10">

    <div className="flex items-center justify-between md:justify-end">
      <Image src={logo} alt="split code logo" width={150} height={50} className="block md:hidden" /> 

      <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="search"
        id="searchQuery"
        onChange={(e) => setSearchQuery(e.target.value)}
        className='hidden md:block border-2 border-slate-300 enabled:border-splitOrange focus:border-splitOrange p-4 rounded-full mb-7 mt-5 mr-5 w-full md:w-auto' 
      />
      </form>
      <CiBellOn className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]'/>

    </div>

    <div className="mt-8" >
      <h2 className="font-rb text-[24px] text-oliveGreen font-normal">Splits For You</h2>

      <div className="flex flex-row justify-between md:justify-start space-x-0 md:space-x-7 font-rb text-sm md:text-lg mt-4">
        
        <button className={`${tab === 1 ? "text-splitOrange" : "text-oliveGreen"}`} onClick={() =>{ router.push("/feed/best-match")
          setTab(1);}
        }>Best Matches</button>
     
        <button className={`${tab === 2 ? "text-splitOrange" : "text-oliveGreen"}`}onClick={() => {
                                router.push("/feed/most-recent"); 
                                setTab(2);
                                }}>Most Recent</button>

        <button className={`${tab === 3 ? "text-splitOrange" : "text-oliveGreen"}`} onClick={() => {router.push("/feed/saved-splits"); setTab(3);}}>Saved Splits</button>
      </div>

     
      <hr className="h-px mt-3 bg-oliveGreen border-0"/>
    </div>

</div>
  )
}

export default SectionsNav