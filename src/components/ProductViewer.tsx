import clsx from "clsx";
import useMacbookStore from "../store";
import { Canvas } from "@react-three/fiber";
// import { Box, OrbitControls } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
// import MacbookModel14 from "./models/Macbook-14";
// import MacbookModel16 from "./models/Macbook-16";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {

    const { color, scale, setColor, setScale } = useMacbookStore();

    //检查屏幕尺寸，是否是手机或平板
    const isMobile = useMediaQuery({query: '(max-width: 1024px)'});

  return (
    <section id="product-viewer">
        <h2>Take a closer look.</h2>
        <div className="controls">
            <p className="info">Macbook Pro | Available in 14" & 16" in Space Gray & Dark colors</p>
            <div className="flex-center gap-5 mt-5">
                <div className="color-control">
                    {/* {通过 clsx 添加动态样式} */}
                    <div 
                        onClick={() => setColor('#b3b3b3')} 
                        className={clsx('bg-neutral-300', color === '#b3b3b3' && 'active')}
                     />
                     <div 
                        onClick={() => setColor('#4f4f4f')} 
                        className={clsx('bg-neutral-900', color === '#4f4f4f' && 'active')}
                     />
                </div>

                <div className="size-control">
                    <div 
                        onClick={() => setScale(0.06)} 
                        className={clsx(scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}>
                        <p>14"</p>
                    </div>
                    <div 
                        onClick={() => setScale(0.08)} 
                        className={clsx(scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}>
                        <p>16"</p>
                    </div>
                </div>
            </div>
        </div>
        {/* {camera中的属性: position: 镜头的位置而不是盒子的位置， fov: 视野范围, near: 近平面, far: 远屏幕} */}
        {/* {Three 组件在Canvas内部，要么是网格，要么是group，而不是一个div 与常规TSX组件不同} */}
        <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
            {/* {Box中的属性: position: 盒子的3坐标, 都设置为0时完美居中, scale: 大小， material-color: 材质颜色} */}
            {/* <Box position={[0, 0, 0]} scale={10 * scale} material-color={color} /> */}
            {/* {增加环境光， 调节亮度} */}
            {/* <ambientLight intensity={1} /> */}
            {/* <MacbookModel14 scale={0.06} position={[0, 0, 0]} /> */}
            {/* 轨道控制, 加入该标签可以旋转 enableZoom: 是否启用缩放*/}
            {/* <OrbitControls enableZoom={false} /> */}
            {/* 以上是常用设置的示例 */}
            <StudioLights />
            <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
        </Canvas>
    </section>
  )
}

export default ProductViewer;