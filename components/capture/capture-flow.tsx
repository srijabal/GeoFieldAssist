import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { VoiceRecorder } from "../voice-notes/voice-recorder";
import { AnalysisDisplay } from "./analysis-display";   
import { MeasurementForm } from "../measurement-form";
import { useCaptureStore } from "@/lib/capture-store";
import { RockAnalysis } from "@/types";

enum CaptureStep {
  Image,
  Voice,
  Measurements,
  Review,
}

export function CaptureFlow() {
  const [currentStep, setCurrentStep] = useState(CaptureStep.Image);
  const { currentCapture, initializeCapture, updateCurrentCapture, finalizeCapture } = useCaptureStore();

  const handleStart = () => {
    initializeCapture();
    setCurrentStep(CaptureStep.Image);
  };

  const handleImageAnalysis = (imageUrl: string, analysis: RockAnalysis) => {
    updateCurrentCapture({ imageUrl, analysis });
    setCurrentStep(CaptureStep.Voice);
  };

  const handleVoiceComplete = (audioUrl: string, transcription: string) => {
    updateCurrentCapture({ audioUrl, transcription });
    setCurrentStep(CaptureStep.Measurements);
  };

  const handleMeasurementsComplete = () => {
    setCurrentStep(CaptureStep.Review);
  };

  const handleFinalize = () => {
    finalizeCapture();
    setCurrentStep(CaptureStep.Image);
  };

  if (!currentCapture) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Start New Capture</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleStart}>Begin</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentStep === CaptureStep.Image && "Capture Rock Image"}
          {currentStep === CaptureStep.Voice && "Record Notes"}
          {currentStep === CaptureStep.Measurements && "Record Measurements"}
          {currentStep === CaptureStep.Review && "Review Capture"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === CaptureStep.Image && (
          <ImageUpload onAnalysisComplete={handleImageAnalysis} />
        )}

        {currentStep === CaptureStep.Voice && (
          <>
            {currentCapture.analysis && (
              <AnalysisDisplay analysis={currentCapture.analysis} />
            )}
            <VoiceRecorder onRecordingComplete={handleVoiceComplete} />
            <Button onClick={() => setCurrentStep(CaptureStep.Measurements)}>
              Skip Voice Note
            </Button>
          </>
        )}

        {currentStep === CaptureStep.Measurements && (
          <>
            <MeasurementForm onComplete={handleMeasurementsComplete} />
          </>
        )}

        {currentStep === CaptureStep.Review && (
          <>
            {currentCapture.analysis && (
              <AnalysisDisplay analysis={currentCapture.analysis} />
            )}
            {currentCapture.transcription && (
              <Card>
                <CardHeader>
                  <CardTitle>Voice Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{currentCapture.transcription}</p>
                </CardContent>
              </Card>
            )}
            <Button onClick={handleFinalize}>Finalize Capture</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}