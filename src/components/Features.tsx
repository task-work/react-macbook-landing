import clsx from "clsx";
import gsap from "gsap";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features, featureSequence } from "../constants";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { MacbookModel } from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";

const ModelScroll = () => {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery({maxWidth: 1024});

  const { setTexture } = useMacbookStore();

  //在组件挂载时，预加载所有视频, 避免在滚动屏幕时不显示
  useEffect(() => {
    featureSequence.forEach((feature) => {
      //创建虚拟元素, 该元素不会被添加到DOM中, 即允许下载视频数据，但不显示它
      const v = document.createElement('video');
      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: 'auto',                //预加载设置为自动
        crossOrigin: 'anonymous'        //允许从不同域(如CDN)加载视频
      });
      v.load();                         //获取视频
    });
  }, []);

  useGSAP(() => {
    //旋转模型动画
    const modelTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',
        start: 'top top',           //f-canvas到窗口顶部时开始
        end: 'bottom top',
        scrub: 1,
        pin: true                   //画布在滚动时固定位置，从而创建滚动距离
      }
    });

    //文案描述动画
    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',
        start: 'top center',           
        end: 'bottom top',
        scrub: 1                
      }
    });

    //3D 沿Y轴旋转360度
    if(groupRef.current) {
      modelTimeLine.to(groupRef.current.rotation, {y: Math.PI * 2, ease: 'power1.inOut'})
    }

    featureSequence.forEach((item) => {
      timeLine
        .call(() => setTexture(item.videoPath))
        .to(item.boxClass, {opacity: 1, y: 0, delay: item.delay});
    });
  }, []);

  return(
    <group ref={groupRef}>
      <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading...</h1></Html>}>
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
}

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        {/* {环境灯光, intensity: 强度} */}
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
          {
            features.map((feature, index) => (
              <div key={`key${index + 1}`} className={clsx('box', `box${index + 1}`, feature.styles)}>
                <img src={feature.icon} alt={feature.highlight} />
                  <p>
                    <span className="text-white">{feature.highlight}</span>
                    {feature.text}
                  </p>
              </div>
            ))
          }
      </div>
    </section>
  );
}

export default Features;