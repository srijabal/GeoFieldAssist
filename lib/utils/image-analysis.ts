import { groq } from "../groqClient";

export async function analyzeRockImage(file: File): Promise<string> {
  const base64Image = await fileToBase64(file);
  const fileSizeInMB = file.size / (1024 * 1024);
  
  if (fileSizeInMB > 4) {
    throw new Error("Image size exceeds 4MB limit.");
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are an expert geologist specializing in rock identification and classification. Analyze the following image and provide a detailed, scientific description, including rock type, texture, mineralogy, and visible structures.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 0.5,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "Unable to analyze the image.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}