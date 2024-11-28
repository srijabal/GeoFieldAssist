"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { analyzeRockImage } from "@/lib/utils/image-analysis";
import { processAIResponse } from "@/lib/utils/process-analysis";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RockAnalysis } from "@/types";

interface ImageUploadProps {
  onAnalysisComplete: (imageUrl: string, analysis: RockAnalysis) => void;
}

export function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setIsAnalyzing(true);

      // Analyze image
      const analysisText = await analyzeRockImage(file);
      const structuredAnalysis = processAIResponse(analysisText);

      // Complete the upload
      onAnalysisComplete(preview, structuredAnalysis);
    } catch (error) {
      console.error("Error analyzing image:", error);
      // Handle error appropriately
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4 max-h-96">
      {previewUrl ? (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted max-h-96">
          <img
            src={previewUrl}
            alt="Rock sample preview"
            className="object-cover w-full h-full"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <LoadingSpinner />
                <p className="text-sm">Analyzing image...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="aspect-video relative max-h-96">
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer border-2 border-dashed rounded-lg">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-12 w-12 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click or drag and drop to upload rock sample image
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isAnalyzing}
            />
          </label>
        </Card>
      )}
    </div>
  );
}