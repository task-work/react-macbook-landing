//灯光组件, 用于定义3D场景中的所有照明, 结合环境光和聚光灯，实现苹果风格影棚摄影效果

import { Environment, Lightformer } from "@react-three/drei"

const StudioLights = () => {
  return (
    <group name="lights">
        {/* {为金属和光泽表面添加微妙的反光, 设置成256分辨率保证性能和细节之间的平衡} */}
        <Environment resolution={256}>
            {/* {光形成器} */}
            <group>
                {/* {模拟大型的软矩形工作室灯光, 突出产品边缘, 不会产生刺眼的阴影} */}
                {/* {form: 矩形, intensity: 强度, position: 位置(类似光的射入方向和角度)}, rotation-y: 旋转 */}
                <Lightformer form="rect" intensity={10} position={[-10, 5, -5]} scale={10} rotation-y={Math.PI / 2} />
                {/* {强度相同位置不同的光效} */}
                <Lightformer form="rect" intensity={10} position={[10, 0, 1]} scale={10} rotation-y={Math.PI / 2} />
            </group>
        </Environment>
        {/* {创建一个角度为0.15的新聚光灯, 衰减值为0} */}
        <spotLight angle={0.15} decay={0} position={[-2, 10, 5]} intensity={Math.PI * 0.2} />
        <spotLight angle={0.15} decay={0} position={[0, -25, 10]} intensity={Math.PI * 0.2} />
        <spotLight angle={0.15} decay={0.1} position={[0, 15, 5]} intensity={Math.PI} />
    </group>
  )
}

export default StudioLights