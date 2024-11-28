import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CaptureData, RockAnalysis } from '@/types/index';

interface CaptureStore {
  captures: CaptureData[];
  currentCapture: Partial<CaptureData> | null;
  initializeCapture: () => void;
  updateCurrentCapture: (data: Partial<CaptureData>) => void;
  finalizeCapture: () => void;
  deleteCapture: (id: number) => void;
  clearCaptures: () => void;
}

export const useCaptureStore = create<CaptureStore>()(
  persist(
    (set, get) => ({
      captures: [],
      currentCapture: null,
      initializeCapture: () => {
        set({
          currentCapture: {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            measurements: [],
          },
        });
      },
      updateCurrentCapture: (data) => {
        set((state) => ({
          currentCapture: state.currentCapture
            ? { ...state.currentCapture, ...data }
            : data,
        }));
      },
      finalizeCapture: () => {
        const { currentCapture } = get();
        if (currentCapture) {
          set((state) => ({
            captures: [...state.captures, currentCapture as CaptureData],
            currentCapture: null,
          }));
        }
      },
      deleteCapture: (id) =>
        set((state) => ({
          captures: state.captures.filter((c) => c.id !== id),
        })),
      clearCaptures: () => set({ captures: [] }),
    }),
    {
      name: 'captures-storage',
    }
  )
);