import { RockAnalysis } from "@/types";

export function processAIResponse(analysisText: string): RockAnalysis {
  try {
    const rockTypeMatch = analysisText.match(/rock type[^.]*may be ([^.,]+)/i) || 
                         analysisText.match(/appears to be (?:a|an) ([^.,]+)/i);
    const rockType = rockTypeMatch ? rockTypeMatch[1].trim() : "Undetermined";

    const textureMatch = analysisText.match(/texture[^.]+?is ([^.,]+)/i) ||
                        analysisText.match(/texture:?\s*([^.,]+)/i);
    const texture = textureMatch ? textureMatch[1].trim() : "Not specified";

    const mineralogyText = analysisText.toLowerCase();
    const commonMinerals = [
      "quartz", "feldspar", "mica", "amphibole", "biotite", "muscovite",
      "plagioclase", "calcite", "olivine", "pyroxene", "garnet"
    ];
    const mineralogy = commonMinerals
      .filter(mineral => mineralogyText.includes(mineral))
      .map(m => m.charAt(0).toUpperCase() + m.slice(1));

    const structures: string[] = [];
    const structureMatches = analysisText.matchAll(/\*\*\*([^:]+):/g);
    for (const match of Array.from(structureMatches)) {
      if (match[1]) {
        structures.push(match[1].trim());
      }
    }

    // Clean up structures if none found with asterisks
    if (structures.length === 0) {
      const structureWords = ["layering", "foliation", "jointing", "veins", "fractures", "faults"];
      structureWords.forEach(struct => {
        if (analysisText.toLowerCase().includes(struct)) {
          structures.push(struct.charAt(0).toUpperCase() + struct.slice(1));
        }
      });
    }

    return {
      rockType: rockType || "Undetermined",
      texture: texture || "Not specified",
      mineralogy: mineralogy.length > 0 ? mineralogy : ["Not specified"],
      structures: structures.length > 0 ? structures : ["None identified"],
      description: analysisText
    };
  } catch (error) {
    console.error("Error processing AI response:", error);
    return {
      rockType: "Analysis Error",
      texture: "Analysis Error",
      mineralogy: ["Analysis Error"],
      structures: ["Analysis Error"],
      description: analysisText
    };
  }
}