/**
 * 切换3D模型组件，从用户界面检测尺寸，并使用GSAP在两个模型间动画过渡，
 * 并实现演示文稿的功能，允许用户在3D中旋转和检查Macbook
 */

import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

const ANIMATION_DURATION = 1;               //动画时长
const OFFSET_DISTANCE = 5;                  //偏移距离，指当一个模型被隐藏时，移出屏幕多远

const LARGE_SCALE_DESKTOP = 0.08;         
const LARGE_SCALE_MOBILE = 0.05;

//淡入淡出效果
const fadeMeshes = (group: THREE.Group | null, opacity: number) => {
    if(!group) return;
    group.traverse((child: THREE.Object3D) => {
        if(child instanceof THREE.Mesh) {
            const material = child.material;
            if(Array.isArray(material)) {
                material.forEach((m) => {
                    m.transparent = true;
                    gsap.to(m, { opacity, duration: ANIMATION_DURATION });
                });
            }
            else {
                child.material.transparent = true;
                gsap.to(child.material, { opacity, duration: ANIMATION_DURATION })
            }
        }
    });
}

//水平移动效果
const moveGroup = (group: THREE.Group | null, x: number) => {
    if(!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION })                //移动到x, 移动时长
}


const ModelSwitcher = ({scale, isMobile}: {scale: number, isMobile: boolean}) => {
    const smallMacbookRef = useRef<THREE.Group>(null);
    const largeMacbookRef = useRef<THREE.Group>(null);

    // 浮点数严格相等比较不可靠
    // const showLargeMacbook = scale === 0.08 || scale === 0.05;
    const expectedLargeScale = isMobile ? LARGE_SCALE_MOBILE : LARGE_SCALE_DESKTOP;
    const showLargeMacbook = Math.abs(scale - expectedLargeScale) < 0.001;
    

    useGSAP(() => {
        if(showLargeMacbook) {
            //小模型移出
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            //大模型移入
            moveGroup(largeMacbookRef.current, 0);

            //小模型淡出
            fadeMeshes(smallMacbookRef.current, 0);
            //大模型淡入
            fadeMeshes(largeMacbookRef.current, 1);
        }
        else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale]);

    const controlsConfig: { snap: boolean; speed: number; zoom: number; polar: [number, number]; azimuth: [number, number]; 
        config: { mass: number; tension: number; friction: number } } = {
        snap: true,                                 //释放时回弹
        speed: 1,                                   //移动速度
        zoom: 1,                                    //缩放  
        polar: [-Math.PI, Math.PI],                 //极角范围 (垂直旋转限制)   
        azimuth: [-Infinity, Infinity],             //方位角范围 (水平旋转限制)    
        config: {                                   //额外的物理特性
            mass: 1,                                //质量
            tension: 170,                           //张力
            friction: 26                            //摩擦力
        }          
    }

  return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacbookRef} visible={showLargeMacbook}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
            </group>
            <group ref={smallMacbookRef}  visible={!showLargeMacbook}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
        </PresentationControls>
    </>
  )
}

export default ModelSwitcher;