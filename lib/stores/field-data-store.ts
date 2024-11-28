"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VoiceNote {
  id: number;
  audioUrl: string;
  transcription: string;
  timestamp: string;
}

export interface FieldRecord {
  id: number;
  imageUrl: string;
  description: string;
  strike?: number;
  dip?: number;
  type?: string;
  notes?: string;
  voiceNotes: VoiceNote[];
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface FieldDataStore {
  records: FieldRecord[];
  addRecord: (record: Omit<FieldRecord, 'id' | 'timestamp'>) => void;
  updateRecord: (id: number, data: Partial<FieldRecord>) => void;
  deleteRecord: (id: number) => void;
  addVoiceNote: (recordId: number, note: Omit<VoiceNote, 'id' | 'timestamp'>) => void;
  deleteVoiceNote: (recordId: number, noteId: number) => void;
  clearAllData: () => void;
}

export const useFieldDataStore = create<FieldDataStore>()(
  persist(
    (set) => ({
      records: [],
      addRecord: (record) =>
        set((state) => ({
          records: [
            ...state.records,
            {
              ...record,
              id: state.records.length + 1,
              timestamp: new Date().toISOString(),
              voiceNotes: [],
            },
          ],
        })),
      updateRecord: (id, data) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === id ? { ...record, ...data } : record
          ),
        })),
      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        })),
      addVoiceNote: (recordId, note) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === recordId
              ? {
                  ...record,
                  voiceNotes: [
                    ...record.voiceNotes,
                    {
                      ...note,
                      id: record.voiceNotes.length + 1,
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }
              : record
          ),
        })),
      deleteVoiceNote: (recordId, noteId) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === recordId
              ? {
                  ...record,
                  voiceNotes: record.voiceNotes.filter((note) => note.id !== noteId),
                }
              : record
          ),
        })),
      clearAllData: () => set({ records: [] }),
    }),
    {
      name: 'field-data-storage',
    }
  )
);