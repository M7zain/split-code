import Hero from "@/app/Sections/Hero";
import About from "./Sections/About";
import How from "./Sections/How";
import Why from "./Sections/Why";
import Ready from "./Sections/Ready";
import Footer from "./Sections/Footer";
import Navbar from "./ui/Navbar";

export default function Home() {
  return (  
    <main>
        <Navbar/>
        <Hero/>
        <About/>
        <How/>
        <Why/>
        <Ready/>
        <Footer/>
      
    </main> 
  );
}
