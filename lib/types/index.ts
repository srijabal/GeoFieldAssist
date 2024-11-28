export interface VoiceNote {
  id: number;
  audioUrl: string;
  transcription: string;
  timestamp: string;
}

export interface Measurement {
  id: number;
  strike: number;
  dip: number;
  type: string;
  notes?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface FieldRecord {
  id: number;
  imageUrl: string;
  description: string;
  measurement?: Measurement;
  voiceNotes: VoiceNote[];
  timestamp: string;
  location?: Location;
}