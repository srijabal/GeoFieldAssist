import { Measurement } from "@/lib/measurement-store";
export interface RockAnalysis {
    rockType: string;
    texture: string;
    mineralogy: string[];
    structures: string[];
    description: string;
  }
  
  export interface CaptureData {
    id: number;
    imageUrl: string;
    analysis: RockAnalysis;
    audioUrl?: string;
    transcription?: string;
    measurements: Measurement[];
    timestamp: string;
  }