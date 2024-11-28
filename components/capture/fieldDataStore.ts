import create from "zustand";

interface Record {
  imageUrl: string;
  description: string;
  location: { latitude: number; longitude: number } | null;
  voiceNotes: string[];
}

interface FieldDataStore {
  records: Record[];
  addRecord: (record: Record) => void;
}

export const useFieldDataStore = create<FieldDataStore>((set) => ({
  records: [],
  addRecord: (record) =>
    set((state) => ({
      records: [...state.records, record],
    })),
}));
