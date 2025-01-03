import SectionsNav from "../ui/feed/SectionsNav";
import SideNav from "../ui/feed/SideNav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Layout({ children }: { children: React.ReactNode}) {
  return (

    <>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden px-[2vw] md:px-[15vw]">

      {/* Toast container will show notifications globally */}
      <ToastContainer />
      <div className="w-full flex-none md:w-64 "> 
        <SideNav/>
      </div>

      <div className="flex flex-col w-full ">
        <SectionsNav/>

        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 ">{children}</div>
        
      </div>

    </div>
    </>
  );
}