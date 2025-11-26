import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ProductViewer from "./components/ProductViewer";
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
    </main>
  )
}

export default App