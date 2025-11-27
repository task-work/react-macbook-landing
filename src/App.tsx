import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ProductViewer from "./components/ProductViewer";
import ShowCase from "./components/ShowCase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import HighLights from "./components/HighLights";
import Footer from "./components/Footer";
import gsap from "gsap";
//滚动触发器
import { ScrollTrigger } from "gsap/all";   

//gsap插件注册，注册后全局可用
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
        <NavBar />
        <Hero />
        <ProductViewer />
        <ShowCase />
        <Performance />
        <Features />
        <HighLights />
        <Footer />
    </main>
  )
}

export default App