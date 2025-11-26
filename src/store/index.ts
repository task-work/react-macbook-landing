import { create } from 'zustand';

interface MacbookState {
  color: string;
  setColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  reset: () => void;
}

const useMacbookStore = create<MacbookState>((set) => ({
    color: '#4f4f4f',
    setColor: (color : string) => set({ color }),
    scale: 0.08,
    setScale: (scale: number) => set({ scale }),
    reset: () => set({ color: '#4f4f4f', scale: 0.08 })
}));

export default useMacbookStore;