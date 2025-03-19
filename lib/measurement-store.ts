import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCaptureStore } from './capture-store';

export interface Measurement {
  id: number;
  strike: number;
  dip: number;
  type: string;
  notes?: string;
}

interface MeasurementStore {
  measurements: Measurement[];
  addMeasurement: (measurement: Omit<Measurement, 'id'>) => void;
  deleteMeasurement: (id: number) => void;
  clearMeasurements: () => void;
  updateCapture: () => void;
}

export const useMeasurementStore = create<MeasurementStore>()(
  persist(
    (set, get) => ({
      measurements: [],
      
      addMeasurement: (measurement) => {
        const newMeasurement = {
          ...measurement,
          id: Date.now(),
        };
        set((state) => {
          const newMeasurements = [...state.measurements, newMeasurement];
          return { measurements: newMeasurements };
        });
        get().updateCapture();
      },
      
      deleteMeasurement: (id) => {
        set((state) => {
          const newMeasurements = state.measurements.filter((m) => m.id !== id);
          return { measurements: newMeasurements };
        });
        get().updateCapture();
      },
      
      clearMeasurements: () => {
        set({ measurements: [] });
        get().updateCapture();
      },
      
      updateCapture: () => {
        const captureStore = useCaptureStore.getState();
        if (captureStore.currentCapture) {
          captureStore.updateCurrentCapture({
            measurements: get().measurements,
          });
        }
      },
    }),
    {
      name: 'measurements-storage',
      version: 1,
    }
  )
);