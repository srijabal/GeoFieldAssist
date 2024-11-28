"use client";
import { useState } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceRecorder } from "@/lib/hooks/use-voice-recorder";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface VoiceRecorderProps {
  onRecordingComplete: (audioUrl: string, transcription: string) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isRecording, audioUrl, startRecording, stopRecording } = useVoiceRecorder();

  const transcribeAudio = async (audioUrl: string): Promise<string> => {
    try {
      // Convert audio URL to blob
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();

      // Create form data for the API request
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('model', 'whisper-large-v3-turbo');
      formData.append('response_format', 'json');

      // Make request to Groq transcription API
      const transcriptionResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: formData,
      });

      if (!transcriptionResponse.ok) {
        throw new Error(`Transcription failed: ${transcriptionResponse.statusText}`);
      }

      const result = await transcriptionResponse.json();
      return result.text || "Transcription failed";
    } catch (error) {
      console.error("Transcription error:", error);
      return "Transcription failed: " + (error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleRecordingComplete = async () => {
    try {
      stopRecording();
      setIsProcessing(true);
      
      if (audioUrl) {
        const transcription = await transcribeAudio(audioUrl);
        onRecordingComplete(audioUrl, transcription);
      }
    } catch (error) {
      console.error("Error processing recording:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "outline"}
        className="h-24 w-24 rounded-full"
        onClick={isRecording ? handleRecordingComplete : startRecording}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <LoadingSpinner />
        ) : isRecording ? (
          <Square className="h-8 w-8" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>
      <p className="text-sm text-muted-foreground">
        {isProcessing
          ? "Processing and transcribing..."
          : isRecording
          ? "Tap to stop recording"
          : "Tap to start recording"}
      </p>
    </div>
  );
}