import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RockAnalysis } from "@/types/index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AnalysisDisplayProps {
  analysis: RockAnalysis;
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  return (
    <Card className="overflow-y-auto">
      <CardHeader>
        <CardTitle>Rock Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Rock Type</TableCell>
              <TableCell>{analysis.rockType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Texture</TableCell>
              <TableCell>{analysis.texture}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mineralogy</TableCell>
              <TableCell>{analysis.mineralogy.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Structures</TableCell>
              <TableCell>{analysis.structures.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="prose dark:prose-invert">
          <h3>Detailed Description</h3>
          <p>{analysis.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}