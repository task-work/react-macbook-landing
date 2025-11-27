
import { create } from 'zustand';

interface MacbookState {
  color: string;
  setColor: (color: string) => void;
  texture: string;
  setTexture: (texture: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  reset: () => void;
}

//默认颜色和尺寸（ProductViewer）
const DEFAULT_COLOR = '#4f4f4f';
const DEFAULT_SCALE = 0.08;
//默认材质（Features）
const DEFAULT_TEXTURE = "/videos/feature-1.mp4";

const useMacbookStore = create<MacbookState>((set) => ({
    color: DEFAULT_COLOR,
    setColor: (color : string) => set({ color }),

    texture: DEFAULT_TEXTURE,
    setTexture: (texture: string) => set({ texture }),

    scale: DEFAULT_SCALE,
    setScale: (scale: number) => set({ scale }),
    reset: () => set({ color: DEFAULT_COLOR, scale: DEFAULT_SCALE, texture: DEFAULT_TEXTURE })
}));

export default useMacbookStore;